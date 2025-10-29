import { Home, Mail, Phone, type LucideIcon } from "lucide-react"
import PageHeader from "../../layout/shared/PageHeader"

interface ContactGrid{
    id: number;
    icon: LucideIcon;
    head: string;
    desc: string;
}

const Contact = () => {

    const Grid: ContactGrid [] = [
        {
            id: 1,
            icon: Home,
            head: "Office",
            desc:"Accra, Ghana"
        },
        {
            id: 2,
            icon: Mail,
            head: "Email",
            desc:"contact@journIQ.com"
        },
        {
            id: 3,
            icon: Phone,
            head: "Phone",
            desc:"(0) 123 456 789"
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PageHeader 
                    title="Get in Touch" 
                    para="Contact us to publish your content and show ads to our website and get a good reach." 
                />

                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {Grid.map((item) => (
                            <div 
                                key={item.id} 
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 flex items-center justify-center bg-[#7C4EE4]  rounded-2xl text-white transition-transform duration-300 mb-4">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.head}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <section className="py-8">
                    <div className=" max-w-4xl mx-auto">
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                            <p className="text-gray-600 mb-8">We'll get back to you as soon as possible</p>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Full Name *
                                        </label>
                                        <input 
                                            id="name" 
                                            type="text" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7C4EE4] focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email Address *
                                        </label>
                                        <input 
                                            id="email" 
                                            type="email" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7C4EE4] focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input 
                                            id="phone" 
                                            type="tel" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7C4EE4] focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                            Subject *
                                        </label>
                                        <input 
                                            id="subject" 
                                            type="text" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7C4EE4] focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none"
                                            placeholder="What's this about?"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message *
                                    </label>
                                    <textarea 
                                        id="message" 
                                        rows={6} 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#7C4EE4] focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                    <div className="text-center">
                                        <button 
                                        type="submit" 
                                        className="w-auto text-center px-8 py-4 bg-[#7C4EE4] cursor-pointer text-white font-semibold rounded-xl hover:shadow-lg transform transition-all duration-200 focus:ring-2 focus:ring-purple-100 focus:ring-offset-2"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100 h-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Location</h3>
                                <div className="rounded-xl overflow-hidden bg-gray-200 h-96 lg:h-full min-h-[300px] relative">
                                    <div className="absolute inset-0 bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                        <div className="text-center p-6">
                                            <div className="w-16 h-16 bg-[#7C4EE4] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Home className="w-8 h-8 text-white" />
                                            </div>
                                            <h4 className="font-semibold text-gray-800 mb-2">Accra, Ghana</h4>
                                            <p className="text-gray-600 text-sm">Our headquarters</p>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-sm">
                                        <span className="text-sm font-medium text-gray-700">🌍 Interactive Map</span>
                                    </div>
                                </div>
                                
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm text-gray-600">
                                        <strong>Office Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Visit our headquarters in Accra, Ghana. We'd love to meet you!
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Contact