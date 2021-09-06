package mxmodelreflection.metamodelBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import mxmodelreflection.proxies.AssociationOwner;
import mxmodelreflection.proxies.MxObjectEnum;
import mxmodelreflection.proxies.MxObjectEnumCaptions;
import mxmodelreflection.proxies.MxObjectEnumValue;
import mxmodelreflection.proxies.MxObjectMember;
import mxmodelreflection.proxies.MxObjectReference;
import mxmodelreflection.proxies.MxObjectType;
import mxmodelreflection.proxies.PersistenceType;
import mxmodelreflection.proxies.PrimitiveTypes;
import mxmodelreflection.proxies.ReferenceType;
import system.proxies.Language;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IDataType;
import com.mendix.systemwideinterfaces.core.IMendixIdentifier;
import com.mendix.systemwideinterfaces.core.IMendixObject;
import com.mendix.systemwideinterfaces.core.meta.IMetaAssociation;
import com.mendix.systemwideinterfaces.core.meta.IMetaAssociation.AssociationType;
import com.mendix.systemwideinterfaces.core.meta.IMetaEnumValue;
import com.mendix.systemwideinterfaces.core.meta.IMetaObject;
import com.mendix.systemwideinterfaces.core.meta.IMetaPrimitive;
import com.mendix.systemwideinterfaces.core.meta.IMetaPrimitive.PrimitiveType;

public class MetaObjectBuilder
{
	private List<String> languageCodes = new ArrayList<String>();
	private Builder builder;
	
	public MetaObjectBuilder(Builder builder) {
		this.builder = builder;
	}

	public void buildMetaObjects(IContext context) throws CoreException
	{
		this.cacheLanguageCodes(context);
		Map<String, IMendixObject> existingMetaObjects = new HashMap<String, IMendixObject>();
		for(IMendixObject obj : Core.retrieveXPathQuery(context, "//" + MxObjectType.getType()))
			existingMetaObjects.put((String)obj.getValue(context, MxObjectType.MemberNames.CompleteName.toString()), obj);
		
		if(  this.builder.allNewModules ) 
			this.builder.allNewModules = ( existingMetaObjects.size() > 0 );
		
		
		for(IMetaObject metaObject : Core.getMetaObjects())
		{
			String moduleName = metaObject.getModuleName();
			if( this.builder.validateModule(context, moduleName) != null ) {	
				IMendixObject curObject = this.handleMxObject(context, existingMetaObjects, metaObject);
				if( curObject != null )
					this.handleMembers(context, metaObject, curObject);
			}
		}


		Map<String,IMendixObject> existingAssociations = new HashMap<String, IMendixObject>();
		for(IMendixObject existingAssociation : Core.retrieveXPathQuery(context, "//" + MxObjectReference.getType())) {
			existingAssociations.put((String)existingAssociation.getValue(context, MxObjectReference.MemberNames.CompleteName.toString()) + "/" + (String)existingAssociation.getValue(context, MxObjectReference.MemberNames.ParentEntity.toString()) , existingAssociation);
		}

		List<IMendixObject> objList = new ArrayList<IMendixObject>();
		List<String> processedAssociations = new LinkedList<String>();
		for(IMetaAssociation ass : Core.getMetaAssociations()) 
		{	
			String moduleName = ass.getParent().getModuleName();
			if( this.builder.validateModule(context, moduleName) != null ) {
				if (processedAssociations.contains(ass.getName() + "/" +ass.getParent().getName())) {
					continue;
				} else {
					processedAssociations.add(ass.getName() + "/" +ass.getParent().getName());
				}
				
				IMendixObject result = this.handleReferences(context, existingMetaObjects, existingAssociations, ass);
				if( result != null )
					objList.add( result );
				
				if( objList.size() > 500 ) {
					Core.commit(context, objList);
					objList.clear();
				}
			}
		}
		Core.commit(context, objList);
		objList.clear();

		for (String associationName : processedAssociations) {
			existingAssociations.remove(associationName);
		}
		
		this.builder.removeDeletedObjects(context, existingAssociations);

		for(IMetaObject metaObject : Core.getMetaObjects())
		{
			String moduleName = metaObject.getModuleName();
			if( this.builder.validateModule(context, moduleName) != null ) {	
				existingMetaObjects.remove( metaObject.getName() );
			}
		}
		this.builder.removeDeletedObjects(context, existingMetaObjects);
		this.languageCodes.clear();
	}

