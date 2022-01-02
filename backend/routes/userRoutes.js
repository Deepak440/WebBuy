import express from "express";
import { authUser,registerUser,  getUserProfile, updateUserProfile } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//User Auth
router.post('/login' , authUser);
router.route('/profile').get(protect , getUserProfile).put(protect , updateUserProfile);

router.route('/').post(registerUser); 


export default router;
