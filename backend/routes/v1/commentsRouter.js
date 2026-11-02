import { Router } from "express";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../../controllers/commentsController.js";

const router = Router({ mergeParams: true });

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
