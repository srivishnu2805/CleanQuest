"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { createPost } from "@/lib/actions";

const CreatePostModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!desc) return;
    setIsPosting(true);
    try {
      // Server actions in Next.js 15 with Zod require a plain object or FormData
      const result = await createPost({ desc, img });
      if (result.success) {
        setDesc("");
        setImg(null);
        onClose();
      } else {
        alert("Failed to create post: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <button onClick={onClose} className="text-gray-500 hover:text-black">Cancel</button>
          <h2 className="font-bold">Create New Post</h2>
          <button 
            onClick={handleSubmit} 
            disabled={isPosting || !desc}
            className="text-blue-500 font-bold disabled:text-blue-200"
          >
            {isPosting ? "Sharing..." : "Share"}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row h-[500px]">
          <div className="flex-1 bg-gray-50 flex items-center justify-center border-r relative">
            {img ? (
              <Image src={img} fill className="object-cover" alt="Preview" />
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImg(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
                className="ut-label:text-blue-500 ut-button:bg-blue-500 border-none"
              />
            )}
            {img && (
              <button 
                onClick={() => setImg(null)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 text-xs"
              >
                Change
              </button>
            )}
          </div>
          <div className="w-full md:w-64 p-4 flex flex-col">
            <textarea
              placeholder="Write a caption..."
              className="flex-1 outline-none resize-none text-sm"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
