package mxmodelreflection;

import com.mendix.systemwideinterfaces.core.IDataType;
import com.mendix.systemwideinterfaces.core.meta.IMetaPrimitive;

import mxmodelreflection.proxies.PrimitiveTypes;

import java.util.Optional;

public class MxTypeConverter {
  public PrimitiveTypes fromPrimitiveType(IMetaPrimitive.PrimitiveType primitiveType) {
    PrimitiveTypes type = null;

    switch (primitiveType) {
      case String:
        type = PrimitiveTypes.StringType;
        break;
      case AutoNumber:
        type = PrimitiveTypes.AutoNumber;
        break;
      case Boolean:
        type = PrimitiveTypes.BooleanType;
        break;
      case Decimal:
        type = PrimitiveTypes.Decimal;
        break;
      case DateTime:
        type = PrimitiveTypes.DateTime;
        break;
      case Enum:
        type = PrimitiveTypes.EnumType;
        break;
      case HashString:
        type = PrimitiveTypes.HashString;
        break;
      case Integer:
        type = PrimitiveTypes.IntegerType;
        break;
      case Long:
        type = PrimitiveTypes.LongType;
        break;
      case Binary:
        break;
      default:
        type = fromDeprecatedType(primitiveType.toString()).orElse(null);
        break;
    }

    return type;
  }

  public PrimitiveTypes fromDatatype(IDataType dataType) {
    PrimitiveTypes type = null;
    switch (dataType.getType()) {
      case String:
        type = PrimitiveTypes.StringType;
        break;
      case AutoNumber:
        type = PrimitiveTypes.AutoNumber;
        break;
      case Boolean:
        type = PrimitiveTypes.BooleanType;
        break;
      case Datetime:
        type = PrimitiveTypes.DateTime;
        break;
      case Enumeration:
        type = PrimitiveTypes.EnumType;
        break;
      case HashString:
        type = PrimitiveTypes.HashString;
        break;
      case Integer:
        type = PrimitiveTypes.IntegerType;
        break;
      case Long:
        type = PrimitiveTypes.LongType;
        break;
      case Decimal:
        type = PrimitiveTypes.Decimal;
        break;
      case Object:
      case Binary:
      case Nothing:
      case Unknown:
        break;
      default:
        type = fromDeprecatedType(dataType.toString()).orElse(null);
        break;
    }

    if (dataType.isList())
      type = PrimitiveTypes.ObjectList;
    else if (dataType.isMendixObject())
      type = PrimitiveTypes.ObjectType;

    return type;
  }

  public PrimitiveTypes fromString(String value) {
    return fromDeprecatedType(value).orElse(PrimitiveTypes.valueOf(value));
  }

  // Check if {@code primitiveType} is a deprecated type. Done for backward compatibility.
  private Optional<PrimitiveTypes> fromDeprecatedType(String primitiveType) {
    if (primitiveType == null) return Optional.empty();

    PrimitiveTypes type = null;

    switch (primitiveType) {
      case "Float":
        type = PrimitiveTypes.FloatType;
        break;
      case "Currency":
        type = PrimitiveTypes.Currency;
        break;
    }

    return Optional.ofNullable(type);
  }
}
