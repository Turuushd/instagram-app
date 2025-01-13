import express from "express";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import UserModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "../middlewares/auth-middleware.js";

dotenv.config();

const router = express.Router();

const checkIsPhoneNumber = (credential) => {
  if (credential.length !== 8) return false;
  if (isNaN(Number(credential))) return false;
  const firstCharacter = credential[0];
  if (!["9", "8", "7", "6"].includes(firstCharacter)) return false;
  return true;
};

const checkIsEmail = (credential) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(credential);
};

router.post("/signup", async (req, res) => {
  const { credential, password, fullname, username } = req.body;

  if (!credential || credential === "") {
    return res.status(400).send({ message: "Email or Phone required!" });
  }
  if (!password || password === "") {
    return res.status(400).send({ message: "Password required!" });
  }
  if (!fullname || fullname === "") {
    return res.status(400).send({ message: "Fullname required!" });
  }
  if (!username || username === "") {
    return res.status(400).send({ message: "Fullname required!" });
  }

  if (password.length < 7) {
    return res.status(400).send({ message: "Weak password!" });
  }

  const existingUsername = await UserModel.findOne({ username });
  if (existingUsername) {
    return res
      .status(400)
      .send({ message: "This username already registered!" });
  }

  const isPhoneNumber = checkIsPhoneNumber(credential);
  const isEmail = checkIsEmail(credential);

  if (!isPhoneNumber && !isEmail) {
    return res.status(400).send({ message: "You only phone number or email" });
  }

  if (isPhoneNumber) {
    const existingPhone = await UserModel.findOne({ phone: credential });
    if (existingPhone) {
      return res
        .status(400)
        .send({ message: "This phone number already registered!" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = {
          id: nanoid(),
          phone: credential,
          fullname: fullname,
          username: username,
          password: hash,
        };
        await UserModel.create(newUser);
        return res.status(201).send({ message: "Successfully registered!" });
      });
    }
  }

  if (isEmail) {
    const existingEmail = await UserModel.findOne({ email: credential });
    if (existingEmail) {
      return res
        .status(400)
        .send({ message: "This email already registered!" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = {
          id: nanoid(),
          email: credential,
          fullname: fullname,
          username: username,
          password: hash,
        };
        await UserModel.create(newUser);
        return res.status(201).send({ message: "Successfully registered!" });
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { credential, password } = req.body;

  let existingUser = null;
  if (checkIsPhoneNumber(credential)) {
    existingUser = await UserModel.findOne({ phone: credential });
  } else if (checkIsEmail(credential)) {
    existingUser = await UserModel.findOne({ email: credential });
  } else {
    existingUser = await UserModel.findOne({ username: credential });
  }

  if (!existingUser) {
    return res
      .status(400)
      .send({ message: "Credential or password not correct!" });
  }

  bcrypt.compare(password, existingUser.password, function (err, result) {
    if (!result) {
      return res
        .status(400)
        .send({ message: "Email or password not correct!" });
    } else {
      const accessToken = jwt.sign(
        {
          user: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "10h",
        }
      );
      return res
        .status(200)
        .send({ message: "Successfully logged in!", accessToken });
    }
  });
});

router.get("/me", authMiddleware, (req, res) => {
  return res.send(req.user);
});

export default router;
