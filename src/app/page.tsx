"use client";

import { ContentTodo } from "./components/content-todo";

export default function Home() {
  return (
    <div className="bg-[#F0EDF2] antialiased flex w-screen h-screen items-center justify-center">
      <ContentTodo />
    </div>
  );
}
