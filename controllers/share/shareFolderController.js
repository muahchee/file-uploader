import {
  getAllFiles,
  getFolderByFolderId,
  getShareByCode,
} from "../../lib/queries.js";

export async function shareFolderGet(req, res, next) {
  const share = await getShareByCode(req.params.code);
  const folder = await getFolderByFolderId(Number(share.folderId), req.user.id);
  const files = await getAllFiles(folder.id);

  const durationMilliseconds = Number(share.durationSeconds) * 1000;
  const createdDate = new Date(share.createdAt);
  const expiryDate = new Date(createdDate.getTime() + durationMilliseconds);

  const now = new Date();

  if (expiryDate < now) {
    return res.render("shareFolder", {
      errors: [{ msg: "Link has expired!" }],
    });
  }

  try {
    return res.render("shareFolder", {
      sharedFolder: {
        foldername: folder.name,
        expiresAt: expiryDate,
        folderId: folder.id,
      },
      sharedFiles: files,
    });
  } catch (err) {
    next(err);
  }
}
