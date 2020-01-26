const recipe = {
  name: "a",
  category: "b",
  description: "String",
  instructions: "String!",
  createdAt: "String",
  likes: 0,
  username: "String"
};

const Query = {
  getAllRecipes: () => [recipe]
};

export default { Query };
