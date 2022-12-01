import { Router } from 'express';
import { getPoll, getPollParams, postPoll, postVoteResult } from '../controllers/pollController.js';
import { pollSchemaValidate, getPollChoices, getPollResults } from '../middlewares/pollSchemaValidate.js';

const router = Router();

router.get('/poll', getPoll);
router.post('/poll', pollSchemaValidate, postPoll);
router.get('/poll/:id/choice', getPollChoices, getPollParams)
router.get('/poll/:id/result', getPollResults, postVoteResult);

export default router;
