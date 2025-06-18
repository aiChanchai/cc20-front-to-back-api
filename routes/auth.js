import express from "express";
//Controllers
import { login, register } from "../controllers/auth.js";

const router = express.Router();

//http://localhost:8000/auth/register

router.post("/register", register);
router.post("/login", login);

//Export
export default router;
