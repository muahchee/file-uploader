import { Router } from "express";
import { isUser } from "../../lib/auth/authMiddle.js";
import { updateFolderGet, updateFolderPost } from "../../controllers/folder/updateFolderController.js";


export const updateFolderRouter = Router();

updateFolderRouter.get("/:id", isUser, updateFolderGet)
updateFolderRouter.post("/:id", isUser, updateFolderPost);