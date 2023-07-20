import { prismaClient } from "../aplication/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js"
import { createQrcodeValidation } from "../validation/qrcode-validation.js"
import { getSessionExists } from "../utils/sessionexists.js";
import { getQrCode } from "../utils/qrcode.js";

const create = async (user, request) => {

    const device =  validate(createQrcodeValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where:{
            username: user.username
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404,"user is not found");
    }


    return getQrCode(device.deviceId).then((qr) => {
        const data = {
            qrcode: qr
        }
        return data
    }).catch((err) => {
        return err
    })

}

const getSessions = async () => {
   return getSessionExists();
}

export default {
    create,
    getSessions
}