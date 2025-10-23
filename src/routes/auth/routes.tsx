import { Route, Routes } from "react-router-dom"
import Login from "../../pages/auth/Login"


const AuthRoutes = () => {
    return (
        <section className="w-full h-full">
            <Routes>
                <Route path="/login" element={ <Login />} />
            </Routes>
        </section>
        
    )
}

export default AuthRoutes