	private void cacheLanguageCodes(IContext context) throws CoreException
	{
		for(IMendixObject language :  Core.retrieveXPathQuery(context, "//" + Language.entityName))
			this.languageCodes.add(Language.initialize(context, language).getCode());
	}

	private IMendixObject handleMxObject(IContext context, Map<String,IMendixObject> existingMetaObjects, IMetaObject metaObject) throws CoreException
	{
		String completeName = metaObject.getName();
		IMendixObject object;
		if(!existingMetaObjects.containsKey(completeName) && !this.builder.allNewModules)
		{
			object = Core.instantiate(context, MxObjectType.getType());
			existingMetaObjects.put(completeName, object);

			object.setValue(context, MxObjectType.MemberNames.CompleteName.toString(), completeName);
			object.setValue(context, MxObjectType.MemberNames.Name.toString(), completeName.substring(completeName.indexOf(".")+1));
			object.setValue(context, MxObjectType.MemberNames.Module.toString(), completeName.substring(0,completeName.indexOf(".")));
		}
		else
			object = existingMetaObjects.get(completeName);

		if( object != null ) {
			List<IMendixIdentifier> superObjectIds = new ArrayList<IMendixIdentifier>();
			for(IMetaObject superObject : metaObject.getSuperObjects()) {
				IMendixObject superMxObject = this.handleMxObject(context, existingMetaObjects, superObject);
				if( superMxObject != null )
					superObjectIds.add(superMxObject.getId());
			}
			
			object.setValue(context, MxObjectType.MemberNames.MxObjectType_SubClassOf_MxObjectType.toString(), superObjectIds);
			object.setValue(context, MxObjectType.MemberNames.PersistenceType.toString(), (metaObject.isPersistable() ? PersistenceType.Persistable.toString() : PersistenceType.Non_persistent.toString())  );
			
			if( this.builder.moduleMap.get(metaObject.getModuleName()) != null ) {
				object.setValue(context, MxObjectType.MemberNames.MxObjectType_Module.toString(), this.builder.moduleMap.get(metaObject.getModuleName()).getId());
			}
			
			Core.commit(context, object);
		}
		
		return object;
	}

	private void handleMembers(IContext context, IMetaObject metaObject, IMendixObject curObject) throws CoreException
	{
		Map<String,IMendixObject> membersByName = new HashMap<String, IMendixObject>();
		List<IMendixObject> existingMembers = Core.retrieveXPathQuery(context, "//" + MxObjectMember.getType() + "[" + MxObjectMember.MemberNames.MxObjectMember_MxObjectType + "='" + curObject.getId().toLong() + "']");
		for(IMendixObject obj : existingMembers)
			membersByName.put((String)obj.getValue(context, MxObjectMember.MemberNames.AttributeName.toString()), obj);

		List<IMendixObject> memberList = new ArrayList<IMendixObject>();
		for(IMetaPrimitive metaPrimitive : metaObject.getMetaPrimitives())
		{
			String name = metaPrimitive.getName();
			if(metaPrimitive.getType() == PrimitiveType.Enum)
			{
				if(membersByName.containsKey(name))
				{
					IMendixObject curMember = membersByName.get(name);
					if(MxObjectEnum.getType().equals(curMember.getType()))
					{
						memberList.add(this.handleEnumMember(context, curMember, metaPrimitive, curObject));
						membersByName.remove(name);
					}
					else
					{
						Core.delete(context, curMember);
						memberList.add(this.handleEnumMember(context, null, metaPrimitive, curObject));
					}
				}
				else
					memberList.add(this.handleEnumMember(context, null, metaPrimitive, curObject));
			}
			else
			{
				processMember(context, curObject, membersByName, memberList, metaPrimitive, name);
			}
		}		
		Core.commit(context, memberList);

		this.builder.removeDeletedObjects(context, membersByName);
	}

