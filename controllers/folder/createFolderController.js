import {
  createFolder,
  getFolderByFoldername,
  getAllFolders,
} from "../../lib/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const validateFoldername = [body("foldername").trim()];

export const createFolderPost = [
  validateFoldername,
  async (req, res, next) => {
    const allFolders = await getAllFolders(req.user.id);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
        folders: allFolders,
      });
    }

    const { foldername } = matchedData(req);

    //validate folder exists (need req.user so I can't put it in the validator on top)
    const folder = await getFolderByFoldername(foldername, req.user.id);
    if (folder) {
      return res.status(400).render("index", {
        errors: [{ msg: "Folder name already exists!" }],
        folders: allFolders,
      });
    }

    try {
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
