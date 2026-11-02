import { prisma } from "../lib/prisma.js";

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
      // TODO: Add user id by jwt when jwt is implemented
      // userId: req.user.id,
      userId: Number(req.body.userId),
    },
  });
  res.json("comment created");
}

export async function update(req, res) {
  await prisma.comment.update({
    where: { id: Number(req.params.id), postId: Number(req.params.postId) },
    data: {
      body: req.body.body,
    },
  });
  res.json("comment updated");
}

export async function remove(req, res) {
  await prisma.comment.delete({
    where: { id: Number(req.params.id), postId: Number(req.params.postId) },
  });
  res.json("comment deleted");
}
