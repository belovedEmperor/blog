import { prisma } from "../lib/prisma.js";

export async function getOne(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    include: { posts: true },
    omit: { password: true, email: true },
  });
  return res.json(user);
}
