import Image from "next/image";
import { getStories } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import AddStory from "./AddStory";

const Stories = async () => {
  const { userId: currentUserId } = await auth();
  const stories = await getStories();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-scroll text-xs scrollbar-hide">
      <div className="flex gap-6 w-max">
        <AddStory />

        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="relative w-16 h-16 p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-green-500 group-hover:scale-105 transition duration-200">
              <div className="relative w-full h-full border-2 border-white rounded-full overflow-hidden">
                <Image
                  src={story.img}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <span className="font-semibold text-gray-600 group-hover:text-green-600 transition truncate w-16 text-center">
              {story.user?.username || "User"}
            </span>
          </div>
        ))}
        
        {stories.length === 0 && (
           <div className="flex items-center text-gray-400 px-4 italic">
             No active stories. Share your impact!
           </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
