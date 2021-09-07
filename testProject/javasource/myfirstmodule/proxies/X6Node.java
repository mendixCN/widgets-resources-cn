// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies;

public class X6Node
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject x6NodeMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "MyFirstModule.X6Node";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		x("x"),
		y("y"),
		width("width"),
		height("height"),
		label("label");

		private java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@java.lang.Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public X6Node(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "MyFirstModule.X6Node"));
	}

	protected X6Node(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject x6NodeMendixObject)
	{
		if (x6NodeMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("MyFirstModule.X6Node", x6NodeMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a MyFirstModule.X6Node");

		this.x6NodeMendixObject = x6NodeMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'X6Node.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static myfirstmodule.proxies.X6Node initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return myfirstmodule.proxies.X6Node.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static myfirstmodule.proxies.X6Node initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		if (com.mendix.core.Core.isSubClassOf("MyFirstModule.X6Context", mendixObject.getType()))
			return myfirstmodule.proxies.X6Context.initialize(context, mendixObject);

		return new myfirstmodule.proxies.X6Node(context, mendixObject);
	}

	public static myfirstmodule.proxies.X6Node load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return myfirstmodule.proxies.X6Node.initialize(context, mendixObject);
	}

	public static java.util.List<? extends myfirstmodule.proxies.X6Node> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<myfirstmodule.proxies.X6Node> result = new java.util.ArrayList<myfirstmodule.proxies.X6Node>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//MyFirstModule.X6Node" + xpathConstraint))
			result.add(myfirstmodule.proxies.X6Node.initialize(context, obj));
		return result;
	}

	/**
	 * Commit the changes made on this proxy object.
	 */
	public final void commit() throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Commit the changes made on this proxy object using the specified context.
	 */
	public final void commit(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		com.mendix.core.Core.commit(context, getMendixObject());
	}

	/**
	 * Delete the object.
	 */
	public final void delete()
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}

	/**
	 * Delete the object using the specified context.
	 */
	public final void delete(com.mendix.systemwideinterfaces.core.IContext context)
	{
		com.mendix.core.Core.delete(context, getMendixObject());
	}
	/**
	 * @return value of x
	 */
	public final java.math.BigDecimal getx()
	{
		return getx(getContext());
	}

	/**
	 * @param context
	 * @return value of x
	 */
	public final java.math.BigDecimal getx(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.math.BigDecimal) getMendixObject().getValue(context, MemberNames.x.toString());
	}

	/**
	 * Set value of x
	 * @param x
	 */
	public final void setx(java.math.BigDecimal x)
	{
		setx(getContext(), x);
	}

	/**
	 * Set value of x
	 * @param context
	 * @param x
	 */
	public final void setx(com.mendix.systemwideinterfaces.core.IContext context, java.math.BigDecimal x)
	{
		getMendixObject().setValue(context, MemberNames.x.toString(), x);
	}

	/**
	 * @return value of y
	 */
	public final java.math.BigDecimal gety()
	{
		return gety(getContext());
	}

	/**
	 * @param context
	 * @return value of y
	 */
	public final java.math.BigDecimal gety(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.math.BigDecimal) getMendixObject().getValue(context, MemberNames.y.toString());
	}

	/**
	 * Set value of y
	 * @param y
	 */
	public final void sety(java.math.BigDecimal y)
	{
		sety(getContext(), y);
	}

	/**
	 * Set value of y
	 * @param context
	 * @param y
	 */
	public final void sety(com.mendix.systemwideinterfaces.core.IContext context, java.math.BigDecimal y)
	{
		getMendixObject().setValue(context, MemberNames.y.toString(), y);
	}

	/**
	 * @return value of width
	 */
	public final java.math.BigDecimal getwidth()
	{
		return getwidth(getContext());
	}

	/**
	 * @param context
	 * @return value of width
	 */
	public final java.math.BigDecimal getwidth(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.math.BigDecimal) getMendixObject().getValue(context, MemberNames.width.toString());
	}

	/**
	 * Set value of width
	 * @param width
	 */
	public final void setwidth(java.math.BigDecimal width)
	{
		setwidth(getContext(), width);
	}

	/**
	 * Set value of width
	 * @param context
	 * @param width
	 */
	public final void setwidth(com.mendix.systemwideinterfaces.core.IContext context, java.math.BigDecimal width)
	{
		getMendixObject().setValue(context, MemberNames.width.toString(), width);
	}

	/**
	 * @return value of height
	 */
	public final java.math.BigDecimal getheight()
	{
		return getheight(getContext());
	}

	/**
	 * @param context
	 * @return value of height
	 */
	public final java.math.BigDecimal getheight(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.math.BigDecimal) getMendixObject().getValue(context, MemberNames.height.toString());
	}

	/**
	 * Set value of height
	 * @param height
	 */
	public final void setheight(java.math.BigDecimal height)
	{
		setheight(getContext(), height);
	}

	/**
	 * Set value of height
	 * @param context
	 * @param height
	 */
	public final void setheight(com.mendix.systemwideinterfaces.core.IContext context, java.math.BigDecimal height)
	{
		getMendixObject().setValue(context, MemberNames.height.toString(), height);
	}

	/**
	 * @return value of label
	 */
	public final java.lang.String getlabel()
	{
		return getlabel(getContext());
	}

	/**
	 * @param context
	 * @return value of label
	 */
	public final java.lang.String getlabel(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.label.toString());
	}

	/**
	 * Set value of label
	 * @param label
	 */
	public final void setlabel(java.lang.String label)
	{
		setlabel(getContext(), label);
	}

	/**
	 * Set value of label
	 * @param context
	 * @param label
	 */
	public final void setlabel(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String label)
	{
		getMendixObject().setValue(context, MemberNames.label.toString(), label);
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return x6NodeMendixObject;
	}

	/**
	 * @return the IContext instance of this proxy, or null if no IContext instance was specified at initialization.
	 */
	public final com.mendix.systemwideinterfaces.core.IContext getContext()
	{
		return context;
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final myfirstmodule.proxies.X6Node that = (myfirstmodule.proxies.X6Node) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@java.lang.Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static java.lang.String getType()
	{
		return "MyFirstModule.X6Node";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@java.lang.Deprecated
	public java.lang.String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}