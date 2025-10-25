import { Navigate, Route, Routes } from "react-router-dom"
import useAuthStore from "../../stores/useAuthStore"
import LoginForm from "../../pages/auth/Login"
import RegisterForm from "../../pages/auth/Register"


const AuthRoutes = () => {
    const { isAuthenticated } = useAuthStore()
    return (
        <div className="w-full h-screen relative">
            <div className="w-full h-full relative p-4 max-w-6xl m-auto">
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="*" element={ <Navigate to={"/"} />} />
                            {/* <Route path="company/setup" element={ <SetUp />} />
                            <Route path="company/setup/complete" element={ <SetupComplete />} /> */}
                        </>
                    ) : (
                        <>
                            <Route path="login" element={ <LoginForm />} />
                            <Route path="register" element={ <RegisterForm />} />
                            {/* <Route path="verify-email" element={ <EmailVerification />} />
                            <Route path="activate" element={ <ActivateAccount />} />
                            <Route path="reset-password" element={ <ForgetPassword />} /> */}
                        </>
                    )}


                    <Route path="*" element={ <Navigate to={"/auth/login"} />} />

                    
                </Routes>
            </div>
        </div>
    )
}

export default AuthRoutes