"use client";

import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import Image from "next/image";

const AddPostTrigger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition"
        onClick={() => setIsModalOpen(true)}
      >
        <Image src="/addevent.png" width={24} height={24} alt="" />
        <span className="text-gray-400 font-medium">Share your impact... What did you clean today?</span>
        <button className="ml-auto bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold">
          Post
        </button>
      </div>
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AddPostTrigger;
