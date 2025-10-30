import { Link } from "react-router-dom"
import Logo from "../../components/ui/shared/Logo"
import { Menu, Search } from "lucide-react"
import useAuthStore from "../../stores/useAuthStore"

const NavBar = () => {

    const { isAuthenticated } = useAuthStore()

    return (
        <div className="w-full relative">
            <section className="w-full h-[70.37px] bg-white">
                <div className="max-w-7xl m-auto h-full p-4 flex">
                    <div className="w-full flex items-center justify-between gap-6">
                        <div className="p-1 relative">
                            <Logo />
                            
                        </div>

                        <div className="px-3 max-md:hidden">
                            <ul className="flex items-center gap-5">
                                <li className="px-4 py-2">
                                    <Link to={"/blog"} className="hover:text-[#7C4EE4] font-normal text-gray-700 font-sans text-[16px]">Blog</Link>
                                </li>

                                <li className="px-4 py-2">
                                    <Link to={"/about-us"} className="hover:text-[#7C4EE4] font-normal text-gray-700 font-sans text-[16px]">About</Link>
                                </li>

                                <li className="px-4 py-2">
                                    <Link to={"/search"} title="search" className="cursor-pointer">
                                        <Search className="hover:text-[#7C4EE4] cursor-pointer font-normal text-gray-700 font-sans text-[16px]" />
                                    </Link>
                                    
                                </li>

                                <li className="px-4 py-2">
                                    <Link to={isAuthenticated ? "/post/write" : "/auth/login"} className="px-6 py-3 rounded duration-150 ease-linear bg-[#7C4EE4] hover:bg-[#7C4EE4]/90 font-normal text-white font-sans text-[16px]">{isAuthenticated ? "Write" : "Login / Register"}</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="hidden max-md:flex px-4">
                            <button title="open menu">
                                <Menu color="#7C4EE4" size={25} />
                            </button>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NavBar