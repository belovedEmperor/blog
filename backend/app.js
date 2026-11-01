import "dotenv/config";
import express from "express";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (errors) => {
  if (errors) {
    console.log(errors);
  }

  console.log(`Listening at port ${PORT}`);
});
