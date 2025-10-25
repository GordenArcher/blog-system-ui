import OurRecentPost from "../../components/OurRecentPost"
import PopularPost from "../../components/PopularPost"
import ReadMoreButton from "../../components/ui/shared/ReadMoreButton"
import Hero from "../../layout/main/Hero"
import Footer from "../../layout/shared/Footer"
import NavBar from "../../layout/shared/NavBar"

const Index = () => {
    return (
        <div className="w-full h-full relative space-y-8">
            <NavBar />

            <section className="w-full h-full px-3 py-9 bg-[#7C4EE4]">
                <Hero />
            </section>

            <div className="max-w-7xl m-auto max-md:p-2">
                <div className="py-2 mb-60 max-md:mb-2 w-full relative">
                    <div className="relative max-md:flex flex-col gap-3.5 max-md:border max-md:bg-white rounded-2xl p-2 border-gray-500 shadow-none max-md:shadow-sm">
                        <div className="w-full h-[576px] max-md:h-[200px] bg-[#CCE9FF] rounded relative"></div>

                        <div className="absolute max-md:relative max-md:bottom-0 max-md:w-full -bottom-35 right-0 bg-white rounded-lg w-[70%] py-5 px-3 max-md:shadow-none shadow max-lg:w-[50%]">
                            <div className="space-y-6 relative">
                                <div className="flex items-center gap-2.5">
                                    <h3 className="font-semibold text-[#333333] text-[14px]">Development</h3>
                                    <span className="font-normal text-gray-500 text-[12px]">14 May, 2004</span>
                                </div>

                                <div className="py-4">
                                    <h1 className="text-6xl max-md:text-4xl font-bold line-clamp-3 text-[#7C4EE4]">How to make a Game look more attractive with New VR & AI Technology</h1>
                                </div>

                                <div className="font-sans mb-5 text-[16px]">
                                    <span className="font-normal">Google has been investing in AI for many years and bringing its benefits to individuals, businesses and communities. Whether it’s publishing state-of-the-art research, building helpful products or developing tools and resources that enable others, we’re committed to making AI accessible to everyone.</span>
                                </div>
                                

                                <div className="py-4">
                                    <ReadMoreButton to="#" text=""  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="py-9">
                    <OurRecentPost />
                </section>

                <section className="relative py-6">
                    <PopularPost />
                </section>
            </div>

            <section>
                <Footer />
            </section>
                
        </div>
    )
}

export default Index