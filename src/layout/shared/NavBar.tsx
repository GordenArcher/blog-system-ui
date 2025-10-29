import { Link } from "react-router-dom"
import Logo from "../../components/ui/shared/Logo"
import { Menu, Search, X,  User, Eye, Calendar } from "lucide-react"
import useAuthStore from "../../stores/useAuthStore"
import { useState, useEffect, useRef } from "react"
import { axiosClient } from "../../utils/axiosClient"
import { formatDate } from "../../utils/formatDate"

interface Author {
    user: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
    };
    profile_image: string | null;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: Author;
    category: Category;
    created_at: string;
    updated_at: string;
    cover_image: string | null;
    views: number;
    total_likes: number;
    is_published: boolean;
    tags: string[];
}

interface ApiResponse {
    results: Post[];
    count: number;
    next: string | null;
    previous: string | null;
}

const NavBar = () => {
    const { isAuthenticated } = useAuthStore()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            closeSearch()
        }
        }

        if (isSearchOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        // Focus input when search opens
        setTimeout(() => inputRef.current?.focus(), 100)
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSearchOpen])

    // Debounced search function
    useEffect(() => {
        if (!isSearchOpen) return

        const delayDebounceFn = setTimeout(() => {
        if (searchQuery.trim().length > 0) {
            performSearch(searchQuery)
        } else {
            setSearchResults([])
            setError(null)
        }
        }, 500) // 500ms debounce

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery, isSearchOpen])

    const performSearch = async (query: string) => {
        if (!query.trim()) {
        setSearchResults([])
        return
        }

        setIsLoading(true)
        setError(null)

        try {
            const params = new URLSearchParams({
                search: query,
                page: '1',
                page_size: '10',
                sort: 'latest'
            })

            const response = await axiosClient.get(`/posts/search/?${params}`)
            

            const data: ApiResponse = await response.data
            setSearchResults(data.results || [])
        } catch (err) {
            console.error('Search error:', err)
            setError('Failed to search posts. Please try again.')
            setSearchResults([])
        } finally {
            setIsLoading(false)
        }
    }

    const closeSearch = () => {
        setIsSearchOpen(false)
        setSearchQuery("")
        setSearchResults([])
        setError(null)
    }

    const handleResultClick = () => {
        closeSearch()
    }

    const getAuthorName = (author: Author) => {
        if (author.user.first_name && author.user.last_name) {
        return `${author.user.first_name} ${author.user.last_name}`
        }
        return author.user.username
    }

    return (
        <div className="w-full relative">
        <section className="w-full h-[70.37px] bg-white border-b border-gray-100">
            <div className="max-w-7xl m-auto h-full p-4 flex">
            <div className="w-full flex items-center justify-between gap-6">
                <div className="p-1 relative">
                <Logo />
                </div>

                <div className="px-3 max-md:hidden">
                <ul className="flex items-center gap-5">
                    <li className="px-4 py-2">
                    <Link to={"/blog"} className="hover:text-[#7C4EE4] font-normal text-gray-700 font-sans text-[16px] transition-colors duration-200">Blog</Link>
                    </li>

                    <li className="px-4 py-2">
                    <Link to={"/about-us"} className="hover:text-[#7C4EE4] font-normal text-gray-700 font-sans text-[16px] transition-colors duration-200">About</Link>
                    </li>

                    <li className="px-4 py-2">
                    <button 
                        title="search" 
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="hover:text-[#7C4EE4] cursor-pointer font-normal text-gray-700 font-sans text-[16px]" />
                    </button>
                    </li>

                    <li className="px-4 py-2">
                    <Link 
                        to={isAuthenticated ? "/post/write" : "/auth/login"} 
                        className="px-6 py-3 rounded duration-150 ease-linear bg-[#7C4EE4] hover:bg-[#7C4EE4]/90 font-normal text-white font-sans text-[16px] transition-all hover:shadow-lg"
                    >
                        {isAuthenticated ? "Write" : "Login / Register"}
                    </Link>
                    </li>
                </ul>
                </div>

                <div className="hidden max-md:flex px-4">
                <button title="open menu" className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <Menu color="#7C4EE4" size={25} />
                </button>
                </div>
            </div>
            </div>
        </section>

        {/* Search Overlay */}
        {isSearchOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
            <div 
                ref={searchRef}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-in fade-in-90 slide-in-from-top-5 duration-300"
            >
                {/* Search Header */}
                <div className="flex items-center gap-4 p-6 border-b border-gray-100">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for posts, authors, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#7C4EE4] focus:ring-2 focus:ring-[#7C4EE4]/20 outline-none transition-all duration-200"
                    />
                </div>
                <button
                    onClick={closeSearch}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>
                </div>

                {/* Search Results */}
                <div className="max-h-96 overflow-y-auto">
                {error ? (
                    <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <X className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-red-600 mb-2">Search Error</p>
                    <p className="text-gray-500 text-sm">{error}</p>
                    </div>
                ) : isLoading ? (
                    <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C4EE4] mx-auto"></div>
                    <p className="text-gray-500 mt-2">Searching posts...</p>
                    </div>
                ) : searchQuery && searchResults.length === 0 ? (
                    <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No posts found for "{searchQuery}"</p>
                    <p className="text-gray-400 text-sm mt-1">Try different keywords</p>
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="p-2">
                    <div className="px-4 py-2">
                        <p className="text-sm text-gray-500">
                        Found {searchResults.length} post{searchResults.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    {searchResults.map((post) => (
                        <Link
                        key={post.id}
                        to={`/blog/details/read/${post.slug}`}
                        onClick={handleResultClick}
                        className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200 group"
                        >
                        <div className="flex items-start gap-4">
                            {post.cover_image && (
                            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                <img 
                                src={post.cover_image} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                            )}
                            <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 group-hover:text-[#7C4EE4] transition-colors duration-200 line-clamp-2 mb-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                                <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{getAuthorName(post.author)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(post.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{post.views} views</span>
                                </div>
                                {post.tags && post.tags.length > 0 && (
                                <div className="flex items-center gap-1">
                                    {post.tags.slice(0, 2).map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                                    >
                                        {tag}
                                    </span>
                                    ))}
                                    {post.tags.length > 2 && (
                                    <span className="text-gray-400">+{post.tags.length - 2}</span>
                                    )}
                                </div>
                                )}
                                <span className="px-2 py-1 bg-[#7C4EE4]/10 text-[#7C4EE4] rounded-full text-xs">
                                {post.category.name}
                                </span>
                            </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                    </div>
                ) : (
                    <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Search for posts, authors, or categories</p>
                    <p className="text-gray-400 text-sm mt-1">Start typing to see results</p>
                    </div>
                )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Press Esc to close</span>
                    <span>↑↓ to navigate, Enter to select</span>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    )
}

export default NavBar