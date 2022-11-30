import { Router } from "express";
import { postChoice, postVote } from "../controllers/choiceController.js";
import { choiceSchemaValidate, choiceVote } from "../middlewares/choiceSchemaValidate.js";

const router = Router()

router.post('/choice', choiceSchemaValidate, postChoice);

router.post('/choice/:id/vote', choiceVote, postVote);

export default router;
