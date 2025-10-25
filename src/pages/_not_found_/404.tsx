import ReadMoreButton from "../../components/ui/shared/ReadMoreButton"

const NotFound_ = () => {
    return (
        <div className="max-w-7xl mx-auto max-md:p-4 py-10">
            <div className="w-full relative">
                <div className="max-w-3xl m-auto rounded-2xl px-4 py-10 bg-[#7C4EE4]">
                    <div className="w-full flex items-center justify-center flex-col gap-3.5">
                        <div className="py-4">
                            <h1 className="font-black text-white text-7xl max-md:text-3xl ">404</h1>
                        </div>

                        <div className="text-base text-center py-7 text-white">
                            <span className="">
                                Sorry! <br />
                                The link is broken, try to refresh or go to home
                            </span>
                        </div>

                        <div className="py-2"> 
                            <ReadMoreButton to="/" text="Go Home" bg="bg-white" cl="text-[#7C4EE4]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound_