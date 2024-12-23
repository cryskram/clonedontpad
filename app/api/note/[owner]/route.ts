import prisma from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { owner: string } }
) {
  const owner = params.owner.toLowerCase();
  try {
    const checkNote = await prisma.note.findUnique({
      where: {
        owner: owner,
      },
    });

    if (!checkNote) {
      const res = await axios.post(
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/api/note/${owner}`
          : `https://dontpandclone.vercel.app/api/note/${owner}`,
        {
          note: "",
        }
      );
      const data = await res.data;

      return NextResponse.json(data);
    } else {
      return NextResponse.json(checkNote);
    }
  } catch (e: unknown) {
    console.error("Error: ", e);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { owner: string } }
) {
  const { note } = await request.json();
  const owner = params.owner.toLowerCase();

  try {
    const createNote = await prisma.note.upsert({
      where: {
        owner: owner,
      },
      update: {
        content: note ? note : "",
      },
      create: {
        owner: owner,
        content: note ? note : "",
      },
    });

    return NextResponse.json(createNote);
  } catch (e: unknown) {
    console.error("Error: ", e);
    return NextResponse.json({ message: "Error" });
  }
}
