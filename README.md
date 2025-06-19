# Server

## Step 1 Install Package

```bash
npm init -y
```

```bash
npm install express
```

```bash
git init
git add .
git commit -m "message"
git push
```

### Create file server.js

```js
// Import Package ..........
const express = require("express");
const app = express();

// Middlewares

// Routing กำหนดเส้นทางต่างๆ
// CRUD = Create, Read, Update, Delete
// METHOD = GET, POST, PUT, PATCH, DELETE in lowercase.
// app.METHOD(PATH, HANDLER)
app.get("/", (req, res) => {
  res.send("Helo CC20");
});

const PORT = 8000;
// Start Server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
```

### Install package....

```bash
npm install nodemon cors morgan
```

## Step 2 Routing

```js
const express = require("express");
const router = express.Router();

// ENDPOINT http://localhost:8000/api/users
// ACCESS PUBLIC
router.get("/users", (req, res) => {
  res.json({ message: "This is GET" });
});

router.post("/users", (req, res) => {
  // code body
  res.json({ message: "This is POST" });
});

router.put("/user/:id", (req, res) => {
  // Destucturing
  const { id } = req.params;
  console.log(id);
  res.json({ message: `This is PUT ${id}` });
});
router.delete("/user/:id", (req, res) => {
  // Destucturing
  const { id } = req.params;
  console.log(id);
  res.json({ message: `This is DELETE ${id}` });
});

module.exports = router;
```

## Step 3 Controllers

```js
exports.listUsers = (req, res) => {
  res.json({ message: "This is List Users" });
};

exports.createUser = (req, res) => {
  res.json({ message: "This is Create User" });
};
```

## Step 4 Authenticate

### Routing routes/auth.js

#### 1

```js
const express = require("express");
const router = express.Router();

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC

module.exports = router;
```

#### 2

```js
const express = require("express");
const router = express.Router();

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC
router.post("/register", (req, res) => {
  res.json({ message: "This is Register" });
});

module.exports = router;
```

and then add to server.js

```js
// Import Package ..........
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

const app = express();

// Middlewares
app.use(cors()); // Allow cross domains
app.use(morgan("dev")); // Show logs

// Router
app.use("/api", userRouter);
app.use("/auth", authRouter);

// Routing กำหนดเส้นทางต่างๆ
// CRUD = Create, Read, Update, Delete
// METHOD = GET, POST, PUT, PATCH, DELETE in lowercase.
// app.METHOD(PATH, HANDLER)
app.get("/tam", (req, res) => {
  res.send("Helo CC20");
});

const PORT = 8000;
// Start Server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
```

### 3 Separate code to Controllers

```js
const express = require("express");
const router = express.Router();
// Controllers
const { register, login } = require("../controllers/auth");

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC
router.post("/register", register);
router.post("/login", login);

module.exports = router;
```

```js
exports.register = (req, res) => {
  // Code body
  res.json({ message: "This is Register" });
};

exports.login = (req, res) => {
  // Code body
  res.json({ message: "This is Login" });
};
```

## Step 5 Middlewares

```js
const express = require("express");
const router = express.Router();
// Controllers
const { register, login } = require("../controllers/auth");

// Middlewares
const authCheck = (req, res, next) => {
  // Code body
  console.log("Hello Middleware");
  next();
};

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC
router.post("/register", authCheck, register);
router.post("/login", login);

module.exports = router;
```

and then Separate file to middlewares/auth.js

```js
exports.authCheck = (req, res, next) => {
  // Code body
  if (false) {
    next();
  } else {
    res.json({ message: "Unauthorize!!!" });
  }
};
```

and routes/auth.js

```js
const express = require("express");
const router = express.Router();
// Controllers
const { register, login } = require("../controllers/auth");
const { authCheck } = require("../middlewares/auth");

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC
router.post("/register", authCheck, register);
router.post("/login", login);

module.exports = router;
```

## Step 6 Error Handling

Test

```js
exports.register = (req, res, next) => {
  // Code body
  try {
    asd;

    res.json({ message: "This is Register" });
  } catch (error) {
    res.status(500).json({ message: "Something Wrong!!!" });
  }
};
```

server.js

```js
// Error Handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something wrong!!!" });
});
```

and test write consolelog('test') error in controllers

```js
exports.register = (req, res, next) => {
  // Code body
  skdfj;
  res.json({ message: "This is Register" });
};

exports.login = (req, res) => {
  // Code body
  res.json({ message: "This is Login" });
};
```

and then

