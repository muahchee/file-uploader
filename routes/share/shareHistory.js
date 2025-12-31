import { Router } from "express";
import { shareHistoryGet } from "../../controllers/share/shareHistoryController.js";
import { isUser } from "../../lib/auth/authMiddle.js";
export const shareHistoryRouter = Router()


shareHistoryRouter.get("/", isUser, shareHistoryGet)