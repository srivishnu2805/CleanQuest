import Image from "next/image";

const Comments = () => {
  return (
    <div className="">
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/1034163/pexels-photo-1034163.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 flex item-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-trans outline-none flex-1 "
          ></input>
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* Comments */}
      <div className="">
        {/* Comment */}
        <div className="flex gap-4 justify-between mt-6">
          {/* Aavatar */}
          <Image
            src="https://images.pexels.com/photos/1034163/pexels-photo-1034163.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          {/* Desc */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Srivishnu</span>
            <p>
              Removing plastic bags from roads is vital for reducing pollution,
              safeguarding wildlife, and maintaining a cleaner environment.
              Great initiative!
            </p>
            <div className="flex items-center gap-8 text-xs text-grey-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-grey-300">1 Vote</span>
                <span className="text-grey-500">3 Likes</span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* Icon */}
          <Image
            src="/more.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
