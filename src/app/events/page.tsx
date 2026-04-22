import { getEvents } from "@/lib/actions";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Image from "next/image";

export default async function Events() {
  const events = await getEvents();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <h1 className="text-xl font-bold text-gray-800">Campus Events</h1>
             <p className="text-sm text-gray-500">Join the movement and participate in our upcoming drives.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {events.map((event) => (
               <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  <div className="relative w-full h-40">
                     <Image src={event.img} fill className="object-cover" alt=""/>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                     <div className="flex justify-between items-start mb-2">
                        <h2 className="font-bold text-gray-800">{event.title}</h2>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold uppercase">{event.date}</span>
                     </div>
                     <p className="text-gray-500 text-xs mb-4 line-clamp-2">{event.desc}</p>
                     <div className="mt-auto flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                           <Image src="/date.png" width={12} height={12} alt=""/>
                           <span>{event.time} @ {event.location}</span>
                        </div>
                        <button className="w-full bg-green-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-green-700 transition">Interested</button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
