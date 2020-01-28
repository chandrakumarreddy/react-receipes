import createToken from "./utils/createToken";
import bcrypt from "bcryptjs";

const getAllRecipes = async (root, args, { Recipe }) => {
  return await Recipe.find({});
};

const addRecipe = async (root, args, { Recipe }) => {
  const { name, category, description, instructions, username } = args;
  const newRecipe = await new Recipe({
    name,
    category,
    description,
    instructions,
    username
  }).save();
  return newRecipe;
};

const signUpUser = async (root, { username, email, password }, { User }) => {
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("username already taken");
  }
  await new User({ username, email, password }).save();
  return {
    token: createToken({ username, email }, process.env.JWT_SECRET, "1hr")
  };
};

const signInUser = async (root, { email, password }, { User }) => {
  const hasUser = await User.findOne({ email });
  if (!hasUser) throw new Error("invalid credentails");
  const isValid = bcrypt.compare(hasUser.password, password);
  if (!isValid) throw new Error("invalid credentails");
  return {
    token: createToken(
      { username: hasUser.username, email },
      process.env.JWT_SECRET,
      "1min"
    )
  };
};

const getCurrentUser = async (root, args, { User, currentUser }) => {
  if (!currentUser) return null;
  return await User.findOne({ email: currentUser.email });
};

const Query = {
  getAllRecipes,
  getCurrentUser
};

const Mutation = {
  addRecipe,
  signUpUser,
  signInUser
};

export default { Query, Mutation };
