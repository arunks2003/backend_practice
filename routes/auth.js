import express from "express";
import registerController from "../contollers/registerController.js";
const router = express.Router();

//routing
//register route
//method is post
router.post("/register", registerController);

export default router;
