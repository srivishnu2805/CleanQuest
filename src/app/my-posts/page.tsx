import { auth } from "@clerk/nextjs/server";
import { getUserPosts } from "@/lib/actions";
import Post from "../components/Post";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import AddPostTrigger from "../components/AddPostTrigger";

const MyPostsPage = async () => {
  const { userId } = await auth();
  if (!userId) return <div>Unauthorized</div>;

  const posts = await getUserPosts(userId);

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Posts</h1>
          <p className="text-gray-500 text-sm">Review all your campus sustainability contributions.</p>
        </div>
        
        <AddPostTrigger />

        <div className="flex flex-col gap-6">
          {posts.length > 0 ? (
            posts.map((post: any) => <Post key={post.id} post={post} />)
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-gray-400 text-center">
               <p className="text-4xl mb-4">🌱</p>
               <p>You haven&apos;t posted anything yet. Start your first quest!</p>
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId={userId} />
      </div>
    </div>
  );
};

export default MyPostsPage;
