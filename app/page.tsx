"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [note, setNote] = useState("");
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center">
      <h1 className="text-7xl font-bold">DONTPAD</h1>
      <p className="text-2xl text-gray-500">
        The simplest way to share text online
      </p>

      <div className="flex gap-4 mt-10 items-center">
        <div className="flex items-center">
          <h1 className="bg-slate-900 px-4 py-2 text-2xl font-bold rounded-l-xl text-white">
            /
          </h1>
          <input
            className="text-2xl outline-none border-2 border-slate-900 rounded-r-xl px-4 py-2"
            type="text"
            name="note"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="your-tag"
          />
        </div>
        <Link
          href={note ? `/${note}` : "/"}
          className="bg-slate-900 px-4 py-2 text-2xl text-white rounded-xl font-semibold"
        >
          {" "}
          Go!
        </Link>
      </div>
    </div>
  );
}
