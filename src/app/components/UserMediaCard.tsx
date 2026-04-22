import Link from "next/link";
import Image from "next/image";

const UserMediaCard = ({ userId }: { userId: String }) => {
  return (
    <div
      className="p-4 rounded-2xl text-sm flex flex-col gap-4"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/*TOP*/}
      <div className="flex justify-between items-center font-medium">
        <span style={{ color: "var(--text-secondary)" }}>User Media</span>
        <Link href="/" className="text-xs" style={{ color: "var(--green-primary)" }}>
          See all
        </Link>
      </div>
      {/*BOTTOM*/}
      <div className="flex gap-4 justify-between flex-wrap">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative w-1/5 h-24 rounded-lg overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/5589002/pexels-photo-5589002.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width={800}
              height={600}
              className="object-cover rounded-lg hover:scale-110 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMediaCard;
