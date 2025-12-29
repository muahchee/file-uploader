export async function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    return res.status(401).render("401", {
      errorMsg: "Either you are logged out or you are not an almighty ADMIN",
    });
  }
}

export async function isUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).render("401", {
      errorMsg: "Either you are logged out or you are not an almighty ADMIN",
    });
  }
}
