import { Router } from 'express';
import { getPoll, postPoll} from '../controllers/quizzController.js';
import postSchemaValidate from '../middlewares/postSchemaValidate.js';

const router = Router();

router.get('/poll', getPoll);
router.post('/poll', postSchemaValidate, postPoll);

export default router;
