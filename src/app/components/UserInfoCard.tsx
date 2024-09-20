import Link from "next/link";
import Image from "next/image";
const UserInfoCard = ({ userId }: { userId: String }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/*TOP*/}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/*BOTTOM*/}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">SriVishnu</span>
          <span className="text-sm">@SriVishnu</span>
        </div>
        <p>
          "Passionate advocate for campus sustainability, promoting eco-friendly
          initiatives, reducing waste, and fostering a cleaner, greener
          environment."
        </p>
        <div className="flex items-center gap-2">
          <Image src="/map.png" alt="" width={16} height={16} />
          <span>
            Went to<b>Amrita Vishwa Vidyapeetham</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/school.png" alt="" width={16} height={16} />
          <span>Living in Chennai</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/work.png" alt="" width={16} height={16} />
          <span>
            Post images for <b>Sustainable Development</b>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <Image src="/link.png" alt="" width={16} height={16} />
            <Link
              href="www.linkedin.com/in/srivishnu-t"
              className="text-blue-500 font-medium"
            >
              Vishnu
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span> Joined 21 Sept 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-">
          Follow
        </button>
        <span className="text-red-400 self-end text-xs cursor-pointer">
          Block user
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;
