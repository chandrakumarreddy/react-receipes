import express from "express";

const app = express();

const PORT = process.env.PORT || 4444;

app.get("/", (req, res) => res.send("hi"));

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
