import { createFile } from "../../lib/queries.js";

export async function createFilePost(req, res, next) {
  const filesArr = req.files;
  const folderId = Number(req.params.folderId);

  try {
    //create file in db
    //multer creates files in storage
    for (const file of filesArr) {
      await createFile({
        filename: file.filename,
        filesize: file.size,
        folderId: folderId,
      });
    }
    res.redirect(`/folder/${folderId}`);
  } catch (err) {
    next(err);
  }
}
