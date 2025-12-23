// getUserById getUserbyName

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
