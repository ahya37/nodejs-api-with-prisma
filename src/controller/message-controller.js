import { logger } from "../aplication/logging.js";
import messageService from "../service/message-service.js";
import { phoneNumberFormatter } from "../utils/phoneNumberformatter.js";

const sendMessage = async (req, res, next) => {
    try {

        const user = req.user;
        const request = req.body;
        const setNumber  = phoneNumberFormatter(req.body.number);
        request.number = setNumber

        const result = await messageService.sendMessage(user, request);
        logger.info(result);
        res.status(200).json({
            data: result
        });
        
    } catch (e) {
        next(e)
    }
}

export default {
    sendMessage
}