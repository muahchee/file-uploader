import {
  deleteFilebyFileId,
  getFileByFileId,
  getFolderByFolderId,
} from "../../lib/queries.js";
import fs from "fs/promises";

export const deleteFilePost = async (req, res, next) => {
  const folderId = Number(req.params.folderId);
  const folder = await getFolderByFolderId(folderId, req.user.id);
  const fileId = Number(req.params.fileId)
  const file = await getFileByFileId(fileId, folder.id);

  try {
    //delete in db
    await deleteFilebyFileId(file.id);
    //delete in storage
    await fs.unlink(
      process.cwd() +
        `/public/uploads/${req.user.username}/${folder.name}/${file.name}`
    );

    res.redirect(`/folder/${folder.id}`);
  } catch (err) {
    next(err);
  }
};
