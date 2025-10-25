import PostCard from "./ui/shared/PostCard"
import ReadMoreButton from "./ui/shared/ReadMoreButton"

const OurRecentPost = () => {
    return (
        <section className="w-full relative">
            <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2.5">
                    <h1 className="text-4xl space-x-2 font-bold">Our Recent Blog</h1>

                    <div className="px-2">
                        <ReadMoreButton to="" text="View All" cl="text-white" bg="text-violet-800" />
                    </div>
                </div>

                <div className="flex flex-col gap-3.5">
                    <div className="w-full">
                        <div className="relative flex max-md:flex-col gap-3.5  p-2">
                            <div className="w-full h-[476px] max-md:h-[200px] bg-[#CCE9FF] rounded relative"></div>

                            <div className="relative w-full bg-white rounded-lg py-5 px-3">
                                <div className="space-y-3 relative">
                                    <div className="flex items-center gap-2.5">
                                        <h3 className="font-semibold text-[#333333] text-[14px]">Development</h3>
                                        <span className="font-normal text-gray-500 text-[12px]">14 May, 2004</span>
                                    </div>

                                    <div className="py-4">
                                        <h1 className="text-6xl max-md:text-4xl font-bold line-clamp-3 text-[#7C4EE4]">How to make a Game look more attractive with New VR & AI Technology</h1>
                                    </div>

                                    <div className="font-sans mb-5 text-[16px]">
                                        <span className="font-normal">Google has been investing in AI for many years and bringing its benefits to individuals, businesses and communities. Whether it’s publishing state-of-the-art research, building helpful products or developing tools and resources that enable others, we’re committed to making AI accessible to everyone.</span>
                                    </div>
                                    

                                    <div className="py-4">
                                        <ReadMoreButton to="#" text=""  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-2">
                    <div className="w-full grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-2.5">
                        {[1, 2, 3].map((post) => <PostCard />)}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default OurRecentPost