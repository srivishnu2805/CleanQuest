import Comments from "./Comments";
import Image from "next/image";
const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/*USER*/}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4 ">
          <Image
            src="https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=600"
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Sanjay</span>
        </div>
        <img src="/more.png" width={16} height={16} alt="" />
      </div>
      {/*DESC*/}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/3900509/pexels-photo-3900509.jpeg?auto=compress&cs=tinysrgb&w=600"
            fill
            className="object-cover rounded-md "
            alt=""
          />
        </div>
        <p>
          Removing plastic bags from roads helps reduce environmental pollution,
          prevent blockages in drainage systems, and protect wildlife from
          ingesting or getting entangled in plastic waste. It improves the
          cleanliness of public spaces, promotes a healthier ecosystem, and
          encourages sustainable practices for a cleaner, safer community.
        </p>
      </div>
      {/*INTERACTION*/}
      <div className="flex item-center justify-between text-sm mt-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-100 p2 rounded-xl">
            <Image
              src="/like.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
            <span className="text-gray-300">Positive</span>
            <span className="text-gray-500">
              1<span className="hidden md:inline"> Neutral</span>
            </span>
          </div>
          <div className="flex items-center gap-4 bg-slate-100 p2 rounded-xl">
            <Image
              src="/comment.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              12<span className="hidden md:inline"> Comment</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-slate-100 p2 rounded-xl">
            <Image
              src="/share.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              1<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
