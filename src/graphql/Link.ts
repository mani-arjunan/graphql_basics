import { extendType, intArg, nonNull, nullable, objectType, stringArg } from 'nexus';
import { Context } from '../context';

export const Link = objectType({
	name: 'Link',
	definition(t) {
		t.nonNull.int('id');
		t.nonNull.string('description');
		t.nonNull.string('url');
		t.field('postedBy', {
			type: 'User',
			resolve(parent, args, context: Context) {
				return context.prisma.link
					.findUnique({
						where: {
							id: parent.id,
						},
					})
					.postedBy();
			},
		});
	},
});

export const linkQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.list.nonNull.field('feed', {
			type: 'Link',
			resolve(parent, args, context: Context, info) {
				return context.prisma.link.findMany();
			},
		});
	},
});

export const addLinkMutation = extendType({
	type: 'Mutation',
	//return the newly created link alone
	// definition(t) {
	// 	t.nonNull.field('updateLinks', {
	// 		type: 'Link',
	// 		args: {
	// 			description: nonNull(stringArg()),
	// 			url: nonNull(stringArg()),
	// 		},
	// 		resolve(parent, args, context) {
	// 			const { description, url } = args;
	// 			let idCount = links.length + 1;
	// 			const newLink = {
	// 				id: idCount + 1,
	// 				description,
	// 				url,
	// 			};
	// 			links.push(newLink);
	// 			return newLink;
	// 		},
	// 	});
	// },
	//For list of links return type
	definition(t) {
		t.nonNull.list.nonNull.field('addNewLinks', {
			type: 'Link',
			args: {
				description: nonNull(stringArg()),
				url: nonNull(stringArg()),
			},
			resolve(parent, args, context: Context) {
				const { description, url } = args;
				const { userId } = context;
				if (!userId) {
					throw 'Token is missing';
				}
				context.prisma.link.create({
					data: {
						description,
						url,
						postedBy: { connect: { id: userId } },
					},
				});

				return context.prisma.link.findMany();
			},
		});
	},
	// For Nullable return type
	// definition(t) {
	// 	t.nullable.field('updateLinks', {
	// 		type: 'Link',
	// 		args: {
	// 			description: nonNull(stringArg()),
	// 			url: nonNull(stringArg()),
	// 		},
	// 		resolve(parent, args, context) {
	// 			const { description, url } = args;
	// 			let idCount = links.length + 1;
	// 			const newLink = {
	// 				id: idCount + 1,
	// 				description,
	// 				url,
	// 			};
	// 			links.push(newLink);
	// 			return null;
	// 		},
	// 	});
	// },
});

export const updateLinkMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.list.field('updateLink', {
			type: 'Link',
			args: {
				description: nullable(stringArg()),
				url: nullable(stringArg()),
				id: nonNull(intArg()),
			},
			async resolve(parent, args, context: Context) {
				const { description, url, id } = args;
				const { userId } = context;
				if (!userId) {
					throw 'Token is missing';
				}
				await context.prisma.link.update({
					where: {
						id,
					},
					data: {
						description: description || '',
						url: url || '',
					},
				});

				return context.prisma.link.findMany();
			},
		});
	},
});

export const deleteLinkMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nullable.field('deleteLink', {
			type: 'Link',
			args: {
				id: nonNull(intArg()),
			},
			async resolve(parent, arg, context: Context) {
				const { id } = arg;
				const { userId } = context;
				if (!userId) {
					throw 'Token is missing';
				}
				await context.prisma.link.delete({
					where: {
						id,
					},
				});

				return null;
			},
		});
	},
});
