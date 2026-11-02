import { Router } from "express";
import { getOne } from "../../controllers/usersController.js";

const router = Router();

router.get("/:id", getOne);

export default router;
