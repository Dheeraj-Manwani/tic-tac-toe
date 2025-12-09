import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import passport from "passport";
import authRouter from "./routes/auth";
import { initPassport } from "./passport";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
const allowedHosts = process.env.ALLOWED_HOSTS?.split(",") || [];

app.disable("x-powered-by");

app.use(
  cors({
    origin: allowedHosts,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize passport
app.use(passport.initialize());
initPassport();

// auth routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Backend is running fine");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
