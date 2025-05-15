import { useEffect, useState, useCallback } from 'react';
import { useNotifications } from '../context/NotificationProvider.jsx';
import API from '../services/apiService.js';

function usePostsMeta(searchParams) {
    const [postsMeta, setPostsMeta] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleApiCall } = useNotifications();

    const handleFetchPosts = useCallback(async (params=null) => {
        try {
            await handleApiCall(() => API.getPosts(params), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => {  
                    setPostsMeta(response);
                    return;
                }
            });
        } finally {
            setLoading(false);
        };
    }, []);

    useEffect(() => { 
        setLoading(true);
        const timer = setTimeout(() => handleFetchPosts(searchParams), 2 * 1000);
        return () => clearTimeout(timer);
    }, [searchParams]);

    return { 
        totalPages: postsMeta.totalPages,
        posts: postsMeta.posts, 
        loading, 
        setLoading, 
        handleFetchPosts 
    }
};

export default usePostsMeta;