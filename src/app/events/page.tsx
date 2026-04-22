import { getEvents } from "@/lib/actions";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Events — CleanQuest",
  description: "Join sustainability drives and campus events.",
};

export default async function Events() {
  const events = await getEvents();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div
            className="p-4 rounded-2xl"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
             <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Campus Events</h1>
             <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Join the movement and participate in our upcoming drives.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {events.map((event: any) => (
               <div
                 key={event.id}
                 className="rounded-2xl overflow-hidden flex flex-col"
                 style={{
                   backgroundColor: "var(--bg-secondary)",
                   border: "1px solid var(--border-color)",
                   boxShadow: "var(--shadow-sm)",
                 }}
               >
                  {event.img && (
                    <div className="relative w-full h-40">
                       <Image src={event.img} fill className="object-cover" alt=""/>
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                     <div className="flex justify-between items-start mb-2">
                        <h2 className="font-bold" style={{ color: "var(--text-primary)" }}>{event.title}</h2>
                        <span className="text-[10px] px-2 py-1 rounded-full font-bold uppercase" style={{ backgroundColor: "var(--green-bg)", color: "var(--green-text)" }}>{event.date}</span>
                     </div>
                     <p className="text-xs mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>{event.desc}</p>
                     <div className="mt-auto flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                           <Image src="/date.png" width={12} height={12} alt=""/>
                           <span>{event.time} @ {event.location}</span>
                        </div>
                        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition">Interested</button>
                     </div>
                  </div>
               </div>
             ))}
          </div>

          {events.length === 0 && (
            <div
              className="p-8 rounded-2xl text-center"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-tertiary)",
              }}
            >
              <p className="text-4xl mb-4">📅</p>
              <p>No upcoming events. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
