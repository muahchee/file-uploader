// getUserById getUserbyName
import { prisma } from "../lib/prisma.js";
//------CREATE------

export async function createUser({ username, email, password }) {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
      email: email,
    },
  });
}

export async function createFolder({ foldername, userId }) {
  await prisma.folder.create({
    data: {
      name: foldername,
      userId: userId,
    },
  });
}

export async function createFile({ filename, folderId }) {
  await prisma.file.create({
    data: {
      name: filename,
      folderId: folderId,
    },
  });
}

//------READ-------

//-User-
export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}

export async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

//-Folder-
export async function getAllFolders(userId) {
  const folder = await prisma.folder.findMany({
    where: {
      userId: userId,
    },
  });

  return folder;
}

export async function getFolderByFoldername(foldername, userId) {
  const folder = await prisma.folder.findFirst({
    where: {
      name: foldername,
      userId: userId,
    },
  });
  return folder;
}

export async function getFolderByFolderId(folderId, userId) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
      userId: userId
    },
  });
  return folder;
}

//-File-
export async function getAllFiles(folderId) {
  const files = await prisma.file.findMany({
    where: {
      folderId: folderId,
    },
  });

  return files;
}

export async function getFileByFilename(filename, folderId) {
  const file = await prisma.file.findFirst({
    where: {
      name: filename,
      folderId: folderId,
    },
  });
  return file;
}

export async function getFileByFileId(fileId, folderId) {
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
      folderId: folderId,
    },
  });
  return file;
}

export async function getLatestFileId() {
  const latestId = await prisma.file.aggregate({
    _max:{
      id: true
    }
  })

  return latestId._max.id
}

//-------UPDATE---------

//-Folder-
export async function changeFoldername(folderId, userId, newFoldername) {
  await prisma.folder.update({
    where: {
      id: folderId,
      userId: userId
    },
    data: {
      name: newFoldername,
    },
  });
}

//-File-
export async function changeFilename(fileId, folderId, newFilename) {
  await prisma.file.update({
    where: {
      id: fileId,
      folderId: folderId,
    },
    data: {
      name: newFilename,
    },
  });
}

//-------DELETE-------

// -folder-
export async function deleteFolderbyFolderId(folderId) {
  await prisma.folder.delete({
    where: {
      id: folderId,
    },
  });
}

// -file-
export async function deleteFilebyFileId(fileId) {
  await prisma.file.delete({
    where: {
      id: fileId,
    },
  });
}

export async function deleteAllFilesbyFolderId(folderId) {
  await prisma.file.deleteMany({
    where: {
      folderId: folderId
    }
  })
}
