import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "../lib/queries.js";

import { body, validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import fs from "fs/promises"

const validateSignup = [
  body("username")
    .trim()
    .custom(async (value) => {
      const user = await getUserByUsername(value);
      if (user) throw new Error("Username already in use");
    }),
  body("email")
    .trim()
    .isEmail()
    .optional({ values: "falsy" })
    .withMessage(
      "Email is not in a valid format. Expected format is 'user@email.com'"
    )
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) throw new Error("Email already in use");
    }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters long"),
  body("confirm-password").custom(async (value, { req }) => {
    if (value != req.body.password) throw new Error("Passwords don't match!");
  }),
];

export async function addUserGet(req, res) {
  res.render("signup");
}

export const addUserPost = [
  validateSignup,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
        obj: {
          username: req.body.username,
          email: req.body.email ? req.body.email : null,
        },
      });
    }
    const { username, password, email } = matchedData(req, {
      includeOptionals: true,
    });

    try {

      //create user in db
      const hashedPw = await bcrypt.hash(password, 10);
      await createUser({
        username: username,
        email: email,
        password: hashedPw,
      });

      //create user folder in storage
      await fs.mkdir(process.cwd() + `/public/uploads/${username}`);


      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
