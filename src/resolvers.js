import createToken from "./utils/createToken";

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

const signupUser = async (root, { username, email, password }, { User }) => {
  await User.deleteMany();
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("username already taken");
  }
  await new User({ username, email, password }).save();
  return {
    token: createToken({ username, email }, process.env.JWT_SECRET, "1hr")
  };
};

const Query = {
  getAllRecipes
};

const Mutation = {
  addRecipe,
  signupUser
};

export default { Query, Mutation };
