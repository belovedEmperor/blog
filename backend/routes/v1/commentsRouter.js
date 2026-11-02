import { Router } from "express";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../../controllers/commentsController.js";
import passport from "passport";

const router = Router({ mergeParams: true });

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", passport.authenticate("jwt", { session: false }), create);
router.patch("/:id", passport.authenticate("jwt", { session: false }), update);
router.delete("/:id", passport.authenticate("jwt", { session: false }), remove);

export default router;
