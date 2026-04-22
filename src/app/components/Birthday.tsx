import Link from "next/link";
import Image from "next/image";

const Birthday = () => {
  return (
    <div
      className="p-4 rounded-2xl text-sm flex flex-col gap-4"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex justify-between items-center font-bold">
        <span style={{ color: "var(--text-secondary)" }}>Eco-Rewards</span>
      </div>
      {/*USER*/}
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="https://images.pexels.com/photos/4366837/pexels-photo-4366837.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              fill
              className="rounded-full object-cover"
              style={{ border: "1px solid var(--border-color)" }}
            />
          </div>
          <span className="font-bold group-hover:text-emerald-500 transition" style={{ color: "var(--text-secondary)" }}>Rayan</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-xl transition shadow-md shadow-emerald-500/20">
            Send Gift
          </button>
        </div>
      </div>
      {/*UPCOMING*/}
      <div
        className="p-3 rounded-xl flex items-center gap-4"
        style={{
          background: "linear-gradient(to bottom right, var(--green-bg), var(--green-bg))",
          border: "1px solid var(--border-color)",
        }}
      >
        <div className="p-2 rounded-lg shadow-sm" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <Image src="/gift.png" alt="" width={20} height={20} />
        </div>
        <Link href="/" className="flex flex-col gap-0.5 text-[11px]">
          <span className="font-bold uppercase tracking-tight" style={{ color: "var(--green-text)" }}>Sustainability Badges</span>
          <span className="font-medium" style={{ color: "var(--green-primary)" }}>
            16 others just unlocked new badges
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthday;
