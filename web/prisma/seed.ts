import { family } from './data'
//import { PrismaClient } from '@prisma/client';
import PrismaClient from '../utils/prisma';

const prisma = PrismaClient;

async function main() {
    await prisma.distribution.deleteMany();
    await prisma.species.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.tribe.deleteMany();
    await prisma.subFamily.deleteMany();
    await prisma.family.deleteMany();

    await prisma.family.create(
        { data: family }
    )

}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })