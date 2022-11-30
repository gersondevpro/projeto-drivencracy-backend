import { Router } from 'express';
import { getPoll, getPollParams, postPoll } from '../controllers/pollController.js';
import { pollSchemaValidate, getPollChoices } from '../middlewares/pollSchemaValidate.js';

const router = Router();

router.get('/poll', getPoll);
router.post('/poll', pollSchemaValidate, postPoll);
router.get('/poll/:id/choice', getPollChoices, getPollParams)

export default router;
