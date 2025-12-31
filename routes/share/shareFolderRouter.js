import { Router } from "express";
import { shareFolderGet } from "../../controllers/share/shareFolderController.js";

export const shareFolderRouter = Router();

shareFolderRouter.get(":code", shareFolderGet);
