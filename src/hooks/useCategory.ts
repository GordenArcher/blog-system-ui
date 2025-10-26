import { useState, useEffect } from "react";
import type { Category } from "../types/posts";
import { axiosClient } from "../utils/axiosClient";


const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get<{ data: Category[] }>("/posts/category/");
                setCategories(response.data.data);
            } catch (err: unknown) {
                setError("Failed to fetch categories");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export default useCategories;
