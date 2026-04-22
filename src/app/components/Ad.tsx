import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div
      className="p-4 rounded-2xl text-sm"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* TOP */}
      <div className="flex items-center justify-between font-bold uppercase tracking-wider text-[10px]" style={{ color: "var(--text-tertiary)" }}>
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
          <span className="font-bold" style={{ color: "var(--green-primary)" }}>Green Campus Initiative</span>
        </div>
        <p style={{ color: "var(--text-secondary)" }} className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Fostering a healthy, organized, and inspiring environment for all students."
            : size === "md"
            ? "Join our mission to transform our university into a global leader in sustainability through smart waste management."
            : "Join our mission to transform our university into a global leader in sustainability through smart waste management and renewable energy solutions. Together, we can make a difference."}
        </p>
        <button
          className="p-2 text-[11px] font-bold uppercase tracking-widest rounded-xl transition"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-secondary)",
          }}
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
