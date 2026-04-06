import express from "express";
import "dotenv/config";
import cors from "cors";
import { Login ,GetUser} from "../lib/prisma";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const message = await Login(req.body.username, req.body.password); // ← await
  return res.json(message);
});

// main.ts
app.post("/api/user", async (req, res) => {
  const user = await GetUser(req.body.token)
  if (!user) return res.status(401).json({ message: "Invalid token" })
  return res.json(user)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});