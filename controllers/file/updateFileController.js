import {
  changeFilename,
  changeFolderId,
  getAllFolders,
  getFileByFileId,
  getFileByFilename,
  getFolderByFolderId,
} from "../../lib/queries.js";

import { body, matchedData, validationResult } from "express-validator";
import fs from "fs/promises";

export async function updateFileGet(req, res, next) {
  const folderId = Number(req.params.folderId);
  const currentfolder = await getFolderByFolderId(folderId, req.user.id);

  const fileId = Number(req.params.fileId);
  const currentfile = await getFileByFileId(fileId, currentfolder.id);

  const allFolders = await getAllFolders(req.user.id);

  try {
    res.render(`updateFile`, {
      file: currentfile,
      currentFolder: currentfolder,
      folders: allFolders,
    });
  } catch (err) {
    next(err);
  }
}

const validateFilename = [body("newFilename").trim()];

export const updateFilePost = [
  validateFilename,
  async (req, res, next) => {
    //----original info-----
    const folderId = Number(req.params.folderId);
    const currentFolder = await getFolderByFolderId(folderId, req.user.id);

    const fileId = Number(req.params.fileId);
    const currentFile = await getFileByFileId(fileId, currentFolder.id);

    const allFolders = await getAllFolders(req.user.id);

    //----errors----
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateFile", {
        errors: errors.array(),
        file: currentFile,
        currentFolder: currentFolder,
        folders: allFolders,
      });
    }

    //---updated info----
    const { newFilename } = matchedData(req);
    const newFolderId = Number(req.body.newFolderId);
    const newFolder = await getFolderByFolderId(newFolderId, req.user.id);

    //---check if filename exists (allow for no change)-----
    const fileCheck = await getFileByFilename(newFilename, currentFolder.id);

    if (fileCheck && currentFile.name !== newFilename) {
      return res.status(400).render("updateFile", {
        errors: [{ msg: "File name already exists!" }],
        file: currentFile,
        currentFolder: currentFolder,
        folders: allFolders,
      });
    }

    try {
      //change in storage
      await fs.rename(
        process.cwd() +
          `/public/uploads/${req.user.username}/${currentFolder.name}/${currentFile.name}`,
        process.cwd() +
          `/public/uploads/${req.user.username}/${newFolder.name}/${newFilename}`
      );

      //change in db
      await changeFilename(currentFile.id, currentFolder.id, newFilename);

      await changeFolderId(currentFile.id, currentFile.folderId, newFolderId);

      res.redirect(`/folder/${currentFolder.id}`);
    } catch (err) {
      next(err);
    }
  },
];
