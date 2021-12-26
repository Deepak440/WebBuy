import express from "express";
import { authUser,registerUser,  getUserProfile } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//User Auth
router.post('/login' , authUser);
router.route('/profile').get(protect , getUserProfile);

router.route('/').post(registerUser); 


export default router;
