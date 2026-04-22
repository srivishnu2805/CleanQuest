import Image from "next/image";
import { getStories } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import AddStory from "./AddStory";

const Stories = async () => {
  const { userId: currentUserId } = await auth();
  const stories = await getStories();

  return (
    <div
      className="p-4 rounded-2xl overflow-x-scroll text-xs scrollbar-hide"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex gap-5 w-max">
        <AddStory />

        {stories.map((story: any) => (
          <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="relative w-16 h-16 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-emerald-500 to-cyan-500 group-hover:scale-105 transition duration-200">
              <div className="relative w-full h-full border-2 rounded-full overflow-hidden" style={{ borderColor: "var(--bg-secondary)" }}>
                <Image
                  src={story.img}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <span className="font-semibold group-hover:text-emerald-500 transition truncate w-16 text-center" style={{ color: "var(--text-secondary)" }}>
              {story.user?.username || "User"}
            </span>
          </div>
        ))}
        
        {stories.length === 0 && (
           <div className="flex items-center px-4 italic" style={{ color: "var(--text-tertiary)" }}>
             No active stories. Share your impact!
           </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
