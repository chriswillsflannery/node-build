import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

export const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });

const genId = () => nanoid(16);
export const seedDatabase = async () => {
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
