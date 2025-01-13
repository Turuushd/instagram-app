import express from "express";
import UserModel from "../models/user-model.js";
import FollowModel from "../models/follow-model.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await UserModel.findOne({ username }).populate({
    path: "follows",
    populate: { path: "user", select: "username" },
  });
  return res.send(user);
});

router.post("/:username/follows", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const user = req.user;
    const newFollow = await FollowModel.create({
      username: username,
      user: user._id,
    });
    return res.send(newFollow);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server can't handle that request" });
  }
});

export default router;
