import e, { urlencoded } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import passport from "passport";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";


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

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
