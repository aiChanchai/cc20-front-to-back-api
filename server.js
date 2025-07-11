import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import error from "./utils/error.js";
import notFound from "./utils/notFound.js";

const app = express();

//Basic middlewares
app.use(cors()); // Allow cross domains
app.use(morgan("dev")); // show logs
app.use(express.json()); // for read body อ่านข้อมูลที่เข้ามา

// routing GET POST PUT PATCH DELETE
// http://localhost:8000/

app.use("/api", userRouter);
app.use("/auth", authRouter);

//Error Handling
app.use(error);

//404

app.use(notFound);

const PORT = 8000;

//Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
