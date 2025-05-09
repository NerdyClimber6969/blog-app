import { useEffect, useState } from 'react';
import { useNotifications } from '../context/NotificationProvider.jsx';
import API from '../services/apiService.js';

function usePosts(queryConfig=null) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleApiCall } = useNotifications();

    let url;
    if (!queryConfig) {
        url = '/posts';
    } else {
        const queryString = [];
        for (const [key, value] of Object.entries(queryConfig)) {
            queryString.push(`${key}=${value}`);
        };

        url = '/posts?' + queryString.join('&');
    };

    useEffect(() => {
        const handleFetchPosts = async() => {
            await handleApiCall(() => API.getPosts(url), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => {
                    setLoading(false);
                    setPosts(response.posts);
                    return;
                }
            });
        };

        const timer = setTimeout(() => handleFetchPosts(), 2 * 1000);
        return () => clearTimeout(timer);
    }, []);

    return { data: posts, loading }
};

export default usePosts;