import type { Profile } from "./shared"


export interface Category {
    id: number
    name: string
}

export interface Post {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    content_markdown: boolean
    cover_image: string | null
    seo_title: string
    seo_description: string
    canonical_url: string | null
    category: Category
    author: Profile
    total_likes: number
    views: number
    is_published: boolean
    created_at: string
    updated_at: string
    tags: string[]
}



// types/post.ts
export interface AuthorUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

export interface Author {
  user: AuthorUser;
  profile_image: string | null;
  is_verified: boolean;
}