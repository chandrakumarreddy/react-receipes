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

const Query = {
  getAllRecipes
};

const Mutation = {
  addRecipe
};

export default { Query, Mutation };
