import PostCard from "../../components/ui/shared/PostCard"
import PageHeader from "../../layout/shared/PageHeader"
import { usePostStore } from "../../stores/usePostStore"
import type { Post } from "../../types/posts"

const Blog = () => {

    const { loading, error, posts } = usePostStore()
    return (
        <div className="max-w-7xl m-auto max-md:p-2 py-10">
            <div className="w-full relative">
                <div className="flex flex-col gap-6 space-x-12">
                    <PageHeader head="Blogs" title="Find our all blogs from here" para="blogs are written from very research and well known writers so that  we can provide you the best blogs and articles articles for you to read them all along" />
                    

                    <div className="p-1">
                        <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-2.5">
                            {posts?.map((post: Post) => <PostCard key={post} post={post} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog