import { create } from "zustand"
import type { Post } from "../types/posts"
import { Get_all_posts, Get_Hero, Get_post_by_slug, Get_user_posts } from "../services/api/api"

interface PostStore {
    posts: Post [] 
    userposts: Post []
    Slugposts: Post | null
    Heropost: Post | null
    loading: boolean
    loading_slug_post: boolean
    error_slug_post: string | null
    error: string | null
    loading_user_post: boolean
    error_user_posts: string | null
    loading_hero_post: boolean
    error_hero_posts: string | null
    fetchPost: () => Promise<void>
    fetchPostBySlug: (slug: string) => Promise<void>
    clearPost: () => void
    fetchUserPosts: () => Promise<void>;
    fetchHero: () => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    loading: false,
    error: null,

    loading_slug_post: false,
    error_slug_post: null,
    Slugposts: null,

    userposts: [],
    loading_user_post: false,
    error_user_posts: null,

    Heropost: null,
    loading_hero_post: false,
    error_hero_posts: null,

    fetchPost: async () => {
        set({ loading: true, error: null })
        try {
            const res = await Get_all_posts()
            set({ posts: res.data, loading: false })
        } catch (err: any) {
            set({ error: err.message || "Failed to fetch post", loading: false })
        }finally{
            set({ loading: false })
        }
    },

    fetchPostBySlug: async (slug) => {
        set({ loading_slug_post: true, error: null })
        try {
            const res = await Get_post_by_slug(slug)
            set({ Slugposts: res.data, loading_slug_post: false })
        } catch (err: any) {
            set({ error_slug_post: err.message || "Failed to fetch post", loading_slug_post: false })
        }finally{
            set({ loading_slug_post: false })
        }
    },

    fetchUserPosts: async () => {
        set({ loading_user_post: true, error_user_posts: null })
        try {
            const res = await Get_user_posts();
            if (res) set({ userposts: res });
        } catch (err: any) {
            set({ error_user_posts: err?.message || "Failed to get your posts" })
        }finally{
            set({ loading_user_post: false })
        }
        
    },

    fetchHero: async () => {
        set({ loading_hero_post: true, error_hero_posts: null})
        try {
            const res = await Get_Hero();
            if (res) set({ Heropost: res.data });
        } catch (err: any) {
            set({ error_hero_posts: err?.message || "Failed to get hero posts" })
        }finally{
            set({ loading_hero_post: false })
        }
    },

    clearPost: () => set({ posts: [] }),
}))
