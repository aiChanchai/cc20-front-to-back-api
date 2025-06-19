import { createError } from "../utils/createError.js";
import jwt, { decode } from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  //code body

  try {
    //TODO Overviews
    /*
    1.Check Headers
    2.Split Token Bearer
    3.verify JWT
    4.Create req.user
    */

    //1.check headers
    const header = req.headers.authorization;
    // console.log(header);
    if (!header) {
      createError(401, "Token is Missing");
    }

    //2. Split token
    const token = header.split(" ")[1];
    // console.log(token);

    //3. Verify token
    jwt.verify(token, process.env.SECRET, (error, decode) => {
      // console.log(error);
      // console.log(decode);
      if (error) {
        createError(401, "Token is invalid!!!");
      }

      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};
