import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  delteUser,
  getUserById,
  updateUser,
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//User Auth
router.post("/login", authUser);
router
  .route("/")
  .post(registerUser)
  .get(protect, admin, getUsers);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
    .route("/:id")
    .delete(protect, admin, delteUser)
    .get(protect , admin , getUserById )
    .put(protect , admin , updateUser)
export default router;
