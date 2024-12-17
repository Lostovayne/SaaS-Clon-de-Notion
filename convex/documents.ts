import { v } from 'convex/values';

import { Id, type Doc } from './_generated/dataModel';
import { mutation, query } from './_generated/server';

export const get = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const documents = await ctx.db.query('documents').collect();
		return documents;
	}
});

export const archive = mutation({
	args: {
		id: v.id('documents')
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const userId = identity.subject;
		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error('Document not found');
		}

		if (existingDocument.userId !== userId) {
			throw new Error('You are not authorized to archive this document');
		}

		// Recursive function
		const recursiveArchive = async (documentId: Id<'documents'>) => {
			const children = await ctx.db
				.query('documents')
				.withIndex('by_user_parent', (q) => q.eq('userId', userId).eq('parentDocument', documentId))
				.collect();

			for (const child of children) {
				await ctx.db.patch(child._id, {
					isArchived: true
				});
				await recursiveArchive(child._id);
			}
		};

		const document = await ctx.db.patch(args.id, {
			isArchived: true
		});

		recursiveArchive(args.id);
		return document;
	}
});

export const getSidebar = query({
	args: {
		parentDocument: v.optional(v.id('documents'))
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const userId = identity.subject;

		const documents = await ctx.db
			.query('documents')
			.withIndex('by_user_parent', (q) => q.eq('userId', userId).eq('parentDocument', args.parentDocument))
			.filter((q) => q.eq(q.field('isArchived'), false))
			.collect();

		return documents;
	}
});

// Crear un documento
export const create = mutation({
	args: {
		title: v.string(),
		parentDocument: v.optional(v.id('documents'))
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const userId = identity.subject;

		const document = await ctx.db.insert('documents', {
			title: args.title,
			userId: userId,
			parentDocument: args.parentDocument,
			isArchived: false,
			isPublished: false
		});

		return document;
	}
});

export const getTrash = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const userId = identity.subject;

		const documents = await ctx.db
			.query('documents')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.eq(q.field('isArchived'), true))
			.order('desc')
			.collect();

		return documents;
	}
});

export const restore = mutation({
	args: { id: v.id('documents') },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error('Document not found');
		}

		if (existingDocument.userId !== userId) {
			throw new Error('You are not authorized to restore this document');
		}

		const recursiveRestore = async (documentId: Id<'documents'>) => {
			const children = await ctx.db
				.query('documents')
				.withIndex('by_user_parent', (q) => q.eq('userId', userId).eq('parentDocument', documentId))
				.collect();

			for (const child of children) {
				await ctx.db.patch(child._id, {
					isArchived: false
				});
				await recursiveRestore(child._id);
			}
		};

		const options: Partial<Doc<'documents'>> = {
			isArchived: false
		};

		if (existingDocument.parentDocument) {
			const parent = await ctx.db.get(existingDocument.parentDocument);
			if (parent?.isArchived) {
				options.parentDocument = undefined;
			}
		}

		const document = await ctx.db.patch(args.id, options);
		await recursiveRestore(args.id);

		return document;
	}
});

export const remove = mutation({
	args: { id: v.id('documents') },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const userId = identity.subject;
		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error('Document not found');
		}

		if (existingDocument.userId !== userId) {
			throw new Error('You are not authorized to delete this document');
		}

		const document = await ctx.db.delete(args.id);
		return document;
	}
});

/**
 * @function getSearch
 * @description Busca los documentos que coinciden con la palabra clave
 * @param {ConvexContext} ctx - El contexto de Convex
 * @returns {Promise<Doc<"documents">[]>} - Un array de los documentos que coinciden con la palabra clave
 */
export const getSearch = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const userId = identity.subject;
		const documents = await ctx.db
			.query('documents')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.eq(q.field('isArchived'), false))
			.order('desc')
			.collect();

		return documents;
	}
});

export const getById = query({
	args: { documentId: v.id('documents') },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error('Not authenticated');

		const document = await ctx.db.get(args.documentId);

		if (!document) throw new Error('Document not found');
		if (document.isPublished && !document.isArchived) return document;

		const userId = identity.subject;
		if (document.userId !== userId) throw new Error('You are not authorized to view this document');

		return document;
	}
});

export const update = mutation({
	args: {
		id: v.id('documents'),
		title: v.optional(v.string()),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
		isPublished: v.optional(v.boolean())
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error('Not authenticated');
		}

		const userId = identity.subject;
		const { id, ...rest } = args;
		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error('Document not found');
		} else if (existingDocument.userId !== userId) {
			throw new Error('You are not authorized to update this document');
		}

		const document = await ctx.db.patch(id, {
			...rest
		});
		return document;
	}
});

export const removeIcon = mutation({
	args: { id: v.id('documents') },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) throw new Error('Not authenticated');

		const userId = identity.subject;
		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) throw new Error('Document not found');
		if (existingDocument.userId !== userId) throw new Error('You are not authorized to update this document');

		const document = await ctx.db.patch(args.id, {
			icon: undefined
		});
		return document;
	}
});
