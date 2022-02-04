import express from "express";
import { authUser,registerUser,  getUserProfile, updateUserProfile , getUsers} from "../controller/userController.js";
import { protect , admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//User Auth
router.post('/login' , authUser);
router.route('/profile').get(protect , getUserProfile).put(protect , updateUserProfile);

router.route('/').post(registerUser).get( protect ,admin ,getUsers); 


export default router;
