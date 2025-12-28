import {
  deleteAllFilesbyFolderId,
  deleteFolderbyFolderId,
  getFolderByFolderId,
} from "../../lib/queries.js";
import fs from "fs/promises";

export async function deleteFolderPost(req, res) {
  const folderId = Number(req.params.id);
  const targetFolder = await getFolderByFolderId(folderId, req.user.id);
  const targetFoldername = targetFolder.name;

  try {
    //delete in db
    await deleteAllFilesbyFolderId(folderId)
    await deleteFolderbyFolderId(folderId);
    
    //delete in storage
    fs.rmdir(
      process.cwd() +
        `/public/uploads/${req.user.username}/${targetFoldername}`,
      { recursive: true },
      (err) => {
        throw new Error(err);
      }
    );

    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}
