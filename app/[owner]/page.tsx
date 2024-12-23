"use client";

import axios from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const NotePage = ({ params }: { params: { owner: string } }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const typingout = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`/api/note/${params.owner}`);
      const data = await res.data;

      setAuthor(data["owner"]);
      setContent(data["content"]);
    };

    fetchNote();
  }, [params]);

  const updateNote = async (newContent: string) => {
    try {
      await axios.post(
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/api/note/${params.owner}`
          : `https://dontpandclone.vercel.app/api/note/${params.owner}`,
        {
          note: newContent,
        }
      );
    } catch (e: unknown) {
      console.error("Error:", e);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    if (typingout.current) {
      clearTimeout(typingout.current);
    }

    typingout.current = setTimeout(() => {
      updateNote(newContent);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <h1 className="my-2 text-3xl font-bold">{author}</h1>
      <textarea
        className="w-full bg-slate-200 px-2 py-1 min-h-screen outline-none"
        name="content"
        id="content"
        value={content}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default NotePage;
