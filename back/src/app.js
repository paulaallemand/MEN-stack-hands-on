const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv-safe").config();

const db = require("./database/mongoConfig");
db.connect();

app.use(cors());
app.use(express.json());

const usersRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/noteRoutes");

app.use("/users", usersRoutes);
app.use("/notes", notesRoutes);

module.exports = app;
