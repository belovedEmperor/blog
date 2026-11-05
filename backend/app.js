import "dotenv/config";
import express from "express";
import cors from "cors";
import "./config/passport.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");
if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY not set");
if (!process.env.CORS_DOMAINS) throw new Error("CORS_DOMAINS not set");

const domains = process.env.CORS_DOMAINS.split(",").map((domain) =>
  domain.trim(),
);
app.use(cors({ origin: domains }));

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (errors) => {
  if (errors) {
    console.log(errors);
  }

  console.log(`Listening at port ${PORT}`);
});
