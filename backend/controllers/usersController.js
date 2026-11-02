import { prisma } from "../lib/prisma.js";

export async function getAll(req, res) {
  const users = await prisma.user.findMany();
  return res.json(users);
}

export async function getOne(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    omit: { password: true, email: true },
  });
  return res.json(user);
}

export async function getPosts(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    include: { posts: true },
    omit: { password: true, email: true },
  });
  return res.json(user);
}

export async function create(req, res) {
  await prisma.user.create({
    data: {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    },
  });
  res.json("User created");
}

export async function update(req, res) {
  await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    },
  });
  res.json("User updated");
}

export async function remove(req, res) {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.json("User deleted");
}
