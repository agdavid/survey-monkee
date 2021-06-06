const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

// create if not exists new collection with schema
mongoose.model("users", userSchema);
