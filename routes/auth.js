import express from "express";
import registerController from "../contollers/registerController.js";
import loginController from "../contollers/loginController.js";
import testController from "../contollers/testController.js";
import { requiredSignIn } from "../middlewares/checkSignIn.middleware.js";
import isAdmin from "../middlewares/checkAdmin.middleware.js";
const router = express.Router();

//routing
//register route
//method is post
router.post("/register", registerController);

//login route
router.post("/login", loginController);

//test route
router.get("/test", requiredSignIn, isAdmin, testController);

export default router;
