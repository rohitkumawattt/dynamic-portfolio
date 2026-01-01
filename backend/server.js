import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDb from "./config/db.js";
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import skillRoute from "./routes/skills.route.js";
import userProfileRoute from "./routes/userProfile.route.js";
import messageRouter from "./routes/messages.routes.js";
dotenv.config({ path: "./.env" });
const app = express()
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://dynamic-portfolio-admin.onrender.com", "https://dynamic-portfolio-frontend-m2eb.onrender.com", "http://localhost:5174"], // frontend port
    credentials: true, // this will allow cookies to be sent
  })
);

app.use(express.json())
const port = process.env.PORT || 3000 // Default port to 3000 if not specified
connectDb();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// user routes 
app.use("/api/users", userRoute);
// project routes
app.use("/api/projects", projectRoute);
// skill routes
app.use("/api/skills", skillRoute);
// userProfile routes
app.use("/api/user-profile", userProfileRoute);
// message routes
app.use("/api/messages", messageRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})