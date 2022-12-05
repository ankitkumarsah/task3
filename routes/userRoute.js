import express from "express";
import { addUser } from "../controllers/userController";
const userRoute = express.Router();
userRoute.post("/regstration", addUser);
export default userRoute;
