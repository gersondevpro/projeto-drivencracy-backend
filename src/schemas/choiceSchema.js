import joi from 'joi';

const choiceSchema = joi.object({
    title: joi.string().required(),
    pollId: joi.string().required()
});

const validateDataSchema = joi.object({
    expireAt: joi.date().greater('now').required()
});

export {
    choiceSchema,
    validateDataSchema
};