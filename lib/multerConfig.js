import multer from "multer";
import {
  getFolderByFolderId,
  getFileByFilename,
  getLatestFileId,
} from "./queries.js";

// const storage = multer.diskStorage({
//   destination: async function (req, file, cb) {
//     const folder = await getFolderByFolderId(
//       Number(req.params.folderId),
//       req.user.id
//     );

//     cb(
//       null,
//       process.cwd() + `/public/uploads/${req.user.username}/${folder.name}`
//     );
//   },
//   filename: async function (req, file, cb) {
//     let filename = file.originalname;
//     const fileExists = await getFileByFilename(
//       filename,
//       Number(req.params.folderId)
//     );
//     const fileId = (await getLatestFileId()) + 1;

//     if (fileExists) {
//       //split filename from extension is there is one
//       if (filename.includes(".")) {
//         const parts = filename.split(".");
//         const newFilename = parts[0] + `(id${fileId})` + "." + parts[1];
//         filename = newFilename;
//       } else {
//         const newFilename = filename + `(id${fileId})`;
//         filename = newFilename;
//       }
//     }

//     cb(null, filename);
//   },
// });

const storage = multer.memoryStorage()

// const storage = multer.diskStorage({
//   destination: async function (req, file, cb) {
//     const folder = await getFolderByFolderId(
//       Number(req.params.folderId),
//       req.user.id
//     );
//     cb(
//       null,
//       process.cwd() + `/public/uploads/${req.user.username}/${folder.name}`
//     );
//   },
//   filename: async function (req, file, cb) {
//     let filename = file.originalname;
//     const fileExists = await getFileByFilename(
//       filename,
//       Number(req.params.folderId)
//     );
//     const fileId = (await getLatestFileId()) + 1;

//     if (fileExists) {
//       //split filename from extension is there is one
//       if (filename.includes(".")) {
//         const parts = filename.split(".");
//         const newFilename = parts[0] + `(id${fileId})` + "." + parts[1];
//         filename = newFilename;
//       } else {
//         const newFilename = filename + `(id${fileId})`;
//         filename = newFilename;
//       }
//     }

//     cb(null, filename);
//   },
// });

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3000000,
    parts: 12,
  },
});
