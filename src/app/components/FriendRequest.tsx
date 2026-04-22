import Link from "next/link";
import Image from "next/image";

const FriendRequest = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm flex flex-col gap-4">
      {/*TOP*/}
      <div className="flex justify-between items-center font-bold">
        <span className="text-gray-500">Community Invitations</span>
        <Link href="/friends" className="text-green-600 text-xs hover:underline">
          See all
        </Link>
      </div>
      {/*USER LIST*/}
      {[
        { name: "Rayan", img: "https://images.pexels.com/photos/4366837/pexels-photo-4366837.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Meera", img: "https://images.pexels.com/photos/1034163/pexels-photo-1034163.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Arjun", img: "https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=600" },
      ].map((user, i) => (
        <div key={i} className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src={user.img}
                alt=""
                fill
                className="rounded-full object-cover border border-gray-100"
              />
            </div>
            <span className="font-bold text-gray-700 group-hover:text-green-600 transition">{user.name}</span>
          </div>
          <div className="flex gap-2 justify-end">
            <button className="p-1.5 bg-green-50 rounded-full hover:bg-green-100 transition">
              <Image
                src="/accept.png"
                alt=""
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </button>
            <button className="p-1.5 bg-red-50 rounded-full hover:bg-red-100 transition">
              <Image
                src="/reject.png"
                alt=""
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
