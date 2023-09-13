import { Post } from "@/types/collection";
import PostCard from "./post-card";

interface PostListIsinya {
    posts: Post[];
    layout?: "vertical" | "horizontal";
    locale: string;
}

const PostList = ({ posts, layout = "vertical", locale }: PostListIsinya) => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:auto-cols-fr">
        {posts && posts.map((post) => (
            <PostCard locale={locale} layout={layout} post={post} key={post.id} />
        ))}
    </div>
  );
};

export default PostList;