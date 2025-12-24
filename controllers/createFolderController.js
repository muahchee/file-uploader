import fs from "fs/promises";
import { createFolder, getFolderByFoldername } from "../lib/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const validateFoldername = [body("foldername").trim()];

export const createFolderPost = [
  validateFoldername,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
      });
    }

    const { foldername } = matchedData(req);

    //validate folder exists (need req.user so I can't put it in the validator on top)
    const folder = await getFolderByFoldername(foldername, req.user.id);
    if (folder) {
      return res.status(400).render("index", {
        errors: ["Folder name already exists!"],
      });
    }

    try {
      //create folder in system
      await fs.mkdir(process.cwd() + `/public/uploads/${foldername}`);

      //create folder in db
      await createFolder({
        foldername: foldername,
        userId: req.user.id,
      });
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
