import type { Category } from "../../../types/posts";
import type { Profile } from "../../../types/shared";
import ReadMoreButton from "./ReadMoreButton"

export interface Post {
    id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    cover_image: string | null;
    category: Category | null;
    author: Profile;
    views: number;
    total_likes: number;
    created_at: string;
    seo_title: string;
    seo_description: string;
}

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post })  => {
    return (
        <div className="w-full relative">
            <div className="relative flex flex-col gap-2.5 p-2">
                <div className="w-full h-[258px] bg-[#CCE9FF] rounded-2xl relative overflow-hidden">
                    {post?.cover_image ? (
                        <img
                            src={`${post.cover_image}`}
                            alt={post.title}
                            className="w-full h-full rounded-2xl"
                            draggable={false}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="relative w-full bg-white rounded-lg py-5 px-3 shadow-sm">
                    <div className="space-y-2 relative">
                        <div className="flex items-center gap-2.5">
                            <h3 className="font-semibold text-[#333333] text-[14px]">
                                {post?.category?.name || "Uncategorized"}
                            </h3>

                            <span className="font-normal text-gray-500 text-[12px]">
                                {new Date(post?.created_at).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        <div className="py-2">
                            <h1 className="text-[17px] font-bold line-clamp-3 text-[#7C4EE4]">
                                {post?.title}
                            </h1>
                        </div>

                        <div className="font-sans mb-5 text-[15px] text-gray-700">
                            <span className="font-normal line-clamp-4">{post?.excerpt}</span>
                        </div>

                        <div className="pt-2">
                            <ReadMoreButton to={`/blog/details/read/${post?.slug}`} text="Read More" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard