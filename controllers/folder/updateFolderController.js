import {
  changeFileUrl,
  changeFoldername,
  getAllFiles,
  getFolderByFolderId,
  getFolderByFoldername,
} from "../../lib/queries.js";
import { body, validationResult, matchedData } from "express-validator";
import { supabase } from "../../lib/supabaseConfig.js";

export async function updateFolderGet(req, res) {
  const folderId = Number(req.params.id);
  const folder = await getFolderByFolderId(folderId, req.user.id);
  const foldername = folder.name;
  res.render("updateFolder", {
    originalName: foldername,
    folderId: folderId,
  });
}

const validateFoldername = [body("foldername").trim()];

export const updateFolderPost = [
  validateFoldername,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
        folders: allFolders,
      });
    }

    const folderId = Number(req.params.id);
    const folder = await getFolderByFolderId(folderId, req.user.id);
    const targetFoldername = folder.name;
    const { foldername } = matchedData(req);

    //validate folder exists (need req.user so I can't put it in the validator on top)
    const folderCheck = await getFolderByFoldername(foldername, req.user.id);

    //if folder exists and is different from the target folder (this allows renaming with the same name)
    if (folderCheck && targetFoldername !== foldername) {
      return res.status(400).render("updateFolder", {
        errors: [{ msg: "Folder name already exists!" }],
        folderId: folderId,
        originalName: targetFoldername,
      });
    }
    try {
      //change in supabase
      const filesToUpdate = await getAllFiles(folderId);

      for (const fileToUpdate of filesToUpdate) {
        await supabase.move(
          `${req.user.username}/${targetFoldername}/${fileToUpdate.name}`,
          `${req.user.username}/${foldername}/${fileToUpdate.name}`
        );

        //update public url link
        const newUrl = supabase.getPublicUrl(
          `${req.user.username}/${foldername}/${fileToUpdate.name}`
        ).data.publicUrl;

        await changeFileUrl(fileToUpdate.id, newUrl, fileToUpdate.folderId);
      }

      //change in db
      await changeFoldername(folderId, req.user.id, foldername);

      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
