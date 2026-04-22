import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-400 font-bold uppercase tracking-wider text-[10px]">
        <span>Sponsored</span>
        <Image src="/more.png" alt="" width={16} height={16} className="opacity-50 cursor-pointer" />
      </div>
      {/*BOTTOM*/}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full overflow-hidden rounded-xl ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/15438553/pexels-photo-15438553/free-photo-of-a-building-with-a-large-glass-roof-and-a-courtyard.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover hover:scale-110 transition duration-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-6 h-6">
            <Image
              src="https://images.pexels.com/photos/15438553/pexels-photo-15438553/free-photo-of-a-building-with-a-large-glass-roof-and-a-courtyard.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-green-600 font-bold">Green Campus Initiative</span>
        </div>
        <p className={size === "sm" ? "text-xs text-gray-500" : "text-sm text-gray-600"}>
          {size === "sm"
            ? "Fostering a healthy, organized, and inspiring environment for all students."
            : size === "md"
            ? "Join our mission to transform our university into a global leader in sustainability through smart waste management."
            : "Join our mission to transform our university into a global leader in sustainability through smart waste management and renewable energy solutions. Together, we can make a difference."}
        </p>
        <button className="bg-slate-100 hover:bg-slate-200 text-gray-600 p-2 text-[11px] font-bold uppercase tracking-widest rounded-xl transition">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
