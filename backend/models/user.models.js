import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, "Name Required"],
  },
  email: {
    type: String,
    require: [true, "Email Required"],
  },
  password: {
    type: String,
    require: [true, "Password is Required"],
    minLength: [8, "Password must contain at least 8 characters"],
    select: false,
  },
  phone: {
    type: String,
    require: [true, "Phone Number Required"],
  },
  about: {
    type: String,
    require: [true, "About me field is Required"],
  },
  avatar: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },

  githubUrl: {
    type: String,
  },
  instagramUrl: {
    type: String,
  },
  facebookUrl: {
    type: String,
    type: String,
  },
  linkedInUrl: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken
};

export const User = mongoose.model("User", userSchema);
