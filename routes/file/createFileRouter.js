import { Router } from "express";
import { upload } from "../../lib/multerConfig.js";
import { createFilePost } from "../../controllers/file/createFileController.js";
import { isUser } from "../../lib/auth/authMiddle.js";

export const createFileRouter = Router();

createFileRouter.post("/:folderId", isUser, upload.array("files"), createFilePost);
