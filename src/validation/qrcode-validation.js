import Joi from "joi";

const createQrcodeValidation = Joi.object({
    deviceId: Joi.string().min(1).required()
});

export {
    createQrcodeValidation
}