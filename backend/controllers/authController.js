import "dotenv/config";
import { prisma } from "../lib/prisma.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({
    data: {
      email: req.body.email.toLowerCase(),
      username: req.body.username,
      password: hashedPassword,
    },
  });
  res.json("User created");
}

export async function login(req, res) {
  passport.authenticate(
    "local",
    {
      session: false,
    },
    (err, user, info) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: "Login failed" });
      jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) return res.status(500).json({ error: err.message });
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
              maxAge: 7 * 24 * 60 * 60 * 1000, // ms
            })
            .json("Logged in");
        },
      );
    },
  )(req, res);
}

export async function logout(req, res) {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json("Logged out");
}

export async function get(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    omit: { password: true },
  });
  res.json(user);
}

export async function update(req, res) {
  const data = {};
  if (req.body.email !== undefined) data.email = req.body.email.toLowerCase();
  if (req.body.username !== undefined) data.username = req.body.username;
  if (req.body.password !== undefined)
    data.password = await bcrypt.hash(req.body.password, 10);
  await prisma.user.update({
    where: { id: req.user.id },
    data,
  });
  res.json("User updated");
}

export async function remove(req, res) {
  await prisma.user.delete({ where: { id: Number(req.user.id) } });
  res.json("User deleted");
}
