import { toast } from "react-toastify"
import type { Login, Register } from "../../types/auth"
import { axiosClient } from "../../utils/axiosClient"
import type { PostData } from "../../types/shared"

const Get_auth_state = async () => {

    const response = await axiosClient.get("/auth/state/")

    return response.data
}

export default Get_auth_state


export const LoginUser = async (formData: Login ) => {

    if(!formData.username.trim() || !formData.password.trim()) return

    const response = await axiosClient.post("/auth/login/", formData)

    return response.data
}


export const RegisterUser = async (formData: Register ) => {

    if(!formData.username.trim() || !formData.email.trim()  || !formData.first_name.trim()  || !formData.last_name.trim() || !formData.password.trim() || !formData.confirm_password.trim()) return toast.error("All fields are required")

    const response = await axiosClient.post("/auth/register/", formData)

    return response.data
}


export const Get_user = async () => {

    const response = await axiosClient.get("/accounts/profile/")

    return response.data
}

export const Get_all_posts = async () => {

    const response = await axiosClient.get("/posts/all/")

    return response.data
}

export const Get_user_posts = async () => {

    const response = await axiosClient.get("/posts/my-posts/")

    return response.data
}

export const Get_post_by_slug = async (slug:string) => {

    const response = await axiosClient.get(`/posts/slug/${slug}/`)

    return response.data
}

export const Post = async (formData: PostData) => {

    console.log(formData.cover_image)
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("content", formData.content);
    formdata.append("content_markdown", formData.content_markdown ? "True" : "False");
    formdata.append("excerpt", formData.excerpt);
    formdata.append("category", formData.category || "");
    (formData.tags || []).forEach(tag => {
        formdata.append("tags", tag)
    })
    formdata.append("is_published", formData.is_published ? "True" : "False");
    formdata.append("seo_title", formData.seo_title);
    formdata.append("seo_description", formData.seo_description);
    formdata.append("canonical_url", formData.canonical_url || "");

    if (formData.cover_image) {
        formdata.append("cover_image", formData.cover_image);
    }

    console.log(formdata)


    const response = await axiosClient.post("/posts/create/", formdata, { headers: {"Content-Type": "multipart/form-data"}})

    return response.data
}

export const Get_Hero = async () => {

    const response = await axiosClient.get("/posts/hero/")

    return response.data
}