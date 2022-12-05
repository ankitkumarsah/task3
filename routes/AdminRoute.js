import express from "express";
import { userLists } from "../controllers/AdminController";
import auth from "../middlewares/auth";
const AdminRoute = express.Router();

AdminRoute.get("/lists", auth, userLists);
export default AdminRoute;
