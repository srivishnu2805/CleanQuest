import { getPosts } from "@/lib/actions";
import FeedList from "./FeedList";

const Feed = async () => {
  const initialPosts = await getPosts();

  return (
    <FeedList initialPosts={initialPosts} />
  );
};

export default Feed;
