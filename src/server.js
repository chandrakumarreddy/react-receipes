require("dotenv").config();
import fs from "fs";
import express from "express";
import logger from "morgan";
import cors from "cors";
import jwt from "jsonwebtoken";
import { ApolloServer, gql } from "apollo-server-express";

import db from "./config/db";
import resolvers from "./resolvers";
import User from "./models/users";
import Recipe from "./models/recipe";

const typeDefs = gql(
  fs.readFileSync("./src/schema.graphql", { encoding: "utf8" })
);

//database connection
db();

const app = express();
const PORT = process.env.PORT || 4444;
app.use(
  logger("dev"),
  express.json(),
  express.urlencoded({ extended: false }),
  cors({ origin: "http://localhost:3000", credentials: true })
);
app.use((req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (
    authorizationHeader &&
    authorizationHeader !== "null" &&
    typeof authorizationHeader !== undefined
  ) {
    const token = authorizationHeader.split("Bearer ")[1];
    try {
      req.currentUser = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      req.tokenExpired = true;
    }
  }
  next();
});
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req: { currentUser = "", tokenExpired = false } }) => {
    return { Recipe, User, currentUser, tokenExpired };
  }
});
server.applyMiddleware({ app, path: "/graphql" });

app.get("/", (req, res) => res.send("hi"));

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
