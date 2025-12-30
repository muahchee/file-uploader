import { Router } from "express";
import { isUser } from "../../lib/auth/authMiddle.js";
import { downloadFileGet } from "../../controllers/file/downloadFileController.js";

export const downloadFileRouter = Router()

downloadFileRouter.get("/:folderId/:fileId", isUser, downloadFileGet)