```js
exports.register = (req, res, next) => {
  // Code body
  try {
    skdfj;
    res.json({ message: "This is Register" });
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res) => {
  // Code body
  res.json({ message: "This is Login" });
};
```

### Throw error

```js
exports.register = (req, res, next) => {
  // Code body
  try {
    // 1. Check Email
    if (true) {
      throw new Error("Email already exits!!!");
    }

    res.json({ message: "This is Register" });
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res) => {
  // Code body
  res.json({ message: "This is Login" });
};
```

and server.js

```js
// Error Handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message || "Something wrong!!!" });
});
```

test more

```js
exports.register = (req, res, next) => {
  // Code body
  try {
    // 1. Check Email
    if (true) {
      throw new Error("Email already exits!!!");
    }

    if (true) {
      throw new Error("Passwong is wrong!!");
    }

    res.json({ message: "This is Register" });
  } catch (error) {
    next();
  }
};
```

### Separate file

/utils/renderError.js

```js
exports.renderError = (code, msg) => {
  const error = new Error(msg);
  error.code = code;
  throw error;
};
```

controllers/auth.js

```js
const { renderError } = require("../utils/renderError");

exports.register = (req, res, next) => {
  // Code body
  try {
    // 1. Check Email
    if ("") {
      renderError(400, "Email already exits!!");
    }

    if (true) {
      renderError(400, "Passwong is wrong!!");
    }

    res.json({ message: "This is Register" });
  } catch (error) {
    // res.status(500).json({ message: "Something Wrong!!!" });
    next(error);
  }
};
```

/middlewares/errors.js

```js
exports.handleErrors = (err, req, res, next) => {
  console.log(err);
  res
    .status(err.code || 500)
    .json({ message: err.message || "Something wrong!!!" });
};
```

## Step 7 Register

### 1. Install Prisma

```bash
npm install prisma --save-dev
npx prisma init
```

and then edit
.env

```
DATABASE_URL="mysql://root:1234@localhost:3306/cc20"
```

and then Create model

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int    @id @default(autoincrement())
  email    String
  name     String
  password String
}

```

and then

```bash
npx prisma migrate dev --name init
```

### 2. Connect DB

```bash
npm install @prisma/client
npx prisma generate
```

/config/db.js

```js
const { PrismaClient } = require("../generated/prisma");

const db = new PrismaClient();

module.exports = db;
```

/controllers/auth.js

```js
const { renderError } = require("../utils/renderError");
const db = require("../config/db");

exports.register = async (req, res, next) => {
  // Code body
  try {
    // TODO Overview
    // 1. Check body
    // 2. Check Email in DB
    // 3. Encrypt Password-> bcryptjs
    // 4. Save to DB -> Prisma
    // 5. Response

    // 1. Check body
    console.log(req.body);
    // 2. Check Email in DB
    const checkEmail = await db.user.findFirst();
    console.log(checkEmail);
    if (checkEmail) {
      renderError(400, "Email already exits!!");
    }
    // 3. Encrypt Password-> bcryptjs
    // 4. Save to DB -> Prisma
    // 5. Response

    // if ("") {
    //   renderError(400, "Email already exits!!");
    // }

    // if (true) {
    //   renderError(400, "Passwong is wrong!!");
    // }

    res.json({ message: "This is Register" });
  } catch (error) {
    // res.status(500).json({ message: "Something Wrong!!!" });
    next(error);
  }
};
```

### Step 1 Check body

```js
// * 1. Check body
// console.log(req.body.email);
const { email, name, password } = req.body;
console.log(email, name, password);
```

don't foget update this one.
server.js

```js
app.use(express.json());
```

### Step 2 Check Email

```js
// * 2. Check Email in DB
const checkEmail = await db.user.findFirst({
  where: {
    email: email,
  },
});
console.log(checkEmail);
if (checkEmail) {
  renderError(400, "Email already exits!!");
}
```

### Step 3 Encrypt Password

```bash
npm install bcryptjs
```

```js
const bcrypt = require("bcryptjs");

// * 3. Encrypt Password-> bcryptjs
console.log(password);
const hashPassword = bcrypt.hashSync(password, 10);
console.log(hashPassword);
```

## Step 8 Validate with Yup

test empty string to register
https://www.npmjs.com/package/yup

```bash
npm i yup
```

/routes/auth.js

```js
const express = require("express");
const router = express.Router();
// Controllers
const { register, login } = require("../controllers/auth");
const { authCheck } = require("../middlewares/auth");

