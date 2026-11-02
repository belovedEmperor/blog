import "dotenv/config";
import express from "express";
import "./config/passport.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY not set");

const PORT = process.env.PORT || 3000;
app.listen(PORT, (errors) => {
  if (errors) {
    console.log(errors);
  }

  console.log(`Listening at port ${PORT}`);
});
