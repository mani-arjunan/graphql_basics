import { objectType } from 'nexus';
import { Context } from '../context';

export const User = objectType({
	name: 'User',
	definition(t) {
		t.nonNull.int('id');
		t.nonNull.string('name');
		t.nonNull.string('email');
		t.nonNull.string('password');
		t.nonNull.list.nonNull.field('links', {
			type: 'Link',
			resolve(parent, args, context: Context) {
				return context.prisma.user
					.findUnique({
						where: {
							id: parent.id,
						},
					})
					.links();
			},
		});
	},
});
