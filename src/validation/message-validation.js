import Joi from "joi"

const sendMessageValidation = Joi.object({
    sender: Joi.string().min(1).required(),
    number: Joi.string().min(1).required(),
    message:Joi.string().min(1).required()
})

export {
    sendMessageValidation
}