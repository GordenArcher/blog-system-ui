import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReadMoreButton from "../../components/ui/shared/ReadMoreButton";
import { usePostStore } from "../../stores/usePostStore";

const Hero = () => {
    const { fetchHero, Heropost, loading_hero_post } = usePostStore();

    console.log(loading_hero_post)
    useEffect(() => {
        fetchHero();
    }, [fetchHero]);

    if (loading_hero_post) {
        return (
            <div className="max-w-7xl m-auto p-4 h-full">
                <div className="w-full relative mb-7">
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2.5">
                        <div className="flex items-start flex-col gap-4">
                            <div className="h-8 w-48 bg-white/20 rounded animate-pulse mb-8 max-md:mb-3"></div>
                            
                            <div className="space-y-10 max-md:space-y-4 py-8 relative w-full">
                                <div className="py-2">
                                    <div className="h-16 w-full bg-white/20 rounded animate-pulse mb-4"></div>
                                    <div className="h-16 w-3/4 bg-white/20 rounded animate-pulse"></div>
                                </div>
                                
                                <div className="py-3 space-y-2">
                                    <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
                                    <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
                                    <div className="h-4 w-2/3 bg-white/20 rounded animate-pulse"></div>
                                </div>
                                
                                <div className="py-1">
                                    <div className="h-12 w-32 bg-white/20 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-2">
                            <div className="w-full h-120 max-md:h-70 bg-white/10 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!Heropost) {
        return (
            <div className="max-w-7xl m-auto p-4 h-full">
                <div className="w-full relative mb-7">
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2.5">
                        <div className="flex items-start flex-col gap-4">
                            <h3 className="mb-8 max-md:mb-3 text-white font-black leading-0">
                                Featured Posts
                            </h3>
                            
                            <div className="space-y-10 max-md:space-y-4 py-8 relative">
                                <div className="py-2">
                                    <h1 className="text-4xl text-white/60 font-medium">
                                        No featured posts available
                                    </h1>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-2">
                            <div className="w-full h-120 max-md:h-70 bg-white/10 rounded flex items-center justify-center">
                                <span className="text-white/40 text-lg">No image</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Get the first hero post
    const featuredPost = Heropost;

    // Truncate excerpt to a reasonable length
    const truncateText = (text: string, maxLength = 200) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + "...";
    };

    const getCleanExcerpt = (excerpt: string) => {
        if (!excerpt) return "";
        return excerpt
            .replace(/[#*`_[\]()]/g, "") // Remove markdown characters
            .replace(/!\[.*?\]\(.*?\)/g, "") // Remove image syntax
            .replace(/\r\n/g, " ") // Replace line breaks with spaces
            .trim();
    };

    const cleanExcerpt = getCleanExcerpt(featuredPost.excerpt);

    return (
        <div className="max-w-7xl m-auto p-4 h-full">
            <div className="w-full relative mb-7">
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2.5">
                    <div className="flex items-start flex-col gap-4">
                        <h3 className="mb-8 max-md:mb-3 text-white font-black leading-0">
                            Featured Posts
                        </h3>
                        
                        <div className="space-y-10 max-md:space-y-4 py-8 relative">
                            <div className="py-2">
                                 <Link to={`/blog/details/read/${featuredPost.slug}`} className="text-6xl max-lg:text-5xl wrap-break-word leading-normal text-white font-extrabold">
                                    {featuredPost.title}
                                </Link>
                            </div>
                            
                            <div className="py-3">
                                <span className="text-[16px] font-normal text-white line-clamp-4">
                                    {truncateText(cleanExcerpt, 250)}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                <div className="flex items-center gap-2">
                                    {featuredPost.author?.profile_image ? (
                                        <img 
                                            src={featuredPost.author.profile_image} 
                                            alt={featuredPost.author.user.username}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">
                                                {featuredPost.author?.user.username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <span className="text-white/90 text-sm font-medium">
                                        {featuredPost.author?.user.username}
                                    </span>
                                </div>

                                {featuredPost.category && (
                                    <>
                                        <span className="text-white/40">•</span>
                                        <span className="text-white/80 text-sm">
                                            {featuredPost.category.name}
                                        </span>
                                    </>
                                )}

                                <span className="text-white/40">•</span>
                                <span className="text-white/80 text-sm">
                                    {featuredPost.views} views
                                </span>
                            </div>
                            
                            <div className="py-1">
                                <ReadMoreButton 
                                    to={`/blog/details/read/${featuredPost.slug}`} 
                                    text="Read Full Article" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-2">
                        <Link to={`/blog/details/read/${featuredPost.slug}`}>
                            {featuredPost.cover_image ? (
                                <div 
                                    className="w-full h-120 max-md:h-70 rounded overflow-hidden bg-cover bg-center transition-transform cursor-pointer"
                                    style={{
                                        backgroundImage: `url(${featuredPost.cover_image.startsWith('http') 
                                            ? featuredPost.cover_image 
                                            : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${featuredPost.cover_image}`
                                        })`
                                    }}
                                >
                                    <div className="w-full h-full bg-linear-to-t from-black/30 to-transparent"></div>
                                </div>
                            ) : (
                                <div className="w-full h-120 max-md:h-70 bg-linear-to-br from-[#7C4EE4]/20 to-[#9b6ef7]/20 rounded flex items-center justify-center">
                                    <span className="text-white/40 text-lg">No cover image</span>
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;