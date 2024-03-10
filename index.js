const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://sathish09117:sathish09117@mern.dqznxj5.mongodb.net/my_api"
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
  app.listen(3000, () => console.log("Serc started 3000"));
});

mongoose.connection.on("error", (error) => {
  console.log("Mongoose connect error", error);
});

app.use("/products",require("./routes/productsRoute"));
app.use("/category", require("./routes/categoriesRoute"));
