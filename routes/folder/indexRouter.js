import { Router } from "express";
import { initialFoldersGet } from "../../controllers/indexController.js";
import { addUserGet, addUserPost } from "../../controllers/signupController.js";
import { isUser } from "../../lib/auth/authMiddle.js";
import { createFolderPost } from "../../controllers/folder/createFolderController.js";

export const indexRouter = Router();

indexRouter.get("/", initialFoldersGet);

indexRouter.post("/createfolder", isUser, createFolderPost)

indexRouter.get("/signup", addUserGet);
indexRouter.post("/signup", addUserPost);

