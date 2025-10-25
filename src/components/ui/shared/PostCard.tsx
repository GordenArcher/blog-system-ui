import ReadMoreButton from "./ReadMoreButton"

const PostCard = () => {
    return (
        <div className="w-full relative">
            <div className="relative flex flex-col gap-3.5  p-2">
                <div className="w-full h-[258px] bg-[#CCE9FF] rounded relative"></div>

                <div className="relative w-full bg-white rounded-lg py-5 px-3">
                    <div className="space-y-3 relative">
                        <div className="flex items-center gap-2.5">
                            <h3 className="font-semibold text-[#333333] text-[14px]">Development</h3>
                            <span className="font-normal text-gray-500 text-[12px]">14 May, 2004</span>
                        </div>

                        <div className="py-4">
                            <h1 className="text-[17px] font-bold line-clamp-3 text-[#7C4EE4]">How to make a Game look more attractive with New VR & AI Technology</h1>
                        </div>

                        <div className="font-sans mb-5 text-[16px]">
                            <span className="font-normal line-clamp-4">Google has been investing in AI for many years and bringing its benefits to individuals, businesses and communities. Whether it’s publishing state-of-the-art research, building helpful products or developing tools and resources that enable others, we’re committed to making AI accessible to everyone.</span>
                        </div>
                        

                        <div className="py-4">
                            <ReadMoreButton to="#" text=""  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard