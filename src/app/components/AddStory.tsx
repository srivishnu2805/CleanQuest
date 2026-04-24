"use client";

import { UploadButton } from "@/lib/uploadthing";
import { addStory } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddStory = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className="relative w-16 h-16 p-1 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center group-hover:border-emerald-500 transition overflow-hidden bg-gray-50 dark:bg-slate-800">
        {isUploading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
        ) : (
          <UploadButton
            endpoint="imageUploader"
            onUploadBegin={() => setIsUploading(true)}
            onClientUploadComplete={async (res) => {
              await addStory(res[0].url);
              setIsUploading(false);
              router.refresh();
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
              setIsUploading(false);
            }}
            appearance={{
              button: "bg-transparent text-gray-400 hover:text-emerald-500 border-none w-full h-full flex items-center justify-center text-2xl font-light",
              allowedContent: "hidden"
            }}
            content={{
              button: "+"
            }}
          />
        )}
      </div>
      <span className="font-semibold text-xs transition group-hover:text-emerald-500" style={{ color: "var(--text-secondary)" }}>
        Add Story
      </span>
    </div>
  );
};

export default AddStory;
