package mxmodelreflection.metamodelBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import mxmodelreflection.MxTypeConverter;
import mxmodelreflection.proxies.Module;
import mxmodelreflection.proxies.MxObjectType;
import mxmodelreflection.proxies.Parameter;
import mxmodelreflection.proxies.PrimitiveTypes;
import mxmodelreflection.proxies.ValueType;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.logging.ILogNode;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IDataType;
import com.mendix.systemwideinterfaces.core.IDataType.DataTypeEnum;
import com.mendix.systemwideinterfaces.core.IMendixIdentifier;
import com.mendix.systemwideinterfaces.core.IMendixObject;
import com.mendix.systemwideinterfaces.core.meta.IMetaPrimitive.PrimitiveType;

public class Builder {
	protected HashMap<String, IMendixObject> moduleMap = new HashMap<String, IMendixObject>();
	protected List<String> activeModule = new ArrayList<String>();
	protected boolean allNewModules = false;
	private ILogNode _logNode = Core.getLogger("MxModelReflection");
	private MxTypeConverter typeConverter = new MxTypeConverter();

	protected IMendixIdentifier getTypeId(IContext context, IDataType dataType) throws CoreException {
		String valueTypeName = dataType.getDSLType();
		if (dataType.getType() == DataTypeEnum.Enumeration)
			valueTypeName = "Enum";
		else if (dataType.isList())
			valueTypeName = "List of type: " + dataType.getObjectType();
		else if (dataType.isMendixObject())
			valueTypeName = "Object of type: " + dataType.getObjectType();

		List<IMendixObject> result = Core.retrieveXPathQuery(context, "//" + ValueType.getType() + "[" + ValueType.MemberNames.Name + "='" + valueTypeName + "']");
		if (result.size() > 0)
			return result.get(0).getId();

		IMendixObject memberTypeObject = Core.instantiate(context, ValueType.getType());
		memberTypeObject.setValue(context, ValueType.MemberNames.Name.toString(), valueTypeName);
		memberTypeObject.setValue(context, ValueType.MemberNames.ValueType_MxObjectType.toString(), this.getObjectTypeId(context, dataType));
		
		PrimitiveTypes type = getPrimitiveTypesFromDatatype(dataType);
		memberTypeObject.setValue(context, ValueType.MemberNames.TypeEnum.toString(), (type == null ? null : type.toString()));
		Core.commit(context, memberTypeObject);
		return memberTypeObject.getId();
	}

	protected PrimitiveTypes getPrimitiveTypesFromPrimitiveType(PrimitiveType primitiveType) {
		return typeConverter.fromPrimitiveType(primitiveType);
	}


	protected PrimitiveTypes getPrimitiveTypesFromDatatype(IDataType dataType) {
		return typeConverter.fromDatatype(dataType);
	}
	
	protected IMendixIdentifier getObjectTypeId(IContext context, IDataType dataType) throws CoreException {
		if (dataType.isMendixObject()) {
			List<IMendixObject> result = Core.retrieveXPathQuery(context, "//" + MxObjectType.getType() + "[" + MxObjectType.MemberNames.CompleteName + "='" + dataType.getObjectType() + "']");
			if (result.size() > 0)
				return result.get(0).getId();
		}
		else if (dataType.isList()) {
			List<IMendixObject> result = Core.retrieveXPathQuery(context, "//" + MxObjectType.getType() + "[" + MxObjectType.MemberNames.CompleteName + "='" + dataType.getObjectType() + "']");
			if (result.size() > 0)
				return result.get(0).getId();
		}

		return null;
	}

	protected void removeDeletedObjects(IContext context, Map<String,IMendixObject> objects) throws CoreException {
		String attrName = null;
		for(Entry<String, IMendixObject> entry : objects.entrySet()) {
			IMendixObject entryObj = entry.getValue();
			if( attrName == null ) {
				if( Parameter.entityName.equals(entryObj.getType()) )
					attrName = "Name";
				else 
					attrName = "CompleteName";
			}
			this._logNode .debug("Removing: " + entryObj.getValue(context, attrName));
			Core.delete(context, entryObj);
		}
	}

	public void cacheModules(IContext context) throws CoreException {
		List<IMendixObject> result = Core.retrieveXPathQuery(context, "//" + Module.getType());
		if (result.size() == 0)
			this.allNewModules = true;
		else {
			for (IMendixObject object : result) {
				boolean syncModule = (Boolean) object.getValue(context, Module.MemberNames.SynchronizeObjectsWithinModule.toString());
				String moduleName = (String) object.getValue(context, Module.MemberNames.ModuleName.toString());
				if (syncModule)
					this.moduleMap.put(moduleName, object);
				else
					this.moduleMap.put(moduleName, null);
			}
		}
	}

	public void removeInactiveModules(IContext context) throws CoreException {
		for (Entry<String, IMendixObject> entry : this.moduleMap.entrySet()) {
			if (!this.activeModule.contains(entry.getKey())) {
				if (entry.getValue() != null)
					Core.delete(context, entry.getValue());
				else
					Core.delete(context, Core.retrieveXPathQuery(context, "//" + Module.getType() + "[" + Module.MemberNames.ModuleName + "='" + entry.getKey() + "']").get(0));
			}
		}

		this.moduleMap.clear();
		this.activeModule.clear();
	}

	protected Object validateModule(IContext context, String moduleName) throws CoreException {
		this.activeModule.add(moduleName);

		if (!this.moduleMap.containsKey(moduleName)) {
			this.moduleMap.put(moduleName, null);

			IMendixObject obj = Core.instantiate(context, Module.getType());
			obj.setValue(context, Module.MemberNames.ModuleName.toString(), moduleName);

			if (this.allNewModules) {
				this.moduleMap.put(moduleName, obj);
				obj.setValue(context, Module.MemberNames.SynchronizeObjectsWithinModule.toString(), true);
			}

			Core.commit(context, obj);

		}

		return this.moduleMap.get(moduleName);
	}

	public void prepareSynchronization(IContext context) throws CoreException {
		this.cacheModules(context);
	}
}