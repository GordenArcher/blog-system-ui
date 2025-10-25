const AuthRight = () => {
    return (
        <div className="hidden lg:flex w-full h-full rounded-2xl bg-linear-to-br from-[#7C4EE4] to-[#9b6ef7] p-12 items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
            <div className="relative z-10 max-w-lg text-white">
                <h2 className="text-4xl font-bold mb-6">
                    Welcome Back!
                </h2>

                <p className="text-lg text-white/90 mb-8">
                    Continue your journey with us. Access your account to keep writing and creating amazing content.
                </p>
                
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">Secure & Private</h3>
                            <p className="text-white/80 text-sm">Your data is encrypted and protected</p>
                        </div>
                    </div>
                
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">Lightning Fast</h3>
                            <p className="text-white/80 text-sm">Optimized performance for seamless writing</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">Fully Customizable</h3>
                            <p className="text-white/80 text-sm">Personalize your writing experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthRight;