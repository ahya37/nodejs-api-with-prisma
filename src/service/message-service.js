import { prismaClient } from "../aplication/database.js";
import { logger } from "../aplication/logging.js";
import { getNewSession } from "../utils/qrcode.js";
import { sessionExists } from "../utils/sessionexists.js";
import { sendMessageValidation } from "../validation/message-validation.js";
import { validate } from "../validation/validation.js";

const sendMessage = async (user, request) => {

    const campaign =  validate(sendMessageValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where:{
            username: user.username
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404,"user is not found");
    }

    const newSession =  getNewSession(); // session baru di generare
    
    let WaClient = sessionExists.find(sess => sess.id == campaign.sender);

    // jika session tidak ada di server, maka get session baru
    if (!WaClient) {
        WaClient = newSession.find(sess => sess.id == campaign.sender).client;
    }else{
        WaClient = WaClient.client
    }

    let responses = {};
    await WaClient.sendMessage(campaign.number, campaign.message).then(response => {
        responses.results = response._data
    }).catch(error => {
         responses.data = error
    })

    return responses;
}

export default {
    sendMessage
}