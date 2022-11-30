import { db } from '../database/db.js'

async function getPoll(req, res) {
    try {
        const render = await db.collection('polls').find().toArray()
        return res.status(200).send(render)
    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

async function postPoll(req, res) {
    const quizz = res.locals.poll

    try {
        await db.collection("polls").insertOne({
            title: quizz.title,
            expireAt: quizz.expireAt
        });
        return res.status(201).send("Enquete criada com sucesso!");

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    };

};

async function getPollParams(req, res) {

    const params = req.params

    try {

        const renderChoices = await db.collection('choices').find({ pollId: params.id }).toArray()

        return res.status(200).send(renderChoices)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    };
};

export { getPoll, postPoll, getPollParams };