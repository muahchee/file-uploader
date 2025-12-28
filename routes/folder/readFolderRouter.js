import { Router } from "express";
import { readFolderGet } from "../../controllers/folder/readFolderController.js";

export const readFolderRouter = Router();

readFolderRouter.get("/:folderId", readFolderGet)