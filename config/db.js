import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/react-receipes", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(`connected to db`);
  } catch (error) {
    console.log(error.message);
  }
};
