import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import agentProjectRoute from "./routes/agent-project.route.js";
import { verifyToken } from "./middleware/verfiyToken.js";
import { verifyAgent } from "./middleware/verifyAgent.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use("/api", verifyToken, userRoute);

app.use("/api", projectRoute);

app.use("/api", verifyToken, verifyAgent, agentProjectRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
