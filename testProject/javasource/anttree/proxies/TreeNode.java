// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package anttree.proxies;

public class TreeNode
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject treeNodeMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "AntTree.TreeNode";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Title("Title"),
		IsLeaf("IsLeaf"),
		TreeNode_TreeNode("AntTree.TreeNode_TreeNode");

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

	public TreeNode(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "AntTree.TreeNode"));
	}

	protected TreeNode(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject treeNodeMendixObject)
	{
		if (treeNodeMendixObject == null)
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		if (!com.mendix.core.Core.isSubClassOf("AntTree.TreeNode", treeNodeMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a AntTree.TreeNode");

		this.treeNodeMendixObject = treeNodeMendixObject;
		this.context = context;
	}

	/**
	 * @deprecated Use 'TreeNode.load(IContext, IMendixIdentifier)' instead.
	 */
	@java.lang.Deprecated
	public static anttree.proxies.TreeNode initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return anttree.proxies.TreeNode.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static anttree.proxies.TreeNode initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new anttree.proxies.TreeNode(context, mendixObject);
	}

	public static anttree.proxies.TreeNode load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return anttree.proxies.TreeNode.initialize(context, mendixObject);
	}

	public static java.util.List<anttree.proxies.TreeNode> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<anttree.proxies.TreeNode> result = new java.util.ArrayList<anttree.proxies.TreeNode>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//AntTree.TreeNode" + xpathConstraint))
			result.add(anttree.proxies.TreeNode.initialize(context, obj));
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
	 * @return value of Title
	 */
	public final java.lang.String getTitle()
	{
		return getTitle(getContext());
	}

	/**
	 * @param context
	 * @return value of Title
	 */
	public final java.lang.String getTitle(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.Title.toString());
	}

	/**
	 * Set value of Title
	 * @param title
	 */
	public final void setTitle(java.lang.String title)
	{
		setTitle(getContext(), title);
	}

	/**
	 * Set value of Title
	 * @param context
	 * @param title
	 */
	public final void setTitle(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String title)
	{
		getMendixObject().setValue(context, MemberNames.Title.toString(), title);
	}

	/**
	 * @return value of IsLeaf
	 */
	public final java.lang.Boolean getIsLeaf()
	{
		return getIsLeaf(getContext());
	}

	/**
	 * @param context
	 * @return value of IsLeaf
	 */
	public final java.lang.Boolean getIsLeaf(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.IsLeaf.toString());
	}

	/**
	 * Set value of IsLeaf
	 * @param isleaf
	 */
	public final void setIsLeaf(java.lang.Boolean isleaf)
	{
		setIsLeaf(getContext(), isleaf);
	}

	/**
	 * Set value of IsLeaf
	 * @param context
	 * @param isleaf
	 */
	public final void setIsLeaf(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean isleaf)
	{
		getMendixObject().setValue(context, MemberNames.IsLeaf.toString(), isleaf);
	}

	/**
	 * @return value of TreeNode_TreeNode
	 */
	public final anttree.proxies.TreeNode getTreeNode_TreeNode() throws com.mendix.core.CoreException
	{
		return getTreeNode_TreeNode(getContext());
	}

	/**
	 * @param context
	 * @return value of TreeNode_TreeNode
	 */
	public final anttree.proxies.TreeNode getTreeNode_TreeNode(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		anttree.proxies.TreeNode result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.TreeNode_TreeNode.toString());
		if (identifier != null)
			result = anttree.proxies.TreeNode.load(context, identifier);
		return result;
	}

	/**
	 * Set value of TreeNode_TreeNode
	 * @param treenode_treenode
	 */
	public final void setTreeNode_TreeNode(anttree.proxies.TreeNode treenode_treenode)
	{
		setTreeNode_TreeNode(getContext(), treenode_treenode);
	}

	/**
	 * Set value of TreeNode_TreeNode
	 * @param context
	 * @param treenode_treenode
	 */
	public final void setTreeNode_TreeNode(com.mendix.systemwideinterfaces.core.IContext context, anttree.proxies.TreeNode treenode_treenode)
	{
		if (treenode_treenode == null)
			getMendixObject().setValue(context, MemberNames.TreeNode_TreeNode.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.TreeNode_TreeNode.toString(), treenode_treenode.getMendixObject().getId());
	}

	/**
	 * @return the IMendixObject instance of this proxy for use in the Core interface.
	 */
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return treeNodeMendixObject;
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
			final anttree.proxies.TreeNode that = (anttree.proxies.TreeNode) obj;
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
		return "AntTree.TreeNode";
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
