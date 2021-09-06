package mxmodelreflection.metamodelBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import mxmodelreflection.proxies.Microflows;
import mxmodelreflection.proxies.Parameter;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IDataType;
import com.mendix.systemwideinterfaces.core.IMendixIdentifier;
import com.mendix.systemwideinterfaces.core.IMendixObject;

public class MicroflowBuilder
{
	private Builder builder;
	
	public MicroflowBuilder(Builder builder) {
		this.builder = builder;
	}

	public void buildMicroflows(IContext context) throws CoreException
	{
		Map<String,IMendixObject> existingMicroflows = new HashMap<String, IMendixObject>();
		for(IMendixObject obj : Core.retrieveXPathQuery(context, "//" + Microflows.getType()))
			existingMicroflows.put((String)obj.getValue(context, Microflows.MemberNames.CompleteName.toString()), obj);

		if(  this.builder.allNewModules ) 
			this.builder.allNewModules = ( existingMicroflows.size() > 0 );
		

		List<IMendixObject> inputParameterObjs = new ArrayList<IMendixObject>();
		List<IMendixObject> microflowObjs = new ArrayList<IMendixObject>();
		for(String microflowName: Core.getMicroflowNames())
		{
			String moduleName = microflowName.substring(0, microflowName.indexOf("."));
			if( this.builder.validateModule(context, moduleName) != null ) {	
				IMendixObject obj;
				if(!existingMicroflows.containsKey(microflowName))
				{
					obj = Core.instantiate(context, Microflows.getType());
					obj.setValue(context, Microflows.MemberNames.CompleteName.toString(), microflowName);
					obj.setValue(context, Microflows.MemberNames.Name.toString(), microflowName.substring(microflowName.indexOf(".")+1) );
					obj.setValue(context, Microflows.MemberNames.Module.toString(), moduleName);
					if( this.builder.moduleMap.get(moduleName) != null ) {
						obj.setValue(context, Microflows.MemberNames.Microflows_Module.toString(), this.builder.moduleMap.get(moduleName).getId());
					}
				}
				else
				{
					obj = existingMicroflows.get(microflowName);
					existingMicroflows.remove(microflowName);
				}
				inputParameterObjs.addAll( this.handleMicroflowParams(context, microflowName, obj) );
				microflowObjs.add( obj );
				
				if( microflowObjs.size() > 500 ) {
					Core.commit(context, inputParameterObjs);
					Core.commit(context, microflowObjs);
					inputParameterObjs.clear();
					microflowObjs.clear();
				}
			}
		}
		Core.commit(context, inputParameterObjs);
		Core.commit(context, microflowObjs);
		inputParameterObjs.clear();
		microflowObjs.clear();

		this.builder.removeDeletedObjects(context, existingMicroflows);
	}

	private List<IMendixObject> handleMicroflowParams(IContext context, String microflowName, IMendixObject obj) throws CoreException
	{
		Map<String, IMendixObject> existingParams = new HashMap<String, IMendixObject>();
		List<IMendixObject> params = Core.retrieveXPathQuery(context, "//" + Parameter.getType() + "[" + Microflows.MemberNames.Microflows_InputParameter + "='" + obj.getId().toLong() + "']");
		for(IMendixObject param : params)
			existingParams.put((String)param.getValue(context, Parameter.MemberNames.Name.toString()), param);

		List<IMendixIdentifier> inputParameterIds = new ArrayList<IMendixIdentifier>();
		List<IMendixObject> inputParameterObjs = new ArrayList<IMendixObject>();
		for(Entry<String,IDataType> entry : Core.getInputParameters(microflowName).entrySet())
		{
			String inputParameterName = entry.getKey();
			IDataType inputParameterType = entry.getValue();

			IMendixObject parameter;
			if(existingParams.containsKey(inputParameterName))
			{
				parameter = existingParams.get(inputParameterName);
				existingParams.remove(inputParameterName);
			}
			else
				parameter = Core.instantiate(context, Parameter.getType());

			parameter.setValue(context, Parameter.MemberNames.Name.toString(), inputParameterName);
			parameter.setValue(context, Parameter.MemberNames.Parameter_ValueType.toString(), this.builder.getTypeId(context, inputParameterType));
			parameter.setValue(context, Parameter.MemberNames.Parameter_MxObjectType.toString(), this.builder.getObjectTypeId(context, inputParameterType));
			inputParameterObjs.add( parameter );
			inputParameterIds.add(parameter.getId());
		}

		obj.setValue(context, Microflows.MemberNames.Microflows_Output_Type.toString(), this.builder.getTypeId(context, Core.getReturnType(microflowName)));
		obj.setValue(context, Microflows.MemberNames.Microflows_InputParameter.toString(), inputParameterIds);

		this.builder.removeDeletedObjects(context, existingParams);
		return inputParameterObjs;
	}
}