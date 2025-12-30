import e, { urlencoded } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import passport from "passport";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./lib/prisma.js";
import dotenv from "dotenv";
import "./lib/auth/passportConfig.js"

import { indexRouter } from "./routes/indexRouter.js";
import { deleteFolderRouter } from "./routes/folder/deleteFolderRouter.js";
import { updateFolderRouter } from "./routes/folder/updateFolderRoute.js";
import { readFolderRouter } from "./routes/folder/readFolderRouter.js";
import { createFileRouter } from "./routes/file/createFileRouter.js";
import { deleteFileRouter } from "./routes/file/deleteFileRouter.js";
import { updateFileRouter } from "./routes/file/updateFileRouter.js";
import { downloadFileRouter } from "./routes/file/downloadFileRouter.js";

dotenv.config();

const app = e();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(e.static(assetsPath));
app.use(urlencoded({ extended: true }));
app.use(e.json());

//-------auth stuff -----

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//--------routes-----------
app.use("/", indexRouter);

app.use("/deleteFolder", deleteFolderRouter)
app.use("/updateFolder", updateFolderRouter)
app.use("/folder", readFolderRouter)

app.use("/uploadFile", createFileRouter)
app.use("/deleteFile", deleteFileRouter)
app.use("/updateFile", updateFileRouter)
app.use("/downloadFile", downloadFileRouter)

//--login/logout--

app.get("/login", (req, res) => {
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

//---------port and error handling---------
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
