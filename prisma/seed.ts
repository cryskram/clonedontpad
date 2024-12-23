import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const notes = [
    {
      owner: "Alice",
      content: "This is the first note.",
    },
    {
      owner: "Bob",
      content: "This is the second note.",
    },
    {
      owner: "Charlie",
      content: "This is the third note.",
    },
  ];

  for (const note of notes) {
    const createdNote = await prisma.note.create({
      data: {
        owner: note.owner,
        content: note.content,
      },
    });
    console.log(`Created note with id: ${createdNote.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
