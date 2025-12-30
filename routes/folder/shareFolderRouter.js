import { Router } from "express";
import { shareFolderGet } from "../../controllers/folder/shareFolderController .js";

export const shareFolderRouter = Router();

shareFolderRouter.get(":code", shareFolderGet);

shareFolderRouter.post()
