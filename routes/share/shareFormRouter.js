import { Router } from "express";
import { shareFormGet, shareFormPost } from "../../controllers/share/shareFormController.js";

export const shareFormRouter = Router();

shareFormRouter.get("/:folderId", shareFormGet);

shareFormRouter.post("/:folderId", shareFormPost)
