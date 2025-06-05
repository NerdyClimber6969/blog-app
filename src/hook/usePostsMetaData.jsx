import { useEffect, useState, useCallback } from 'react';
import { useNotifications } from '../context/NotificationProvider.jsx';
import API from '../services/apiService.js';

function usePostsMetaData(searchParams) {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { handleApiCall } = useNotifications();

    const handleFetchPosts = useCallback(async (params=null) => {
            setData(null);
            setError(null);

            await handleApiCall(() => API.getPostsMetaData(params), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => {  
                    setData({ posts: response.posts, total: response.total });
                    setLoading(false)
                },
                onError: (error) => setError(error),
            });
    }, []);

    useEffect(() => { 
        setLoading(true);
        const timer = setTimeout(() => handleFetchPosts(searchParams), 2 * 1000);
        return () => clearTimeout(timer);
    }, [searchParams]);

    return { 
        total: data?.total,
        posts: data?.posts, 
        loading, 
        error,
    }
};

export default usePostsMetaData;