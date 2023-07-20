import Joi from "joi";

const createAccountValidation = Joi.object({
    whatsapp_id: Joi.number().max(20).positive().required(),
    status: Joi.string().max(20).optional(),
    created_by: Joi.number().min(1).positive().required()
})

export {
    createAccountValidation
}