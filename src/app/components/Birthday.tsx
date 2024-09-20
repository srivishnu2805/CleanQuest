import Link from "next/link";
import Image from "next/image";
const Birthday = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Gifts for Campus Sustainaility</span>
      </div>
      {/*USER*/}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/4366837/pexels-photo-4366837.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Rayan</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-blue-500 text-whit text-xs px-2 py-1 rounded-md">
            Send Gift
          </button>
        </div>
      </div>
      {/*UPCOMING*/}
      <div className="p-4 bg-slate-100 rounded-g flex items-center gap-4 ">
        <Image src="/gift.png" alt="" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">Upcoming Presents</span>
          <span className="text-gray-500">
            See other 16 Participants for upcoming gifts
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthday;
