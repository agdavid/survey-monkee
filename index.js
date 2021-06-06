const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./services/passport");
require("./models/User");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.get("/");

app.listen(PORT);
