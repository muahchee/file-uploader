import { Router } from "express";
import { isUser } from "../../lib/auth/authMiddle.js";

import { deleteFilePost } from "../../controllers/file/deleteFileController.js";

export const deleteFileRouter = Router();

deleteFileRouter.post("/:folderId/:fileId", isUser, deleteFilePost);
