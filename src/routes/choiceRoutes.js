import { Router } from "express";
import { postChoice } from "../controllers/choiceController.js";
import choiceSchemaValidate from "../middlewares/choiceSchemaValidate.js";

const router = Router()

router.post('/choice', choiceSchemaValidate, postChoice);

export default router;
