import { Router } from "express";
import { isUser } from "../lib/auth/authMiddle.js";
import { deleteFolderPost } from "../controllers/deleteFolderController.js";


export const deleteFolderRouter = Router();

deleteFolderRouter.post("/:id", isUser, deleteFolderPost);