	public void processMember(IContext context, IMendixObject curObject, Map<String, IMendixObject> membersByName, List<IMendixObject> memberList, IMetaPrimitive metaPrimitive, String name) throws CoreException {
		IMendixObject curMember;
		IDataType memberType = Core.createDataType(metaPrimitive.getType().toString());
		if( !membersByName.containsKey(name) )
		{
			curMember = Core.instantiate(context, MxObjectMember.getType());
			curMember.setValue(context, MxObjectMember.MemberNames.AttributeName.toString(), name);
			curMember.setValue(context, MxObjectMember.MemberNames.AttributeType.toString(), metaPrimitive.getType().toString());
			curMember.setValue(context, MxObjectMember.MemberNames.AttributeTypeEnum.toString(), 
					this.builder.getPrimitiveTypesFromPrimitiveType(metaPrimitive.getType()) != null ? this.builder.getPrimitiveTypesFromPrimitiveType(metaPrimitive.getType()).toString() : null);
			curMember.setValue(context, MxObjectMember.MemberNames.MxObjectMember_MxObjectType.toString(), curObject.getId());
			curMember.setValue(context, MxObjectMember.MemberNames.MxObjectMember_Type.toString(), this.builder.getTypeId(context, memberType));
			curMember.setValue(context, MxObjectMember.MemberNames.FieldLength.toString(), metaPrimitive.getLength());
			curMember.setValue(context, MxObjectMember.MemberNames.IsVirtual.toString(), metaPrimitive.isVirtual());
			
			memberList.add(curMember);
		}
		else
		{
			curMember = membersByName.get(name);
			if(MxObjectEnum.getType().equals(curMember.getType()))
			{
				Core.delete(context, curMember);
				curMember = Core.instantiate(context, MxObjectMember.getType());
				curMember.setValue(context, MxObjectMember.MemberNames.AttributeName.toString(), name);
				curMember.setValue(context, MxObjectMember.MemberNames.MxObjectMember_MxObjectType.toString(), curObject.getId());
			}
			curMember.setValue(context, MxObjectMember.MemberNames.MxObjectMember_Type.toString(), this.builder.getTypeId(context, memberType));
			curMember.setValue(context, MxObjectMember.MemberNames.AttributeType.toString(), metaPrimitive.getType().toString());
			curMember.setValue(context, MxObjectMember.MemberNames.AttributeTypeEnum.toString(), 
					this.builder.getPrimitiveTypesFromPrimitiveType(metaPrimitive.getType()) != null ? this.builder.getPrimitiveTypesFromPrimitiveType(metaPrimitive.getType()).toString() : null);
			curMember.setValue(context, MxObjectMember.MemberNames.FieldLength.toString(), metaPrimitive.getLength());
			curMember.setValue(context, MxObjectMember.MemberNames.IsVirtual.toString(), metaPrimitive.isVirtual());
			
			memberList.add(curMember);
			
			membersByName.remove(name);
		}
	}

