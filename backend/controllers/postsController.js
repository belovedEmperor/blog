import { prisma } from "../lib/prisma.js";

async function isUserOwner(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    select: { userId: true },
  });
  return post !== null && req.user.id === post.userId;
}

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
      userId: req.user.id,
    },
  });
  res.json("Post created");
}

export async function update(req, res) {
  if (!(await isUserOwner(req, res)))
    return res.status(403).json("User is not authorized to modify this post.");
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
  if (!(await isUserOwner(req, res)))
    return res.status(403).json("User is not authorized to remove this post.");
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  res.json("Post deleted");
}
