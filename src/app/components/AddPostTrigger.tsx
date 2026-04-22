"use client";

import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import Image from "next/image";

const AddPostTrigger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition hover:shadow-md"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <Image src="/addevent.png" width={24} height={24} alt="" />
        <span className="font-medium" style={{ color: "var(--text-tertiary)" }}>
          Share your impact... What did you clean today?
        </span>
        <button className="ml-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition">
          Post
        </button>
      </div>
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AddPostTrigger;
