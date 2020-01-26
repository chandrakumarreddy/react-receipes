require("dotenv").config();
import fs from "fs";
import express from "express";
import logger from "morgan";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";

import db from "./config/db";
import resolvers from "./resolvers";
import User from "./models/users";
import Recipe from "./models/recipe";

//database connection
db();

const typeDefs = gql(
  fs.readFileSync("./src/schema.graphql", { encoding: "utf8" })
);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Recipe, User }
});

const app = express();
app.use(
  logger("dev"),
  express.json(),
  express.urlencoded({ extended: false }),
  cors({ origin: "http://localhost:3000", credentials: true })
);

const PORT = process.env.PORT || 4444;

server.applyMiddleware({ app, path: "/graphql" });

app.get("/", (req, res) => res.send("hi"));

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
