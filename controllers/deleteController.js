import { deleteFolderbyFolderId } from "../lib/queries.js";

export async function deleteFolderPost(req, res) {
  const folderId = Number(req.params.id);
  await deleteFolderbyFolderId(folderId);
  res.redirect("/")
}
