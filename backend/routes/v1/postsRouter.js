import { Router } from "express";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../../controllers/postsController.js";
import commentsRouter from "./commentsRouter.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

router.use("/:postId/comments", commentsRouter);

export default router;
