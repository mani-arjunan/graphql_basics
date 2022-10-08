import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	try {
		await prisma.link.create({
			data: {
				description: 'FullStack tutorial for Graphql',
				url: 'www.abc.com',
			},
		});
		const allLinks = await prisma.link.findMany();
		console.log(allLinks);
	} catch (e) {
		console.log(e);
	} finally {
		await prisma.$disconnect();
	}
}

main();
