import { getAllFolders } from "../lib/queries.js";

export async function initialFoldersGet(req, res) {
  if (req.isAuthenticated()) {
    const folders = await getAllFolders(req.user.id);
    res.render("index", {
      folders: folders,
    });
  } else {
    res.render("index");
  }
}
