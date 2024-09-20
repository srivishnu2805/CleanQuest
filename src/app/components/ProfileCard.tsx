import Image from "next/image";
import Link from "next/link";
const ProfileCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/2860705/pexels-photo-2860705.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.pexels.com/photos/5553937/pexels-photo-5553937.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">Srivishnu</span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/5553937/pexels-photo-5553937.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/5553937/pexels-photo-5553937.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/5553937/pexels-photo-5553937.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
          </div>
          <span className="text-xs text-gray-500">20 Votes</span>
        </div>
        <Link href="/">
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
