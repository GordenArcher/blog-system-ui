export interface BaseUser {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    date_joined: string
}

export interface Profile {
    user: BaseUser
    address: string | null
    bio: string | null
    created_at: string
    date_of_birth: string | null
    facebook: string | null
    instagram: string | null
    is_verified: boolean
    last_active: string
    linkedin: string | null
    phone_number: string | null
    profile_cover_image: string | null
    profile_image: string | null
    twitter: string | null
    updated_at: string
    website: string | null
}

export interface PostData {
    title: string;
    content: string;
    content_markdown: boolean;
    excerpt: string;
    category: string;
    tags: string[];
    cover_image: File | null;
    is_published: boolean;
    seo_title: string;
    seo_description: string;
    canonical_url: string;
}


export interface Tag {
    id: string;
    name: string;
}