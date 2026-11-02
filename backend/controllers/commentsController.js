import { prisma } from "../lib/prisma.js";

async function isUserOwner(req, res) {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(req.params.id) },
    select: { userId: true },
  });
  return comment !== null && req.user.id === comment.userId;
}

export async function getAll(req, res) {
  const comments = await prisma.comment.findMany({
    where: { postId: Number(req.params.postId) },
  });
  return res.json(comments);
}

export async function getOne(req, res) {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(req.params.id), postId: Number(req.params.postId) },
  });
  return res.json(comment);
}

export async function create(req, res) {
  await prisma.comment.create({
    data: {
      body: req.body.body,
      postId: Number(req.params.postId),
      userId: req.user.id,
    },
  });
  res.json("comment created");
}

export async function update(req, res) {
  if (!(await isUserOwner(req, res)))
    return res
      .status(403)
      .json("User is not authorized to modify this comment.");
  await prisma.comment.update({
    where: { id: Number(req.params.id), postId: Number(req.params.postId) },
    data: {
      body: req.body.body,
    },
  });
  res.json("comment updated");
}

export async function remove(req, res) {
  if (!(await isUserOwner(req, res)))
    return res
      .status(403)
      .json("User is not authorized to remove this comment.");
  await prisma.comment.delete({
    where: { id: Number(req.params.id), postId: Number(req.params.postId) },
  });
  res.json("comment deleted");
}
