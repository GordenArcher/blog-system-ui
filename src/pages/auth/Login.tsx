import { ArrowRight, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import Logo from "../../components/ui/shared/Logo";
import { Get_user, LoginUser } from "../../services/api/api";
import type { Login } from "../../types/auth";
import AuthRight from "../../layout/shared/AuthRight";
import { toast } from "react-toastify";


const LoginForm = () => {
    const { setAuthenticated, setUser } = useAuthStore()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<Login>({
        username: "",
        password: ""
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = useCallback( async () => {

        if(!formData.username.trim() || !formData.password.trim()) return

        setIsLoading(true)

        try {
            const response = await LoginUser(formData)

            if(response){
                setAuthenticated(response?.auth)
                toast.success(response?.message)

                const res = await Get_user()

                if(res){
                    setUser(res)
                }
                
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }
        } catch (error: any) {
            const errorData = error?.response?.data
            toast.error(errorData?.message || "An error occured")
            return
        }finally{
            setIsLoading(false)
        }
        

        

    }, [formData, setAuthenticated, navigate, setUser])


    // const ResendEmail = async () => {
    //     if(!formaData.email.trim()) return toast.error("Email is required")

    //     setIsResending(true)

    //     try {
    //         const response = await resendActivationEmail(formaData.email)

    //         if(response){
    //             toast.success(response.message)

    //             setTimeout(() => {
    //                 setShow(false)
    //             }, 2000)
    //         }

    //     } catch (error) {
    //         return error
    //     }finally{
    //         setIsResending(false)
    //     }
    // };

    return (
        <div className="h-full w-full">

            <Logo />

            <div className="h-full w-full flex items-center justify-center">
                <div className="w-full max-md:w-full flex flex-col max-md:px-3">
                    <div className="w-full max-w-md">
                        <div className="space-y-2">
                            <p className="mb-6 font-black text-black">Login to your Keep writing.</p>
                            <p className="text-start text-sm text-gray-600 mb-6">
                                Don&apos;t have an account?{" "}
                                <Link to="/auth/register" className="text-[#7C4EE4] hover:underline font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setFormData((prevData) => ({...prevData, username: e.target.value}))}
                                    value={formData.username}
                                    className="w-full px-4 py-3 border border-[#7C4EE4]/30 rounded-lg transition duration-200 focus:outline-none outline-none"
                                    autoComplete="off"
                                    aria-description="username field"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setFormData((prevData) => ({...prevData, password: e.target.value}))}
                                    value={formData.password}
                                    className="w-full px-4 py-3 border  border-[#7C4EE4]/30 rounded-lg transition duration-200 focus:outline-none outline-none"
                                    autoComplete="off"
                                    aria-description="password field"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm mt-3">
                                <div>
                                    <label className="relative flex items-center cursor-pointer group">
                                        <input className="peer sr-only" type="checkbox" />
                                        <div
                                            className="w-6 h-6 rounded-lg bg-white border-2 border-[#7C4EE4] transition-all duration-300 ease-in-out peer-checked:bg-linear-to-br from-[#7C4EE4]/50 to-[#7C4EE4]/40 peer-checked:border-0 peer-checked:rotate-12 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-5 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                                        ></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900">Remember me</span>
                                    </label>

                                </div>

                                <div>
                                    <Link to="/auth/reset-password" className="text-[#7C4EE4] hover:underline">Forgot password?</Link>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={handleLogin}
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full disabled:cursor-not-allowed cursor-pointer bg-[#7C4EE4] text-white py-3 transition duration-100 ease-in rounded-lg font-medium hover:bg-[#7C4EE4]"
                                >
                                    <div className="w-full flex items-center justify-center gap-1.5">
                                        {isLoading ? (
                                            <>
                                                <Loader size={20} className="animate-spin" />
                                                <span>Please wait...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Login</span>
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                        
                                    </div>
                                </button>
                            </div>

                            {/* {show && 
                                <div className="pt-2">
                                    <button onClick={ResendEmail} disabled={isResending} title="resend email" className="p-1 cursor-pointer disabled:cursor-not-allowed disabled:text-orange-300 text-orange-600">
                                        { isResending ? "resending..." : "Resend activation email"}
                                    </button>
                                </div>
                            } */}
                        </div>
                    
                    </div>
                </div>

                <AuthRight />

            </div>
        </div>
    );
};

export default LoginForm;
