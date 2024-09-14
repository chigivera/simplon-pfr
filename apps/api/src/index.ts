require("dotenv").config();
import express from "express";
import cors from "cors";
import { trpcExpress } from "@ntla9aw/trpc-server";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API!" });
});
app.use("/trpc", trpcExpress);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
