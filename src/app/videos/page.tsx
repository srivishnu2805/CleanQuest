import * as actions from "@/lib/actions";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Image from "next/image";
import Link from "next/link";

export default async function Videos() {
  const fetchPosts =
    (
      actions as {
        getMediaPosts?: () => Promise<any[]>;
        getPosts?: () => Promise<any[]>;
      }
    ).getMediaPosts ??
    (actions as { getPosts?: () => Promise<any[]> }).getPosts;

  const rawPosts = (await fetchPosts?.()) ?? [];
  const posts = rawPosts.filter((post: { img?: string | null }) => Boolean(post?.img));

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <h1 className="text-xl font-bold text-gray-800">Media Gallery</h1>
             <p className="text-sm text-gray-500">Visual proof of our campus impact.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
             {posts.map((post: {
               id: string | number;
               userId: string | number;
               img?: string | null;
               likes?: unknown[];
               commentCount?: number;
             }) => (
               <Link key={post.id} href={`/profile/${post.userId}`} className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image src={post.img!} fill className="object-cover group-hover:scale-110 transition duration-300" alt=""/>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition flex items-center justify-center">
                     <div className="hidden group-hover:flex items-center gap-4 text-white text-xs font-bold">
                        <span className="flex items-center gap-1">❤️ {post.likes?.length || 0}</span>
                        <span className="flex items-center gap-1">💬 {post.commentCount}</span>
                     </div>
                  </div>
               </Link>
             ))}
             
             {posts.length === 0 && (
               <div className="col-span-full text-center py-20 text-gray-500">
                  No media posts yet.
               </div>
             )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
