import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser, { json, urlencoded } from "body-parser";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app
  .disable("x-powered-by")
  .use(morgan("dev"))
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
