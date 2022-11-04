const express = require("express");
// const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
// app.use(cors());
const connectDB = require("./config/connectDB");
connectDB();
const routes = require("./routes/User");

app.use("/api/user", routes);

const port = 5500;

app.listen(port, (err) => {
  err
    ? console.log("erroor", err)
    : console.log(`this server is running on ${port}`);
});
