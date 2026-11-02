import { Router } from "express";
import {
  getAll,
  getOne,
  getPosts,
  create,
  update,
  remove,
} from "../../controllers/usersController.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:id/posts", getPosts);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
