import { prismaClient } from "../src/aplication/database";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name:"test",
            token:"test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where:{
            username:"test"
        }
    });
}

export const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where:{
            username:"test"
        }
    });
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            firstName: "test",
            lastName: "test",
            email:"test@oz.com",
            phone:"0988766677"
        }
    })
}

export const createManyTestContact = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: `test`,
                firstName: `test${i}`,
                lastName: `test${i}`,
                email:`test${i}@oz.com`,
                phone:`0988766677${i}`
            }
        })
        
    }
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where:{
            username: "test"
        }
    })
}
