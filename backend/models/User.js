const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    // For local strategy
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
    lowercases: true,
    validate: [isEmail, "Please enter a vaild email"],
  },
  password: {
    // For local strategy
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//static method to login user
UserSchema.statics.login = async function (email, password) {
  console.log(email);
  const user = await this.findOne({ email });
  console.log(user);
  if (user) {

    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("User", UserSchema);
