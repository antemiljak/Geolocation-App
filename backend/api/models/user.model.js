const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  email: { type: String },
  password: { type: String },
  createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("User", userSchema);
