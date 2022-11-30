import { db } from '../database/db.js'

async function getPoll (req, res) {
    try {
        const render = await db.collection('quizes').find().toArray()
        return res.status(200).send(render)
    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

async function postPoll (req, res) {
    const quizz = res.locals.poll

    try {
        await db.collection("quizes").insertOne({
            title: quizz.title,
            expireAt: quizz.expireAt
        });
        return res.status(201).send("Enquete criada com sucesso!");

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    };

};

export { getPoll, postPoll };