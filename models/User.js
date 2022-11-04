const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
    },
    phone: Number,
<<<<<<< HEAD
    password: { type: String, required: true }
=======
    password: {
      type: String,
      require: true,
    },
>>>>>>> b1304edb26d8831749d15873966c3191c9545b84
  },
  {
    timestamps: true,
  }
);

module.exports = User = model("user", userSchema);
