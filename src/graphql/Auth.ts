import { extendType, objectType, nonNull, stringArg } from 'nexus';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils/auth';
import { Context } from '../context';

export const AuthPayload = objectType({
	name: 'AuthPayload',
	definition(t) {
		t.nonNull.string('token');
		t.nonNull.field('user', {
			type: 'User',
		});
	},
});

export const AuthMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('signup', {
			type: 'AuthPayload',
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
				name: nonNull(stringArg()),
			},
			async resolve(parent, args, context: Context) {
				const { email, name, password: incomingPassword } = args;
				const password = await bcrypt.hash(incomingPassword, 10);
				const user = await context.prisma.user.create({
					data: {
						email,
						name,
						password,
					},
				});

				const token = jwt.sign({ userId: user.id }, APP_SECRET);

				return {
					token,
					user,
				};
			},
		});
		t.nonNull.field('login', {
			type: 'AuthPayload',
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
			},
			async resolve(parent, args, context: Context) {
				const { email, password } = args;

				const user = await context.prisma.user.findUnique({
					where: {
						email: email,
					},
				});

				if (!user) {
					throw 'User is not available. Please Signup!';
				}

				const validPassword = bcrypt.compare(password, user.password);

				if (!validPassword) {
					throw 'Password is wrong';
				}

				const token = jwt.sign({ userId: user.id }, APP_SECRET);

				return {
					token,
					user,
				};
			},
		});
	},
});
