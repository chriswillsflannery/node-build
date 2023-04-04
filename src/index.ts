import { PrismaClient } from '@prisma/client';
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => nanoid(16);

const seedDatabase = async () => {
  if ((await db.submission.count()) === 0) {
    await db.submission.createMany({
      data: [
        {
          id: genId(),
          submittedAt: new Date(),
          data: { name: 'Chris' },
        },
        {
          id: genId(),
          submittedAt: new Date(),
          data: { name: 'Naysha' },
        },
      ],
    });
  }
};
seedDatabase();

const app = express();
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const submissions = await db.submission.findMany();
  res.json(submissions);
});

const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started at http://localhost:${port}`);
});
