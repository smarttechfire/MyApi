const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);



mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
  app.listen(process.env.PORT, () => console.log("Serc started 3000"));
});

mongoose.connection.on("error", (error) => {
  console.log("Mongoose connection error", error);
});

app.use("/products",require("./routes/productsRoute"));
app.use("/category", require("./routes/categoriesRoute"));
