import express from "express";
//Controllers
import {
  createUser,
  deleteUser,
  listUser,
  readUser,
  updateRoleUser,
  getMe,
} from "../controllers/user.js";
//Middleware
import { authCheck } from "../middleware/auth.middleware.js";

const router = express.Router();

//http://localhost:8000/api/users

router.get("/users", authCheck, listUser);
router.patch("/user/role/:id", authCheck, updateRoleUser);
router.delete("/user/:id", authCheck, deleteUser);

//http://localhost:8000/api/getme
router.get("/getme", authCheck, getMe);
router.get("/user", readUser);
router.post("/user", createUser);
//Export
export default router;
