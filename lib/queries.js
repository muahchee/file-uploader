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

//------READ-------
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

export async function getAllFolders(userId) {
  const folder = await prisma.folder.findMany({
    where: {
      userId: userId,
    },
  });

  return folder;
}

export async function getFolderByFoldername(foldername, userId) {
  const folder = await prisma.folder.findUnique({
    where: {
      name: foldername,
      user: {
        id: userId,
      },
    },
  });
  return folder;
}

//-------UPDATE---------

//-------DELETE-------

export async function deleteFolderbyFolderId(folderId) {
  await prisma.folder.delete({
    where: {
      id: folderId,
    },
  });
}
