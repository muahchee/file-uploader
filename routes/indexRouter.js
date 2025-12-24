import { Router } from "express";
import { initialFoldersGet } from "../controllers/indexController.js";
import { addUserGet, addUserPost } from "../controllers/signupController.js";

export const indexRouter = Router();

indexRouter.get("/", initialFoldersGet);
indexRouter.get("/signup", addUserGet);
indexRouter.post("/signup", addUserPost);
