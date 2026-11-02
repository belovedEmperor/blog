import { Router } from "express";
import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";
// import commentsRouter from "./commentsRouter.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
// router.use("/comments", commentsRouter);

export default router;
