import { prismaClient } from "../aplication/database";
import { createAccountValidation } from "../validation/accounts-validation"
import { validate } from "../validation/validation"

const create = async (user, request) => {
    
    const account = validate(createAccountValidation, request);
    account.username = user.username;

    return prismaClient.accounts.create({
        data: account,
        select:{
            id: true,
            whatsapp_id: true,
            status: true
        }
    });
}

export default {
    create
}