	@SuppressWarnings("unchecked")
	private IMendixObject handleEnumMember(IContext context, IMendixObject enumObject, IMetaPrimitive enumPrimitive, IMendixObject curObject) throws CoreException
	{
		if(enumObject == null)
			enumObject = Core.instantiate(context, MxObjectEnum.getType());

		Map<String,IMendixObject> curEnumValues = new HashMap<String, IMendixObject>();
		List<IMendixIdentifier> enumValueIds = (List<IMendixIdentifier>) enumObject.getValue(context, MxObjectEnum.MemberNames.Values.toString());
		if(enumValueIds != null)
			for(IMendixObject enumValueObject : Core.retrieveIdList(context, enumValueIds))
				curEnumValues.put((String)enumValueObject.getValue(context, MxObjectEnumValue.MemberNames.Name.toString()), enumValueObject);

		List<IMendixIdentifier> valueIds = new ArrayList<IMendixIdentifier>();
		List<IMendixObject> valueObjs = new ArrayList<IMendixObject>();
		

		List<IMendixIdentifier> captionIds = new ArrayList<IMendixIdentifier>();
		List<IMendixObject> captionObjs = new ArrayList<IMendixObject>();
		for(IMetaEnumValue metaEnumValue : enumPrimitive.getEnumValues())
		{
			IMendixObject enumValue = null;
			if(curEnumValues.containsKey(metaEnumValue.getIdentifier()))
				enumValue = curEnumValues.get(metaEnumValue.getIdentifier());
			else
				enumValue = Core.instantiate(context, MxObjectEnumValue.getType());

			Map<String,IMendixObject> curEnumCaptions = new HashMap<String, IMendixObject>();
			List<IMendixIdentifier> enumCaptionIds = (List<IMendixIdentifier>) enumValue.getValue(context, MxObjectEnumValue.MemberNames.Captions.toString());
			if(enumCaptionIds != null )
				for(IMendixObject enumCaptionObject : Core.retrieveIdList(context, enumCaptionIds))
					curEnumCaptions.put((String)enumCaptionObject.getValue(context, MxObjectEnumCaptions.MemberNames.LanguageCode.toString()), enumCaptionObject);

			IMendixObject enumCaption;
			for(String languageCode : this.languageCodes)
			{
				if(curEnumCaptions.containsKey(languageCode))
					enumCaption = curEnumCaptions.get(languageCode);
				else
					enumCaption = Core.instantiate(context, MxObjectEnumCaptions.getType());

				enumCaption.setValue(context, MxObjectEnumCaptions.MemberNames.Caption.toString(), Core.getInternationalizedString(languageCode, metaEnumValue.getI18NCaptionKey()));
				enumCaption.setValue(context, MxObjectEnumCaptions.MemberNames.LanguageCode.toString(), languageCode);
				captionObjs.add(enumCaption);
				captionIds.add(enumCaption.getId());
			}

			enumValue.setValue(context, MxObjectEnumValue.MemberNames.Name.toString(), metaEnumValue.getIdentifier());
			enumValue.setValue(context, MxObjectEnumValue.MemberNames.Captions.toString(), captionIds);
			Core.commit(context, captionObjs);
			captionObjs.clear();
			captionIds.clear();
			valueIds.add(enumValue.getId());
			valueObjs.add(enumValue);
		}

		// delete enum values that are removed from the model
		for(IMendixObject cachedEnumValue : curEnumValues.values()) {
			IMendixIdentifier cachedValueId = cachedEnumValue.getId();

			// try to find the id in the value ids of the model
			boolean found = valueIds.stream().anyMatch(valueId -> cachedValueId.equals(valueId));

			// if not found then delete from the mxmodelreflectionmodel
			if (!found) {
				Core.delete(context, cachedEnumValue);
			}
		}

		enumObject.setValue(context, MxObjectEnum.MemberNames.Values.toString(), valueIds);
		enumObject.setValue(context, MxObjectMember.MemberNames.AttributeName.toString(), enumPrimitive.getName());
		enumObject.setValue(context, MxObjectMember.MemberNames.AttributeType.toString(), enumPrimitive.getType().toString());
		enumObject.setValue(context, MxObjectMember.MemberNames.AttributeTypeEnum.toString(), PrimitiveTypes.EnumType.toString());
		enumObject.setValue(context, MxObjectMember.MemberNames.MxObjectMember_MxObjectType.toString(), curObject.getId());
		enumObject.setValue(context, MxObjectMember.MemberNames.MxObjectMember_Type.toString(), this.builder.getTypeId(context,
				Core.createDataType(enumPrimitive.getParent().getName(), enumPrimitive.getName())
		));
		
		
		Core.commit(context, valueObjs);
		valueObjs.clear();
		valueIds.clear();
		
		
		return enumObject;
	}

