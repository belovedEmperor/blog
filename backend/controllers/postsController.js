import { prisma } from "../lib/prisma.js";

export async function getAll(req, res) {
  const posts = await prisma.post.findMany();
  return res.json(posts);
}

export async function getOne(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
  });
  return res.json(post);
}

export async function create(req, res) {
  await prisma.post.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      // TODO: Add user id by jwt when jwt is implemented
      // userId: req.user.id,
      userId: Number(req.body.userId),
    },
  });
  res.json("Post created");
}

export async function update(req, res) {
  await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: {
      title: req.body.title,
      body: req.body.body,
    },
  });
  res.json("Post updated");
}

export async function remove(req, res) {
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  res.json("Post deleted");
}
