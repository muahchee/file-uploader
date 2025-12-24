import { Router } from "express";
import { initialFoldersGet } from "../controllers/indexController.js";

export const indexRouter = Router()

indexRouter.get("/", initialFoldersGet)
indexRouter.post("/signup", )