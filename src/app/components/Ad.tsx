import Image from "next/image";
const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm ">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/*BOTTOM*/}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="/"
            alt=""
            className="rounded-lg object-cover"
            width={800}
            height={-800}
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/15438553/pexels-photo-15438553/free-photo-of-a-building-with-a-large-glass-roof-and-a-courtyard.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">Keep Campus clean</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Keeping the campus clean fosters a healthy, organized, and inspiring environment."
            : size === "md"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
