import dayjs from 'dayjs';
import { db } from '../database/db.js';
import { ObjectId } from 'mongodb';
import { quizzSchema } from "../schemas/quizzSchema.js";

function pollSchemaValidate(req, res, next) {
    const quizz = req.body;

    const validationQuizz = quizzSchema.validate(quizz, { abortEarly: false })
    if (validationQuizz.error) {
        const mapError = validationQuizz.error.details.map(e => e.message);
        return res.status(422).send(mapError);
    };

    if (!quizz.expireAt) {
        quizz.expireAt = dayjs().locale('br').add(30, 'day').format('YYYY-MM-DD HH:mm');
    };

    res.locals.poll = quizz;

    next()
}

async function getPollChoices(req, res, next) {
    const params = req.params

    const findPoll = await db.collection('polls').findOne({ _id: ObjectId(params) })
    if (!findPoll) {
        return res.status(404).send("Enquete não existe!")
    }

    next()
}

async function getPollResults(req, res, next) {

    const result = req.params;

    try {

        const findPoll = await db.collection('polls').findOne({ _id: ObjectId(result.id) })

        res.locals.findPoll = findPoll;

    } catch (err) {
        console.log(err);
        return res.status(404).send("Enquete não existe!")
    };

    next();
}

export {
    pollSchemaValidate,
    getPollChoices,
    getPollResults
};