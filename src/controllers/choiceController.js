import { db } from '../database/db.js';

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

export { postChoice };