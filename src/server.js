require("dotenv").config();
import express from "express";

import db from "../config/db";
db();
const app = express();
const PORT = process.env.PORT || 4444;

app.get("/", (req, res) => res.send("hi"));

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
