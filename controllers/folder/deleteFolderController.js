import {
  deleteAllFilesbyFolderId,
  deleteFolderbyFolderId,
  getAllFiles,
  getFolderByFolderId,
} from "../../lib/queries.js";
import { supabase } from "../../lib/supabaseConfig.js";

export async function deleteFolderPost(req, res, next) {
  const folderId = Number(req.params.id);
  const targetFolder = await getFolderByFolderId(folderId, req.user.id);
  const targetFoldername = targetFolder.name;

  try {
    //delete in supabase
    const filesToDelete = await getAllFiles(folderId);
    let pathsToDeleteArr = [];
    for (const fileToDelete of filesToDelete) {
      pathsToDeleteArr.push(
        `${req.user.username}/${targetFoldername}/${fileToDelete.name}`
      );
    }
    await supabase.remove(pathsToDeleteArr);

    //delete in db
    await deleteAllFilesbyFolderId(folderId);
    await deleteFolderbyFolderId(folderId);

    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}
