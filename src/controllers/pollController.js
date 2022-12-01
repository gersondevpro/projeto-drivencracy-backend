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
        return res.status(201).send(quizz);

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

async function postVoteResult(req, res) {
    const result = req.params;
    const findPoll = res.locals.findPoll

    try {

        const findChoicesId = await db.collection('choices').find({ pollId: result.id }).toArray()

        const filterVotes = findChoicesId.map(v => v._id)

        let vote = "";
        let count = 0;
        for (let i = 0; i < filterVotes.length; i++) {

            let countFor = await db.collection('votes').find({ choiceId: filterVotes[i].toString() }).toArray()
            let numVotes = countFor.length

            if (count < numVotes) {
                count = numVotes;
                vote = filterVotes[i]
            }
        }

        const resultPoll = {
            _id: findPoll._id,
            title: findPoll.title,
            expireAt: findPoll.expireAt,
            result: {
                title: vote,
                votes: count
            }
        }

        return res.status(200).send(resultPoll)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    };
};

export { getPoll, postPoll, getPollParams, postVoteResult };