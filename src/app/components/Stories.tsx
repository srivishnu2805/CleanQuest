import Image from "next/image";
const Stories = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max w-max">
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">Srivishnu</span>
        </div>
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/3784424/pexels-photo-3784424.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">Vasanth</span>
        </div>
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/3550651/pexels-photo-3550651.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">Sankar</span>
        </div>
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/5157280/pexels-photo-5157280.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">SreeKumar</span>
        </div>
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/2835311/pexels-photo-2835311.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">Dr John</span>
        </div>
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/1694346/pexels-photo-1694346.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">Jason</span>
        </div>
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/8513079/pexels-photo-8513079.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">Jim</span>
        </div>
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/5255228/pexels-photo-5255228.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">Samson</span>
        </div>
        {/*Story*/}
        <div className="flex flex-col items-centre gap-2 cursor pointer">
          <Image
            src="https://images.pexels.com/photos/8513079/pexels-photo-8513079.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium p-3">Jim</span>
        </div>
      </div>
    </div>
  );
};

export default Stories;