// Validate
const { object, string } = require("yup");
const validate = (schema) => async (req, res, next) => {
  try {
    // code body
    console.log("This is validate", req.body);
    next();
  } catch (error) {
    // error
  }
};

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC
router.post("/register", validate(), authCheck, register);
router.post("/login", login);

module.exports = router;
```

and update Schema

```js
// Validate
const { object, string } = require("yup");

const registerSchema = object({
  email: string().email("รูปแบบ Email ไม่ถูกต้อง").required("กรุณากรอก Email"),
  name: string().min(3, "Name อักขระต้องมากกว่า 3"),
  password: string().min(6),
});
const validate = (schema) => async (req, res, next) => {
  try {
    // code body
    // console.log("This is validate", req.body);
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    // error
    console.log("err", err.errors);
    next(err);
    // return res.status(500).json({ type: err.name, message: err.message });
  }
};

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC
router.post("/register", validate(registerSchema), authCheck, register);
```

### Merge Error

```js
const express = require("express");
const router = express.Router();
// Controllers
const { register, login } = require("../controllers/auth");
const { authCheck } = require("../middlewares/auth");

// Validate
const { object, string } = require("yup");

const registerSchema = object({
  email: string().email("รูปแบบ Email ไม่ถูกต้อง").required("กรุณากรอก Email"),
  name: string().min(3, "Name อักขระต้องมากกว่า 3"),
  password: string().min(6, "Password อักขระต้องมากกว่า 6"),
});
const validate = (schema) => async (req, res, next) => {
  try {
    // code body
    // console.log("This is validate", req.body);
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    // error
    // console.log("err", err);
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(",");
    const mergeError = new Error(errTxt);
    next(mergeError);
  }
};

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC
router.post("/register", validate(registerSchema), authCheck, register);
router.post("/login", login);

module.exports = router;
```

### Separate file

/middlewares/validators.js

```js
// Validate
import { object, string } from "yup";

export const registerSchema = object({
  email: string().email("รูปแบบ Email ไม่ถูกต้อง").required("กรุณากรอก Email"),
  name: string().min(3, "Name อักขระต้องมากกว่า 3"),
  password: string().min(6, "Password อักขระต้องมากกว่า 6"),
  confirmPassword: string().oneOf([ref("password")], "Password not match!!"),
});

export const validate = (schema) => async (req, res, next) => {
  try {
    // code body
    // console.log("This is validate", req.body);
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    // error
    // console.log("err", err);
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(",");
    const mergeError = new Error(errTxt);
    next(mergeError);
  }
};
```

and routes

```js
const express = require("express");
const router = express.Router();
// Controllers
const { register, login } = require("../controllers/auth");
const { authCheck } = require("../middlewares/auth");

const { registerSchema, validate } = require("../middlewares/validators");

// ENDPOINT http://localhost:8000/auth/register
// METHOD POST
// ACCESS PUBLIC
router.post("/register", validate(registerSchema), authCheck, register);
router.post("/login", login);

module.exports = router;
```

### มาถึงตรงนี้ต้อง Register ได้แล้วนะครับ ยะฮู้ๆๆๆๆๆๆ

## Step 9 Login

controllers/auth.js

### Step 9.1 Validate

```js
exports.login = (req, res, next) => {
  // Code body
  try {
    // TODO Overview Login
    /*
        0. Validate with yup
        1. Check body and Destructuring
        2. Check Email in DB
        3. Compare Password
        4. Create Token
        5. Send to Front-end
    */

    // * 1 Check body
    // console.log(req.body);
    const { email, password, confirmPassword } = req.body;
    console.log(email, password, confirmPassword);

    res.json({ message: "This is Login" });
  } catch (error) {
    next(error);
  }
};
```

validators.js

```js
exports.loginSchema = object({
  email: string().email("รูปแบบ Email ไม่ถูกต้อง").required("กรุณากรอก Email"),
  password: string().min(6, "Password อักขระต้องมากกว่า 6"),
  confirmPassword: string().oneOf([ref("password")], "Password not match!!"),
});
```

routes/auth.js

```js
router.post("/login", validate(loginSchema), login);
```

### Step 9.2 Check Email and Password

```js
// * 2 Check Email
const user = await db.user.findFirst({
  where: {
    email: email,
  },
});
if (!user) {
  renderError(400, "Email or Password is Invalid!!!");
}

// * 3 Compare Password
const checkPassword = await bcrypt.compare(password, user.password);
console.log(checkPassword);
if (!checkPassword) {
  renderError(400, "Email or Password is Invalid!!!");
}
```

### Step 9.3 Create token

```bash
npm i jsonwebtoken
```

```js
const jwt = require("jsonwebtoken");

