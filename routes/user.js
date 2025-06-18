import express from "express";
//Controllers
import {
  createUser,
  deleteUser,
  listUser,
  readUser,
  updateRoleUser,
} from "../controllers/user.js";
//Middleware
import { authCheck } from "../middleware/auth.middleware.js";

const router = express.Router();

//http://localhost:8000/api/users

router.get("/users", authCheck, listUser);
router.get("/user", readUser);
router.post("/user", createUser);
router.patch("/user/role/:id", updateRoleUser);
router.delete("/user/role/:id", deleteUser);

//Export
export default router;
