import { Route, Routes } from "react-router-dom"
import AuthRoutes from "./auth/routes"
import MainRoutes from "./main/routes"

const routes = () => {
    return (
        <Routes>
            <Route path="/*" element={ <MainRoutes />} />
            <Route path="/auth/*" element={ <AuthRoutes />} />
        </Routes>
    )
}

export default routes