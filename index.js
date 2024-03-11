const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);



mongoose.connection.on("connected", () => {
  
  app.listen(process.env.PORT);
});

mongoose.connection.on("error", (error) => {
  console.log("Mongoose connection error", error);
});

app.use("/products",require("./routes/productsRoute"));
app.use("/category", require("./routes/categoriesRoute"));
