import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Loader } from "lucide-react"
import { useCallback, useState } from "react"
import type { Register } from "../../types/auth"
import Logo from "../../components/ui/shared/Logo"
import AuthRight from "../../layout/shared/AuthRight"
import { RegisterUser } from "../../services/api/api"
import { toast } from "react-toastify"

const RegisterForm = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState<Register>({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        password: "",
        confirm_password: "",
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const registerUser = useCallback( async () => {

        if(!formData.username.trim() || !formData.email.trim()  || !formData.first_name.trim()  || !formData.last_name.trim() || !formData.password.trim() || !formData.confirm_password.trim()) return toast.error("All fields are required")

        if(formData.password.trim() !== formData.confirm_password.trim()) return toast.error("Password mismatch, please confirm")

        setIsLoading(true)

        try {
            const response = await RegisterUser(formData)

            if(response){
                toast.success(response?.message)

                setTimeout(()=> {
                    navigate("/auth/login")
                }, 2000)

                setFormData({
                    email: "",
                    username: "",
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                    password: "",
                    confirm_password: "",
                })
            }
        } catch (error: any) {
            const errorData = error?.response?.data
            toast.error(errorData?.message || "An error occured")
        }finally{
            setIsLoading(false)
        }
            
    }, [formData])
    

    return(
        <div className="h-full w-full">

            <Logo />

            <div className="h-full w-full flex items-center justify-center">
                <div className="w-full max-md:w-full flex flex-col max-md:px-3">
                    <div className="w-full max-w-md">
                        <div className="space-y-2">
                            <p className="mb-6 font-black text-black">Login to your HireHub account</p>
                            <p className="text-start text-sm text-gray-600 mb-6">
                                Already have an account?{" "}

                                <Link to="/auth/login" className="text-[#7C4EE4] hover:underline font-medium">
                                    login
                                </Link>
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="mb-3">
                                    <p className="text-start text-sm text-gray-600 mb-3">Create an account and start writing your thoughts...</p>
                                </div>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-3">
                                <div className="">
                                    <input
                                        type="firstname"
                                        placeholder="First Name"
                                        onChange={(e) => setFormData((prevState) => ({...prevState, first_name: e.target.value}))}
                                        value={formData.first_name}
                                        className="w-full px-4 py-2 border border-[#7C4EE4]/20 rounded-lg transition duration-200 focus:outline-none outline-none"
                                        autoComplete="off"
                                        aria-description="name field"
                                    />
                                </div>

                                <div className="">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={(e) => setFormData((prevState) => ({...prevState, last_name: e.target.value}))}
                                        value={formData.last_name}
                                        className="w-full px-4 py-2 border border-[#7C4EE4]/20 rounded-lg transition duration-200 focus:outline-none outline-none"
                                        autoComplete="off"
                                        aria-description="email field"
                                    />
                                </div>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-3">
                                <div className="">
                                    <input
                                        type="text"
                                        placeholder="username"
                                        onChange={(e) => setFormData((prevState) => ({...prevState, username: e.target.value}))}
                                        value={formData.username}
                                        className="w-full px-4 py-2 border border-[#7C4EE4]/20 rounded-lg transition duration-200 focus:outline-none outline-none"
                                        autoComplete="off"
                                        aria-description="username field"
                                    />
                                </div>

                                <div className="">
                                    <input
                                        type="phone"
                                        placeholder="Phone Number"
                                        onChange={(e) => setFormData((prevState) => ({...prevState, phone_number: e.target.value}))}
                                        value={formData.phone_number}
                                        className="w-full px-4 py-2 border border-[#7C4EE4]/20 rounded-lg transition duration-200 focus:outline-none outline-none"
                                        autoComplete="off"
                                        aria-description="phone number field"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setFormData((prevState) => ({...prevState, email: e.target.value}))}
                                    value={formData.email}
                                    className="w-full px-4 py-2 border border-[#7C4EE4]/20 rounded-lg transition duration-200 focus:outline-none outline-none"
                                    autoComplete="off"
                                    aria-description="email field"
                                />
                            </div>

                            <div className="">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setFormData((prevState) => ({...prevState, password: e.target.value}))}
                                    value={formData.password}
                                    className="w-full px-4 py-2 border border-[#7C4EE4]/20 rounded-lg transition duration-200 focus:outline-none outline-none"
                                    autoComplete="off"
                                    aria-description="password field"
                                />
                            </div>

                            <div className="">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setFormData((prevState) => ({...prevState, confirm_password: e.target.value}))}
                                    value={formData.confirm_password}
                                    className="w-full px-4 py-2 border border-[#7C4EE4]/20 rounded-lg transition duration-200 focus:outline-none outline-none"
                                    autoComplete="off"
                                    aria-description="password field"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm mt-3">
                                <div>
                                    <label className="relative flex items-center cursor-pointer group">
                                        <input className="peer sr-only" type="checkbox" />
                                        <div
                                            className="w-6 h-6 rounded-lg bg-white border-2 border-[#7C4EE4] transition-all duration-300 ease-in-out peer-checked:bg-linear-to-br from-[#7C4EE4] to-[#7C4EE4] peer-checked:border-0 peer-checked:rotate-12 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-5 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                                        ></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900">I've read and agree with our {""}</span>
                                        <span className="pl-1"><Link to={""} className="text-[#7C4EE4] hover:underline font-medium">Terms of services</Link></span>
                                    </label>

                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={registerUser}
                                    type="submit"
                                    className="w-full cursor-pointer bg-[#7C4EE4] text-white py-2 transition duration-100 ease-in rounded-lg font-medium hover:bg-[#7C4EE4]/90"
                                >
                                    <div className="w-full flex items-center justify-center gap-1.5">
                                        {isLoading ? (
                                            <>
                                                <Loader size={20} className="animate-spin" />
                                                <span>hold on chief...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Create Account </span>
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                        
                                    </div>
                                </button>
                            </div>
                        </div>
                    
                    </div>
                </div>

                <AuthRight />
                
            </div>
        </div>
    )
}

export default RegisterForm