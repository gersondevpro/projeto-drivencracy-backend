import { quizzSchema } from "../schemas/quizzSchema.js";

export default function postSchemaValidate(req, res, next) {
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