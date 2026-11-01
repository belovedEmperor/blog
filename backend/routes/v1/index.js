import { Router } from "express";
import usersRouter from "./usersRouter.js";
import commentsRouter from "commentsRouter.js";
import postsRouter from "postsRouter.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

export default router;
