import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  favourites: [{ type: Schema.Types.ObjectId, ref: "recipe" }]
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      console.log(hash);
      this.password = hash;
      return next();
    });
  });
});

export default mongoose.model("user", userSchema);
