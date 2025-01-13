import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    phone: { type: String },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"] },
    bio: { type: String },
    profileUrl: { type: String },
    postCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

userSchema.virtual("follows", {
  ref: "follows",
  localField: "_id",
  foreignField: "user",
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
