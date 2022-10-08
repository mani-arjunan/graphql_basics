import { makeSchema } from 'nexus';
import { join } from 'path';
import {
	Link,
	deleteLinkMutation,
	addLinkMutation,
	updateLinkMutation,
	linkQuery,
	AuthPayload,
	AuthMutation,
	User,
} from './graphql';

export const schema = makeSchema({
	types: [
		Link,
		User,
		AuthPayload,
		linkQuery,
		AuthMutation,
		deleteLinkMutation,
		addLinkMutation,
		updateLinkMutation,
	],
	outputs: {
		schema: join(process.cwd(), 'schema.graphql'),
		typegen: join(process.cwd(), 'nexus-typegen.ts'),
	},
	contextType: {
		module: join(process.cwd(), './src/context.ts'),
		export: 'Context',
	},
});
