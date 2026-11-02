import { Router } from "express";
import {
  login,
  get,
  register,
  update,
  remove,
} from "../../controllers/authController.js";
import passport from "passport";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", passport.authenticate("jwt", { session: false }), get);
router.patch("/me", passport.authenticate("jwt", { session: false }), update);
router.delete("/me", passport.authenticate("jwt", { session: false }), remove);

export default router;
