import { Router } from "express";
import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

export default router;
