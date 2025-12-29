import { Router } from "express";
import { isUser } from "../../lib/auth/authMiddle.js";
import {
  updateFileGet,
  updateFilePost,
} from "../../controllers/file/updateFileController.js";

export const updateFileRouter = Router();

updateFileRouter.get("/:folderId/:fileId", isUser, updateFileGet);

updateFileRouter.post("/:folderId/:fileId", isUser, updateFilePost);
