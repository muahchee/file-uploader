import {
  changeFoldername,
  getFolderByFolderId,
  getFolderByFoldername,
} from "../lib/queries.js";
import fs from "fs/promises";
import { body, validationResult, matchedData } from "express-validator";

export async function updateFolderGet(req, res) {
  const folderId = Number(req.params.id);
  const folder = await getFolderByFolderId(folderId, req.user.id);
  console.log(folder);
  const foldername = folder.name;
  res.render("updateFolder", {
    originalName: foldername,
    folderId: folderId,
  });
}

const validateFoldername = [body("foldername").trim()];

export const updateFolderPost = [
  validateFoldername,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
        folders: allFolders,
      });
    }

    const folderId = Number(req.params.id);
    const folder = await getFolderByFolderId(folderId, req.user.id);
    const targetFoldername = folder.name;
    const { foldername } = matchedData(req);

    //validate folder exists (need req.user so I can't put it in the validator on top)
    const folderCheck = await getFolderByFoldername(
      foldername,
      req.user.id
    );
    console.log(folderCheck)
    if (targetFoldername === foldername) {
      return res.status(400).render("updateFolder", {
        errors: [{ msg: "Folder name is still the same." }],
        folderId: folderId,
        originalName: targetFoldername,
      });
    }
    if (folderCheck) {
      return res.status(400).render("updateFolder", {
        errors: [{ msg: "Folder name already exists!" }],
        folderId: folderId,
        originalName: targetFoldername,
      });
    }
    try {
      //change in db
      await changeFoldername(folderId, req.user.id, foldername);

      //change in system
      await fs.rename(
        process.cwd() + `/public/uploads/${targetFoldername}`,
        process.cwd() + `/public/uploads/${foldername}`
      );

      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
