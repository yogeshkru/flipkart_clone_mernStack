const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const userSchmea = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default:'user'
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchmea.virtual("password").set(function (password) {
  this.hash_password = bcryptjs.hashSync(password, 14);
});
userSchmea.virtual("fullName").get(function () {
   return `${this.firstName} ${this.lastName}`
  });

userSchmea.methods = {
  authenticate: function (password) {
    return bcryptjs.compareSync(password,this.hash_password)
  },
};

module.exports = mongoose.model("Users", userSchmea);
