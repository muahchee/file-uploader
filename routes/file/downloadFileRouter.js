import { Router } from "express";
import { downloadFileGet } from "../../controllers/file/downloadFileController.js";

export const downloadFileRouter = Router()

downloadFileRouter.get("/:folderId/:fileId", downloadFileGet)