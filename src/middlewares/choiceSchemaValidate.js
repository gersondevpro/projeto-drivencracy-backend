import { ObjectId } from "mongodb";
import { db } from "../database/db.js";
import { validateDataSchema, choiceSchema } from "../schemas/choiceSchema.js";

async function choiceSchemaValidate(req, res, next) {
    const { title, pollId } = req.body;

    const validationChoice = choiceSchema.validate({ pollId, title }, { abortEarly: false });
    if (validationChoice.error) {
        const mapError = validationChoice.error.details.map(e => e.message);
        return res.status(422).send(mapError);
    };
        
    const findPoll = await db.collection('polls').findOne({ _id: ObjectId(pollId) }); /* erro aqui */
        
    if (!findPoll) {
        
        return res.status(404).send("Enquete não existe!");
    };

    const findTitle = await db.collection('choices').findOne({ title: title });
    if (findTitle) {
        return res.status(409).send("Resposta já cadastrada!");
    };

    const expireAt = findPoll.expireAt
    const validationData = validateDataSchema.validate({ expireAt }, { abortEarly: false });
    if (validationData.error) {
        const mapError = validationData.error.details.map(e => e.message);
        return res.status(403).send(mapError);
    };

    next();
};

async function choiceVote(req, res, next) {
    const vote = req.params

    const findChoice = await db.collection('choices').findOne({ _id: ObjectId(vote) })
    if (!findChoice) {
        return res.sendStatus(404)
    }

    const findPoll = await db.collection('polls').findOne({ _id: ObjectId(findChoice.pollId) })
    if (!findPoll) {
        return res.sendStatus(404)
    }

    const expireAt = findPoll.expireAt
    const validationData = validateDataSchema.validate({ expireAt }, { abortEarly: false });
    if (validationData.error) {
        const mapError = validationData.error.details.map(e => e.message);
        return res.status(403).send(mapError);
    };

    next()
}

export {
    choiceSchemaValidate,
    choiceVote
}