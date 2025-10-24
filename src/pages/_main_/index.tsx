import Hero from "../../layout/main/Hero"
import NavBar from "../../layout/shared/NavBar"

const Index = () => {
    return (
        <div className="w-full h-full relative space-y-8">
            <NavBar />

            <section className="w-full h-full px-3 py-9 bg-[#7C4EE4]">
                <Hero />
            </section>
        </div>
    )
}

export default Index