	private IMendixObject handleReferences(IContext context, Map<String,IMendixObject> existingMetaObjects, Map<String,IMendixObject> existingAssociations, IMetaAssociation association) throws CoreException
	{
		String name = association.getName();
		IMendixObject associationObject;
		
		if(!existingAssociations.containsKey(name+"/"+association.getParent().getName()))
		{
			associationObject = Core.instantiate(context, MxObjectReference.getType());
			associationObject.setValue(context, MxObjectReference.MemberNames.CompleteName.toString(), name);
			associationObject.setValue(context, MxObjectReference.MemberNames.ParentEntity.toString(), association.getParent().getName());
		}
		else {
			associationObject = existingAssociations.get(name+"/"+association.getParent().getName());
		}

		//Initialise a few list in order to collect the owner and child objects
		List<IMendixIdentifier> referenceIdsTotal = new ArrayList<IMendixIdentifier>();
		List<IMendixIdentifier> referenceIdsParent = new ArrayList<IMendixIdentifier>();
		List<IMendixIdentifier> referenceIdsChild = new ArrayList<IMendixIdentifier>();

		//First collect the parent objects, both classes: itself and the subclasses
		List<IMetaObject> imObjectTypeList = new ArrayList<IMetaObject>();
		imObjectTypeList.add(association.getParent());
		imObjectTypeList.addAll(association.getParent().getSubObjects());
		for( IMetaObject object : imObjectTypeList ) {
			IMendixObject superMxObject = this.handleMxObject(context, existingMetaObjects, object);
			if( superMxObject != null )
				referenceIdsParent.add(superMxObject.getId());
		}
		imObjectTypeList.clear();

		//Now collect the child objects, both classes: itself and the subclasses
		imObjectTypeList.add(association.getChild());
		imObjectTypeList.addAll(association.getChild().getSubObjects());
		for( IMetaObject object : imObjectTypeList ) {
			IMendixObject superMxObject = this.handleMxObject(context, existingMetaObjects, object);
			if( superMxObject != null )
				referenceIdsChild.add(superMxObject.getId());
		}
		imObjectTypeList.clear();

		//Add the collected child and parent objects to the total list
		referenceIdsTotal.addAll( referenceIdsChild );
		referenceIdsTotal.addAll( referenceIdsParent );
		
		/* 	Append all the values to the association object		*/
		associationObject.setValue(context, MxObjectReference.MemberNames.MxObjectReference_MxObjectType.toString(), referenceIdsTotal); referenceIdsTotal.clear();
		associationObject.setValue(context, MxObjectReference.MemberNames.MxObjectReference_MxObjectType_Child.toString(), referenceIdsChild); referenceIdsChild.clear();
		associationObject.setValue(context, MxObjectReference.MemberNames.MxObjectReference_MxObjectType_Parent.toString(), referenceIdsParent); referenceIdsParent.clear();
		associationObject.setValue(context, MxObjectReference.MemberNames.Name.toString(), name.substring(name.indexOf(".") + 1) );
		associationObject.setValue(context, MxObjectReference.MemberNames.Module.toString(), name.substring(0, name.indexOf(".")) );
		associationObject.setValue(context, MxObjectReference.MemberNames.ReferenceType.toString(), (association.getType() == AssociationType.REFERENCE ? ReferenceType.Reference.toString() : ReferenceType.ReferenceSet.toString()));
		associationObject.setValue(context, MxObjectReference.MemberNames.AssociationOwner.toString(), (association.getOwner() == com.mendix.systemwideinterfaces.core.meta.IMetaAssociation.AssociationOwner.DEFAULT ? AssociationOwner._Default.toString() : AssociationOwner.Both.toString() ));

		associationObject.setValue(context, MxObjectReference.MemberNames.MxObjectReference_Module.toString(), this.builder.moduleMap.get(association.getParent().getModuleName()).getId());

		return associationObject;
	}
}
