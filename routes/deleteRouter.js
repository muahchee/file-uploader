import { Router } from "express";
import { isUser } from "../lib/auth/authMiddle.js";
import { deleteFolderPost } from "../controllers/deleteController.js";


export const deleteRouter = Router();

deleteRouter.post("/:id", isUser, deleteFolderPost);
