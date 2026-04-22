import Link from "next/link";
import Image from "next/image";

const Birthday = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-bold">
        <span className="text-gray-500">Eco-Rewards</span>
      </div>
      {/*USER*/}
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="https://images.pexels.com/photos/4366837/pexels-photo-4366837.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              fill
              className="rounded-full object-cover border border-gray-100"
            />
          </div>
          <span className="font-bold text-gray-700 group-hover:text-green-600 transition">Rayan</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-xl transition">
            Send Gift
          </button>
        </div>
      </div>
      {/*UPCOMING*/}
      <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center gap-4 border border-green-100">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Image src="/gift.png" alt="" width={20} height={20} />
        </div>
        <Link href="/" className="flex flex-col gap-0.5 text-[11px]">
          <span className="text-green-800 font-bold uppercase tracking-tight">Sustainability Badges</span>
          <span className="text-green-600 font-medium">
            16 others just unlocked new badges
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthday;
