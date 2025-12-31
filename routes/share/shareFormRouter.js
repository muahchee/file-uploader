import { Router } from "express";
import { shareFormGet, shareFormPost } from "../../controllers/share/shareFormController.js";
import { isUser } from "../../lib/auth/authMiddle.js";

export const shareFormRouter = Router();

shareFormRouter.get("/:folderId", isUser, shareFormGet);

shareFormRouter.post("/:folderId",isUser, shareFormPost)
