import { getFileByFileId, getFolderByFolderId } from "../../lib/queries.js";
import { supabase } from "../../lib/supabaseConfig.js";
import fs from "fs/promises";

export async function downloadFileGet(req, res, next) {
  try {
    const folderId = Number(req.params.folderId);
    const folder = await getFolderByFolderId(folderId);
    const fileId = Number(req.params.fileId);
    const file = await getFileByFileId(fileId, folderId);
    const supabasePath = `${req.user.username}/${folder.name}/${file.name}`;


    //download file to system
    const { data } = await supabase.download(supabasePath);
    const download = new DataView(await data.arrayBuffer());
    await fs.appendFile(
      process.cwd() + `/public/uploads/${file.name}`,
      download
    );

    //delete file in system after 30 seconds
    setTimeout(async () => {
      await fs.unlink(process.cwd() + `/public/uploads/${file.name}`);
      console.log("delete!")
    }, 30000);

    res.download(process.cwd() + `/public/uploads/${file.name}`);
  } catch (err) {
    next(err);
  }
}
