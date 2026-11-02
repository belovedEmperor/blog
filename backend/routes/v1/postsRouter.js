import { Router } from "express";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../../controllers/postsController.js";
import commentsRouter from "./commentsRouter.js";
import passport from "passport";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", passport.authenticate("jwt", { session: false }), create);
router.patch("/:id", passport.authenticate("jwt", { session: false }), update);
router.delete("/:id", passport.authenticate("jwt", { session: false }), remove);

router.use("/:postId/comments", commentsRouter);

export default router;
