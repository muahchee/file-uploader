import { Router } from "express";
import { isUser } from "../../lib/auth/authMiddle.js";
import { deleteFolderPost } from "../../controllers/folder/deleteFolderController.js";


export const deleteFolderRouter = Router();

deleteFolderRouter.post("/:id", isUser, deleteFolderPost);