// * 4. Create Token (jsonwebtoken)
// console.log(user);
const payload = {
  id: user.id,
  name: user.name,
  role: user.role,
};
console.log(payload);
const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

res.json({
  message: `Welcome back ${user.name}`,
  payload: payload,
  token: token,
});
```

## Step 10 ENDPOINT Users

/routes/user.js

```js
const express = require("express");
const router = express.Router();
// Controllers
const { listUsers, readUser, delUsers } = require("../controllers/user");

// ENDPOINT http://localhost:8000/api/users
// ACCESS PUBLIC
router.get("/users", listUsers); // List all users
router.get("/user/:id", readUser); // Get user by id
router.delete("/user/:id", delUsers); // Del user by id
// router.post("/users");
// router.put("/user/:id");

module.exports = router;
```

/controllers/user.js

```js
exports.listUsers = async (req, res, next) => {
  try {
    res.json({ message: "This is List Users" });
  } catch (error) {
    next(error);
  }
};
exports.readUser = async (req, res, next) => {
  try {
    res.json({ message: "This is Read Users by ID" });
  } catch (error) {
    next(error);
  }
};
exports.delUsers = async (req, res, next) => {
  try {
    res.json({ message: "This is Delete User by ID" });
  } catch (error) {
    next(error);
  }
};
```

## Step 11 Authenticate (Middlewares)

/middlewares/auth.js

```js
const jwt = require("jsonwebtoken");
const { renderError } = require("../utils/renderError");
exports.authCheck = (req, res, next) => {
  try {
    // TODO Authenticate
    /*
      1. Check Header
      2. Split Token Bearer
      3. Verify Token with jwt
      4. Create req.user
    */
    // 1. Check Header
    // console.log(req.headers.authorization);
    const header = req.headers.authorization;
    // if (!header || !header.startsWith("Bearer ")) {
    if (!header) {
      renderError(401, "Missing Token");
    }
    // 2. Split Token Bearer
    const token = header.split(" ")[1];
    console.log(token);

    // 3. Verify Token
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        renderError(401, "Token is Invalid!!");
      }
      // console.log(decode);
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};
```

## Step 12 User Controller

### 12.1 List all users

```js
exports.listUsers = async (req, res, next) => {
  try {
    const users = await db.user.findMany();
    res.json({ message: "This is List Users", result: users });
  } catch (error) {
    next(error);
  }
};
```

without password

```js
const users = await db.user.findMany({
  omit: {
    password: true,
  },
});
```

### 12.2 Read user

```js
exports.readUser = async (req, res, next) => {
  try {
    // 1. Read params
    // console.log(req.params);
    const { id } = req.params;
    console.log(id);
    // 2. Query
    const user = await db.user.findFirst({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
      },
    });
    // console.log(user);

    res.json({ message: "This is Read Users by ID", result: user });
  } catch (error) {
    next(error);
  }
};
```

### 12.3 Delete user

```js
exports.deleteUsers = async (req, res, next) => {
  try {
    // Step 1 Read params
    const { id } = req.params;
    // Step 2 Delete
    const user = await db.user.delete({
      where: {
        id: Number(id),
      },
    });
    // Step 3 Send to front
    res.json({ message: `Deleted ${user.name} Success!!` });
  } catch (error) {
    next(error);
  }
};
```

## Step 13 Updated Role User

```js
// ENDPOINT http://localhost:8000/api/user/role/1
router.patch("/user/role/:id", authCheck, updateRole);
```

```js
exports.updateRole = async (req, res, next) => {
  try {
    // Step 1 Read params
    const { id } = req.params;
    // Step 2 Update
    const { role } = req.body;
    console.log(id, role);
    const user = await db.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
    });
    // // Step 3 Send to front
    res.json({ message: `Updated Role ${user.name} Success!!` });
  } catch (error) {
    next(error);
  }
};
```

## Step 14 Current User

```js
router.get("/current-user", authCheck, currentUser);
```

```js
exports.currentUser = async (req, res, next) => {
  try {
    // Step 1 Read params
    console.log(req.user);
    const { id } = req.user;
    // Step 2 Delete
    const user = await db.user.findFirst({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
      },
    });
    // Step 3 Send to front
    res.json({ result: user });
  } catch (error) {
    next(error);
  }
};
```

## Step 14 Notfound

/utils/notfound.js

```js
exports.notfound = (req, res) => {
  res.status(404).json({ message: "Sorry can't find that!" });
};
```

server.js

```js
const { notfound } = require("./utils/notfound");
app.use(notfound);
```
