import express from "express";
//Controllers
import { register, login } from "../controllers/auth.js";
import {
  loginSchema,
  registerSchema,
  validate,
} from "../validations/validator.js";

const router = express.Router();

//http://localhost:8000/auth/register

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

//Export
export default router;
