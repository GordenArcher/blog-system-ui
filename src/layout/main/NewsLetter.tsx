
const NewsLetter = () => {
    return (
        <div className="max-w-4xl m-auto p-4 h-full">
            <div className="w-full p-5 flex items-center justify-center">
                <div className="space-y-5">
                    <div>
                        <h1 className="text-white text-center text-[52px] max-lg:text[37px] max-md:text-[24px]">Get our stories delivered From us to your inbox weekly.</h1>
                    </div>

                    <div className="w-full flex items-center text-center justify-center gap-1">
                        <div className="">
                            <input type="email" className="w-[259px] border border-gray-500 bg-white text-black rounded outline-none px-4 py-4" placeholder="Your email"/>
                        </div>

                        <button className="w-full px-6 max-md:px-4 py-4 border border-white outline-none text-white rounded-md text-center cursor-pointer whitespace-nowrap">Get-Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter