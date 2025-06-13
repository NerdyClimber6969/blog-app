import { useEffect, useState, useCallback } from 'react';
import { useNotifications } from '../context/NotificationProvider.jsx';
import API from '../services/apiService.js';

function usePostsMetaData(searchParams) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { handleApiCall } = useNotifications();

    const handleFetchPosts = useCallback(async (params=null) => {
            setLoading(true);
            setData(null);
            setError(null);

            await handleApiCall(() => API.getPostsMetaData(params), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => {  
                    setData({ posts: response.posts, total: response.total });
                },
                onError: (error) => setError(error),
            });

            setLoading(false);
    }, []);

    useEffect(() => { 
        handleFetchPosts(searchParams);
    }, [searchParams]);

    return { 
        total: data?.total,
        posts: data?.posts, 
        loading, 
        error,
    }
};

export default usePostsMetaData;