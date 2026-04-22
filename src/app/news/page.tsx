import { getNews } from "@/lib/actions";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Image from "next/image";

export default async function News() {
  const news = await getNews();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <h1 className="text-xl font-bold text-gray-800">Sustainability News</h1>
             <p className="text-sm text-gray-500">Latest updates from our green campus initiatives.</p>
          </div>
          
          <div className="flex flex-col gap-4">
             {news.map((item) => (
               <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-48 md:h-auto rounded-xl overflow-hidden flex-shrink-0">
                     <Image src={item.img} fill className="object-cover" alt=""/>
                  </div>
                  <div className="flex flex-col justify-between py-2">
                     <div>
                        <span className="text-xs text-green-600 font-bold uppercase tracking-wider">{item.date}</span>
                        <h2 className="text-xl font-bold text-gray-800 mt-1 mb-2">{item.title}</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                     </div>
                     <button className="text-blue-500 text-sm font-bold self-start mt-4 hover:underline">Read more →</button>
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
