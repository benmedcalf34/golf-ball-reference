import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const newUser = await prisma.user.create({ data: { name, email } });
  res.json(newUser);
});

export default router;
