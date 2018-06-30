//set up express
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// set up mongoose
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// listen on port
app.get("/", (req, res) => res.send("hello"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
