import { Router } from "express";
import { upload } from "../../lib/multerConfig.js";
import { createFilePost } from "../../controllers/file/createFileController.js";
import { isUser } from "../../lib/auth/authMiddle.js";

export const createFileRouter = Router();

const multerUpload = upload.array("files")

createFileRouter.post("/:folderId", isUser, multerUpload, createFilePost);
