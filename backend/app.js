import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnect from "./db/dbConnect.js";
import { errorMiddleware } from "./middleware/error.js";
import messageRouter from "./router/message.routes.js";
import userRouter from "./router/user.routes.js";
import timelineRouter from "./router/timeline.routes.js";
import softwareApplicationRouter from "./router/softwareApplications.routes.js";
import skillRouter from "./router/skills.routes.js";
import projectRouter from "./router/project.routes.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

dbConnect();



app.use(errorMiddleware);


export default app;
