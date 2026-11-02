import { Router } from "express";
import { getOne, getPosts } from "../../controllers/usersController.js";
import optionalAuth from "../../middleware/optionalAuth.js";

const router = Router();

router.get("/:id", getOne);
router.get("/:id/posts", optionalAuth, getPosts);

export default router;
