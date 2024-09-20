import Link from "next/link";
import Image from "next/image";

const UserMediaCard = ({ userId }: { userId: String }) => {
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
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/5589002/pexels-photo-5589002.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={800} // Set the actual width
            height={600} // Set the actual height
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/5589002/pexels-photo-5589002.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={800} // Set the actual width
            height={600} // Set the actual height
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/5589002/pexels-photo-5589002.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={800} // Set the actual width
            height={600} // Set the actual height
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/5589002/pexels-photo-5589002.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={800} // Set the actual width
            height={600} // Set the actual height
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default UserMediaCard;
