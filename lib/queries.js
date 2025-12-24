// getUserById getUserbyName

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

//-------UPDATE---------

//-------DELETE-------
