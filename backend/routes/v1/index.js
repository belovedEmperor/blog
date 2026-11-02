import { Router } from "express";
import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";
import authRouter from "./authRouter.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/auth", authRouter);

export default router;
