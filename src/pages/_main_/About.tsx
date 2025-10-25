import { Link } from "react-router-dom"
import PageHeader from "../../layout/shared/PageHeader"

const About = () => {

    return (
        <div className="max-w-7xl mx-auto max-md:p-4 py-10">
            <div className="w-full relative">
                <PageHeader 
                    head="About Us" 
                    title="Creative Blog Writing and Publishing Site" 
                    para="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment." 
                />

                {/* Hero Image Section */}
                <div className="py-12 relative">
                    <div className="w-full h-[454px] max-md:h-[198px] bg-[#7C4EE4] rounded-2xl flex items-center justify-center">
                        {/* <div className="text-center text-white">
                            <h2 className="text-4xl max-md:text-2xl font-bold mb-4">Where Stories Come to Life</h2>
                            <p className="text-xl max-md:text-lg opacity-90">Crafting compelling narratives that inspire and inform</p>
                        </div> */}
                    </div>
                </div>

                <div className="py-16 max-md:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl max-md:text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                We believe in the power of words to transform, educate, and inspire. Our mission is to create 
                                a platform where writers can share their unique perspectives and readers can discover 
                                content that resonates with their interests and passions.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Through careful curation and a commitment to quality, we've built a community of 
                                thinkers, creators, and lifelong learners who value depth and authenticity in digital content.
                            </p>
                        </div>
                        <div className="bg-linear-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">What Drives Us</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-3">✓</span>
                                        <span>Authentic storytelling that connects with readers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-3">✓</span>
                                        <span>Diverse voices and perspectives</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-3">✓</span>
                                        <span>Innovation in content creation and delivery</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-3">✓</span>
                                        <span>Building a sustainable future for digital publishing</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-16 max-w-2xl m-auto max-md:py-8 bg-blue-500 rounded-2xl text-center text-white">
                    <h2 className="text-3xl max-md:text-2xl font-bold mb-4">
                        Join Our Community
                    </h2>
                    <p className="text-xl max-md:text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Be part of our growing community of readers and writers
                    </p>
                    <div className="space-x-4">
                        <Link to={"/blog"} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                            Start Reading
                        </Link>

                        <Link to={"/blog/write"} className="border border-white text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
                            Write for Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About