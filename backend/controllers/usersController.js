import { prisma } from "../lib/prisma.js";

export async function getOne(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    omit: { password: true, email: true },
  });
  return res.json(user);
}

export async function getPosts(req, res) {
  const userId = Number(req.params.id);
  const isUser = req.user?.id === userId;
  const posts = await prisma.post.findMany({
    where: {
      userId,
      ...(isUser ? {} : { isPublished: true }),
    },
  });
  return res.json(posts);
}
