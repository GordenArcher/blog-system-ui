import { Route, Routes } from "react-router-dom"
import Index from "../../pages/_main_"
import NotFound_ from "../../pages/_not_found_/404"
import Contact from "../../pages/_main_/Contact"
import About from "../../pages/_main_/About"
import NavBar from "../../layout/shared/NavBar"
import Footer from "../../layout/shared/Footer"
import Blog from "../../pages/_main_/Blog"
import WritePost from "../../pages/_main_/WritePost"
import BlogDetails from "../../pages/_main_/blog/BlogDetails"
import useAuthStore from "../../stores/useAuthStore"
import SearchPage from "../../pages/Search"

const MainRoutes = () => {
    const { isAuthenticated } = useAuthStore()
    return (
        <div className="w-full h-full relative space-y-8">
            <NavBar />

            <Routes>
                {isAuthenticated && (
                    <>
                        <Route path="/writer/me" element={ <BlogDetails />} />
                    </>
                )}
                <Route path="/" element={ <Index />} />
                <Route path="/blog" element={ <Blog />} />
                <Route path="/about-us" element={ <About />} />
                <Route path="/reach-out" element={ <Contact />} />
                <Route path="/post/write" element={ <WritePost />} />
                <Route path="/search" element={ <SearchPage />} />
                <Route path="/blog/details/read/:slug" element={ <BlogDetails />} />
                
                <Route path="*" element={ <NotFound_ />} />
            </Routes>

            <section>
                <Footer />
            </section>
        </div>
        
    )
}

export default MainRoutes