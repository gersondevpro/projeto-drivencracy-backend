import { db } from '../database/db.js';
import dayjs from 'dayjs';

async function postChoice(req, res) {
    const { title, pollId } = req.body;
    try {
        await db.collection('choices').insertOne({
            title,
            pollId
        });
        return res.sendStatus(201);

    } catch (err) {
        console.log(err);
        return res.status(500);
    };
};

async function postVote(req, res) {
    try {
        const vote = req.params

        await db.collection('votes').insertOne({
            createdAt: dayjs().locale('br').format('YYYY-MM-DD HH:mm'),
            choiceId: vote.id
        });

        return res.sendStatus(201)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

export { postChoice, postVote };