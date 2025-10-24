import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <div className="max-w-7xl m-auto p-4 h-full">
            <div className="w-full relative">
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2.5">
                    <div className="flex items-start flex-col gap-4">
                        <h3 className="mb-8 text-white font-medium leading-0">Featured Posts</h3>

                        <div className="space-y-10 py-8 relative">
                            <div className="py-2 leading-0">
                                <h1 className="text-6xl max-lg:text-5xl max-md:text-3xl wrap-break-word leading-18 text-white font-extrabold">How AI will Change the Future</h1>
                            </div>

                            <div className="py-3">
                                <span className="text-[16px] font-normal text-white">The future of AI will see home robots having enhanced intelligence, increased capabilities, and becoming more personal and possibly cute. For example, home robots will overcome navigation, direction</span>
                            </div>

                            <div className=""></div>
                        </div>

                         <div className="py-1">
                            <Link to={"/reach-out"} className="px-6 py-3 rounded duration-150 ease-linear bg-white text-[#7C4EE4] font-normal font-sans text-[16px]">Read more</Link>
                        </div>
                    </div>

                   <div className="p-2">
                    <div className="w-full h-120 bg-red-500 rounded"></div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Hero