import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const fullToken = req.headers.authorization;
    if (!fullToken || !fullToken.startsWith("Bearer ")) {
      throw new Error("Bad authorization header!");
    }
    const actualToken = fullToken.split(" ")[1];
    const { user } = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "User is not authenticated!" });
  }
};
