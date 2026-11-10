import { prisma } from "../lib/prisma.js";

async function isUserOwner(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    select: { userId: true },
  });
  return post !== null && req.user.id === post.userId;
}

export async function getAll(req, res) {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: { author: { select: { username: true } } },
  });
  return res.json(posts);
}

export async function getOne(req, res) {
  const where = req.user
    ? {
        id: Number(req.params.id),
        OR: [{ isPublished: true }, { userId: req.user.id }],
      }
    : { id: Number(req.params.id), isPublished: true };
  const post = await prisma.post.findUnique({
    where,
    include: { author: { select: { username: true } } },
  });
  return res.json(post);
}

export async function create(req, res) {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      userId: req.user.id,
      isPublished: req.body.isPublished ?? false,
    },
  });
  res.json(post);
}

export async function update(req, res) {
  if (!(await isUserOwner(req, res)))
    return res.status(403).json("User is not authorized to modify this post.");
  const data = {};
  if (req.body.title !== undefined) data.title = req.body.title;
  if (req.body.body !== undefined) data.body = req.body.body;
  if (req.body.isPublished !== undefined)
    data.isPublished = req.body.isPublished;
  await prisma.post.update({
    where: { id: Number(req.params.id) },
    data,
  });
  res.json("Post updated");
}

export async function remove(req, res) {
  if (!(await isUserOwner(req, res)))
    return res.status(403).json("User is not authorized to remove this post.");
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  res.json("Post deleted");
}
