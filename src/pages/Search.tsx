// src/pages/SearchPage.tsx
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Search, Filter, Calendar, User, Eye, Tag, X } from 'lucide-react'
import { axiosClient } from '../utils/axiosClient'
import PostCard from '../components/ui/shared/PostCard'

const SearchPage = () => {
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filters, setFilters] = useState({
        category: '',
        tag: '',
        sort: 'latest'
    })
    
    const location = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const query = params.get('q') || ''
        setSearchQuery(query)
        if (query) {
        performSearch(query, filters)
        }
    }, [location.search, filters])

    const performSearch = async (query: string, filters: any) => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                search: query,
                page: '1',
                page_size: '12',
                sort: filters.sort,
                ...(filters.category && { category: filters.category }),
                ...(filters.tag && { tag: filters.tag })
            })

        const response = await axiosClient.get(`/posts/search/?${params}`)
        const data = await response.data
        setResults(data.data?.posts || [])

        } catch (error) {
            console.error('Search error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for posts, authors, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        // Update URL and trigger search
                        window.history.pushState({}, '', `?q=${encodeURIComponent(searchQuery)}`)
                        performSearch(searchQuery, filters)
                    }
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#7C4EE4] focus:ring-2 focus:ring-[#7C4EE4]/20 outline-none transition-all duration-200"
                />
                </div>
                <button 
                onClick={() => performSearch(searchQuery, filters)}
                className="px-6 py-3 bg-[#7C4EE4] text-white rounded-xl hover:bg-[#7C4EE4]/90 transition-colors"
                >
                Search
                </button>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
                <select 
                value={filters.sort}
                onChange={(e) => setFilters(prev => ({...prev, sort: e.target.value}))}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:border-[#7C4EE4] outline-none"
                >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
                </select>
                
                {/* Add category and tag filters here */}
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map((post) => (
                <PostCard post={post} key={post.id} />
            ))}
            </div>

            {/* Empty State */}
            {!loading && results.length === 0 && searchQuery && (
            <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try different keywords or filters</p>
            </div>
            )}

            {/* Loading State */}
            {loading && (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C4EE4]"></div>
            </div>
            )}
        </div>
        </div>
    )
}

export default SearchPage