import { create } from "zustand"
import type { Post } from "../types/posts"
import { Get_all_posts, Get_post_by_slug } from "../services/api/api"

interface PostStore {
    posts: Post | null
    Slugposts: Post | null
    loading: boolean
    loading_slug_post: boolean
    error_slug_post: string | null
    error: string | null
    fetchPost: () => Promise<void>
    fetchPostBySlug: (slug: string) => Promise<void>
    clearPost: () => void
}

export const usePostStore = create<PostStore>((set) => ({
    posts: null,
    loading: false,
    error: null,

    loading_slug_post: false,
    error_slug_post: null,
    Slugposts: null,

    fetchPost: async () => {
        set({ loading: true, error: null })
        try {
            const res = await Get_all_posts()
            set({ posts: res.data, loading: false })
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch post", loading: false })
        }
    },

    fetchPostBySlug: async (slug) => {
        set({ loading_slug_post: true, error: null })
        try {
            const res = await Get_post_by_slug(slug)
            set({ Slugposts: res.data, loading_slug_post: false })
        } catch (err: any) {
            set({ error_slug_post: err.message || "Failed to fetch post", loading_slug_post: false })
        }
    },

    clearPost: () => set({ posts: null }),
}))
