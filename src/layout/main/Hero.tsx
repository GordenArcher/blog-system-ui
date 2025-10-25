
import ReadMoreButton from "../../components/ui/shared/ReadMoreButton"

const Hero = () => {
    return (

        <div className="max-w-7xl m-auto p-4 h-full">
            <div className="w-full relative mb-7">
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2.5">
                    <div className="flex items-start flex-col gap-4">
                        <h3 className="mb-8 max-md:mb-3 text-white font-black leading-0">Featured Posts</h3>

                        <div className="space-y-10 max-md:space-y-4 py-8 relative">
                            <div className="py-2">
                                <h1 className="text-6xl max-lg:text-5xl wrap-break-word leading-normal text-white font-extrabold">How AI will Change the Future</h1>
                            </div>

                            <div className="py-3">
                                <span className="text-[16px] font-normal text-white">The future of AI will see home robots having enhanced intelligence, increased capabilities, and becoming more personal and possibly cute. For example, home robots will overcome navigation, direction</span>
                            </div>

                            <div className="py-1">
                                <ReadMoreButton to="#" text="" />
                            </div>
                        </div>
                         
                    </div>

                   <div className="p-2">
                        <div className="w-full h-120 max-md:h-70 bg-[#CCE9FF] rounded"></div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Hero