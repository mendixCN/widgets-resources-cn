/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mxmodelreflection;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Formatter;
import java.util.Locale;
import java.util.TimeZone;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.core.objectmanagement.member.MendixEnum;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixObjectMember;
import com.mendix.systemwideinterfaces.core.ISession;
import com.mendix.systemwideinterfaces.core.meta.IMetaEnumValue;

public class DataParser
{

	public static String getStringValue( Object value, String pattern, IContext context ) throws CoreException
	{
		if ( value == null ) {
			return "";
		}
		
		else if ( value instanceof String ) {
			if( pattern != null && !"".equals(pattern) ) 
				return getFormattedValue(context, pattern, value);
			
			return ((String) value).trim();
		}

		else if ( value instanceof Integer ) {
			TokenReplacer._logger.trace("Processing value as integer");
			
			if( pattern != null && !"".equals(pattern) ) 
				return getFormattedValue(context, pattern, value);
			return Integer.toString((Integer) value);
		}
		else if ( value instanceof Boolean ) {
			TokenReplacer._logger.trace("Processing value as Boolean");

			if( pattern != null && !"".equals(pattern) ) 
				return getFormattedValue(context, pattern, value);
			return Boolean.toString((Boolean) value);
		}
		else if ( value instanceof Double ) {
			TokenReplacer._logger.trace("Processing value as double");

			if( pattern != null && !"".equals(pattern) ) {
				DecimalFormat df = (DecimalFormat) NumberFormat.getInstance( Core.getLocale(context) );
				df.applyLocalizedPattern(pattern);
				
				return df.format( (Double) value );
			}
			return getFormattedNumber(context, (Double) value, 2, 20);
		}
		else if ( value instanceof Float ) {
			TokenReplacer._logger.trace("Processing value as float");
			
			if( pattern != null && !"".equals(pattern) ) {
				DecimalFormat df = (DecimalFormat) NumberFormat.getInstance( Core.getLocale(context) );
				df.applyLocalizedPattern(pattern);
				
				return df.format( (Float) value );
			}
			return getFormattedNumber(context, Double.valueOf((Float) value), 2, 20);
		}
		else if ( value instanceof Date ) {
			TokenReplacer._logger.trace("Processing value as date, localized");
			
			if( pattern != null && !"".equals(pattern) ) {
				SimpleDateFormat df = new SimpleDateFormat(pattern, Core.getLocale(context) );
				df.setTimeZone(getSessionTimeZone(context));
				
				return df.format( (Date) value );
			}
			return processDate(context, (Date) value, true);
		}
		else if ( value instanceof Long ) {
			TokenReplacer._logger.trace("Processing value as long");

			if( pattern != null && !"".equals(pattern) ) 
				return getFormattedValue(context, pattern, value);
			return Long.toString((Long) value);
		}
		else if ( value instanceof BigDecimal ) {
			TokenReplacer._logger.trace("Processing value as Big Decimal");
			BigDecimal bd = ((BigDecimal) value);
			if ( bd != null ) {
				if( pattern != null && !"".equals(pattern) ) {
					DecimalFormat df = (DecimalFormat) NumberFormat.getInstance( Core.getLocale(context) );
					df.applyLocalizedPattern(pattern);
					
					return df.format( bd );
				}
				return bd.toString();
			}
		}
		else if ( value instanceof IMendixObjectMember ) {
			IMendixObjectMember<?> member = (IMendixObjectMember<?>) value;
			if ( member.getValue(context) == null ) {
				TokenReplacer._logger.trace("MendixObjectMember has no content");
				return "";
			}

			if ( value instanceof MendixEnum ) {
				TokenReplacer._logger.trace("Processing value as MendixEnum");
				MendixEnum enumeration = (MendixEnum) value;
				try {
					IMetaEnumValue enumValue = enumeration.getEnumeration().getEnumValues().get(enumeration.getValue(context));
					return Core.getInternationalizedString(context, enumValue.getI18NCaptionKey());
				}
				catch( Exception e ) {
					Core.getLogger("TokenReplacer").warn(e);
					return enumeration.getValue(context);
				}
			}
			// Now re-do this same function after getting the actual attribute value
			else 
				return getStringValue( ((IMendixObjectMember<?>) value).getValue(context), pattern, context );
			
		}
		else
			TokenReplacer._logger.warn("Unimplemented value: " + value + " <" + value.getClass().getName() + ">");

		return "";
	}

	public static String getTrimmedValue( IContext context, Object value ) {
		String strValue = null;
		if ( value != null ) {
			if ( value instanceof String )
				strValue = ((String) value).trim();
			else if ( value instanceof Float || value instanceof Double ) {
				if ( value instanceof Float )
					value = Double.valueOf((Float) value);
				strValue = getFormattedNumber(context, (Double) value, 2, 20);
			}
			else if ( value instanceof Date )
				strValue = processDate(context, (Date) value, true);
			else if ( value != null )
				strValue = String.valueOf(value);
		}

		return strValue;
	}

	private static String processDate( IContext context, Date value, boolean shouldLocalize ) {
		Date date = (Date) value;
		Locale userLocale = Core.getLocale(context);
		DateFormat dateFormat = new SimpleDateFormat("dd-MMM-yyyy", userLocale);

		TokenReplacer._logger.trace("Processing date in timezone " + (shouldLocalize ? getSessionTimeZone(context).getDisplayName() : "UTC"));
		if ( shouldLocalize )
			dateFormat.setTimeZone(getSessionTimeZone(context));
		else
			dateFormat.setTimeZone(getUTCTimeZone());

		return dateFormat.format(date);
	}

	public static TimeZone getSessionTimeZone( IContext context ) {
		ISession session = context.getSession();
		if ( session != null ) {
			TimeZone timeZone = session.getTimeZone();
			if ( timeZone != null )
				return timeZone;
			return getUTCTimeZone();
		}
		return getUTCTimeZone();
	}

	public static TimeZone getUTCTimeZone() {
		return TimeZone.getTimeZone("UTC");
	}

	private static String getFormattedNumber( IContext context, Double curValue, int minPrecision, int maxPrecision )
	{
		NumberFormat numberFormat = NumberFormat.getInstance(Core.getLocale(context));
		numberFormat.setMaximumFractionDigits(maxPrecision);
		numberFormat.setGroupingUsed(false);
		numberFormat.setMinimumFractionDigits(minPrecision);

		if ( !Double.isNaN(curValue) )
		{
			return numberFormat.format(curValue);
		}
		TokenReplacer._logger.trace("Processing number value " + curValue + ", it is not a number");

		return "";
	}
	
	private static String getFormattedValue( IContext context, String pattern, Object value ) { 
	   Formatter formatter = new Formatter(Core.getLocale(context));
	   String strValue = formatter.format(Core.getLocale(context), pattern, value ).toString();
	   formatter.close();
	   
	   return strValue;
	}
}
