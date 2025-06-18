import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    //code body

    //TODO OVERIVEW REGISTER
    /* 
  0.Validate with yup
  1.Check body
  2.Check Email
  3.Ecrypt Password -> bcryptjs
  4.Save to DB -> Prisma
  5.Response  
  */

    //Step 1 Check body
    console.log(req.body);
    const { email, name, password } = req.body;

    //step 2 Check email in DB
    const user = await prisma.user.findFirst({
      where: {
        email: email, //หาอะไรได้อะไร
      },
    });
    console.log(user);
    if (user) {
      createError(400, "Email already exist");
    }

    //step 3 Encrypt Password
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    //Save to DB
    const result = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashPassword,
      },
    });

    res.json({ message: `Register ${result.name} Success` });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    //code body
    //Todo Overview Login
    /*
  1.Validate body
  2.Check body
  3.Check Email in DB
  4.Check password
  5.Create token ส่งไปให้ frontend
  6.Response
  */

    //step 2 check body

    const { email, password } = req.body;

    //step 3 Check Email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log(user);
    if (!user) {
      createError(400, "Email or Password invalid");
    }

    // Step 4 Check password
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) createError(400, "Email or Password is invalid");

    //Step 5 Generate Token
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    res.json({
      message: `Welcome back ${user.name}`,
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
