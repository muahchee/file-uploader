import { createFile } from "../../lib/queries.js";
import { supabase } from "../../lib/supabaseConfig.js";
import { decode } from "base64-arraybuffer";
import {
  getFolderByFolderId,
  getFileByFilename,
  getLatestFileId,
} from "../../lib/queries.js";

export async function createFilePost(req, res, next) {
  const filesArr = req.files;
  const folderId = Number(req.params.folderId);
  const folder = await getFolderByFolderId(folderId, req.user.id);

  try {
    //create file in db
    //multer creates files in storage
    for (const file of filesArr) {
      //validate name
      let filename = file.originalname;
      const fileExists = await getFileByFilename(
        filename,
        Number(req.params.folderId)
      );
      const fileId = (await getLatestFileId()) + 1;

      if (fileExists) {
        //split filename from extension is there is one
        if (filename.includes(".")) {
          const parts = filename.split(".");
          const newFilename = parts[0] + `(id${fileId})` + "." + parts[1];
          filename = newFilename;
        } else {
          const newFilename = filename + `(id${fileId})`;
          filename = newFilename;
        }
      }

      //create file in supabase, upload url to db
      const supabasePath = `${req.user.username}/${folder.name}/${filename}`;
      const actualFile = decode(file.buffer.toString("base64"));
      await supabase.upload(supabasePath, actualFile, {
        contentType: file.mimetype,
      });
      const publicUrl = supabase.getPublicUrl(supabasePath).data.publicUrl;

      await createFile({
        filename: filename,
        filesize: file.size,
        folderId: folderId,
        url: publicUrl,
      });
    }

    res.redirect(`/folder/${folderId}`);
  } catch (err) {
    next(err);
  }
}
