import { getAllFiles, getFileByFileId, getFolderByFolderId } from "../../lib/queries.js";
import { supabase } from "../../lib/supabaseConfig.js";

export async function readFolderGet(req, res, next) {
  try {
    const folderId = Number(req.params.folderId)
    const filesArr = await getAllFiles(folderId);
    const folder = await getFolderByFolderId(folderId, req.user.id);

    res.render("folder", {
      folder: folder,
      files: filesArr,
    });
  } catch (err) {
    next(err);
  }
}

