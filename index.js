import express from "express";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoute);

app.use("/api", userRoute);

app.use("/api", projectRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
