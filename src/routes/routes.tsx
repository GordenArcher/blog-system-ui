import { Route, Routes } from "react-router-dom"
import AuthRoutes from "./auth/routes"
import NotFound_ from "../pages/_not_found_/404"
import Index from "../pages/_main_"

const routes = () => {
    return (
        <Routes>
            <Route path="/" element={ <Index />} />
            <Route path="/auth/*" element={ <AuthRoutes />} />
            <Route path="*" element={ <NotFound_ />} />
        </Routes>
    )
}

export default routes