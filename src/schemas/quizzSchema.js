import joi from 'joi';

const quizzSchema = joi.object({
    title: joi.string().required().min(10).max(120),
    expireAt: joi.date().greater('now')
})

export {
    quizzSchema
}