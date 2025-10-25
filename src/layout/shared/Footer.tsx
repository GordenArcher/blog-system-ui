import { Link } from "react-router-dom"
import Logo from "../../components/ui/shared/Logo"
import NewsLetter from "../main/NewsLetter"

const Footer = () => {

    return (
        <>
            <div className="w-full h-full px-3 bg-[#7C4EE4] mb-8">
                <NewsLetter />
            </div>

            <div className="max-w-7xl m-auto bg-white relative">
                <div className="w-full flex flex-col gap-3">
                    <div className="space-y-8 relative w-full flex items-center justify-center flex-col">
                        <div className="mb-3">
                            <Logo />
                        </div>

                        <div className="py-3">
                            <ul className="flex items-center gap-2.5">
                                <li className="px-4 max-md:px-2 py-2">
                                    <Link to={"/"} className="hover:text-[#7C4EE4] font-normal text-gray-700 font-sans text-[16px]">Home</Link>
                                </li>

                                <li className="px-4 max-md:px-2 py-2">
                                    <Link to={"/blog"} className="hover:text-[#7C4EE4] font-normal text-gray-700 font-sans text-[16px]">Blog</Link>
                                </li>

                                <li className="px-4 max-md:px-2 py-2">
                                    <Link to={"/about-us"} className="hover:text-[#7C4EE4] font-normal text-gray-700 font-sans text-[16px]">About</Link>
                                </li>

                                <li className="px-4 max-md:px-2 py-2">
                                    <Link to={"/reach-out"} className="hover:text-[#7C4EE4] font-normal text-gray-700 font-sans text-[16px]">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full h-0.5 block bg-[#7C4EE4]"></div>

                    <div className="py-12 text-center">
                        <p className="font-normal">Copyright Ideapeel Inc © {new Date().getFullYear()}. All Right Reserved</p>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Footer