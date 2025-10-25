import PostCard from "./ui/shared/PostCard"
import ReadMoreButton from "./ui/shared/ReadMoreButton"

const PopularPost = () => {

    return (
        <section className="w-full relative">
            <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2.5">
                    <h1 className="text-4xl font-bold space-x-2.5">Popular Posts</h1>

                    <div className="px-2">
                        <ReadMoreButton to="" text="View All" cl="text-white" bg="text-violet-800" />
                    </div>
                </div>

                <div className="py-2">
                    <div className="w-full grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-2.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((post) => <PostCard />)}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default PopularPost