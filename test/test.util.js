import { prismaClient } from "../src/aplication/database.js";
import bcrypt from "bcrypt";
import { getSessionExists } from "../src/utils/sessionexists.js";

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
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "test"
        }
    });
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            firstName: "test",
            lastName: "test",
            email: "test@oz.com",
            phone: "0988766677"
        }
    })
}

export const createManyTestContact = async () => {
    for (let i = 0; i < 14; i++) {
        await prismaClient.contact.create({
            data: {
                username: `test`,
                firstName: `test ${i}`,
                lastName: `test ${i}`,
                email: `test${i}@oz.com`,
                phone: `0988766677${i}`
            }
        })

    }
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    })
}

export const removeAllTestAddresses = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: {
                username: "test"
            }
        }
    })
}

export const createTestAddress = async () => {
    const contact = await getTestContact();

    await prismaClient.address.create({
        data: {
            contactId: contact.id,
            street: 'jalan test',
            city: 'kota test',
            province: 'provinsi test',
            country: 'indonesia',
            postalCode: '9090'
        }
    })
}

export const getTestAddress = async () => {
    return prismaClient.address.findFirst({
        where: {
            contact: {
                username: "test"
            }
        }
    })
}

export const removeAllTestAccounts = async () => {
    await prismaClient.accounts.deleteMany({
        where:{
            username:"test"
        }
    })
}

export const getTestQrCode = async () => {
    const sessions = await getSessionExists();

    const client = sessions.find(sess => sess.id == campaign.sender).client;
    await client.sendMessage(campaign.number, campaign.message).then(response => {
        return response
    }).catch(error => {
        return error.message
    })
}