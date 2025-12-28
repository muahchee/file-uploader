import {
  deleteFilebyFileId,
  getFileByFileId,
  getFolderByFolderId,
} from "../../lib/queries.js";
import fs from "fs/promises";

export const deleteFilePost = async (req, res, next) => {
  const folder = await getFolderByFolderId(
    Number(req.params.folderId),
    Number(req.user.id)
  );
  console.log(folder.id)
  const file = await getFileByFileId(Number(req.params.fileId), folder.id);

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
