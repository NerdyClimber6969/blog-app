import { useEffect, useState } from 'react';
import { useNotifications } from '../context/NotificationProvider.jsx';
import API from '../services/apiService.js';

function usePosts(queryConfig=null) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleSetNotifications, createNotification } = useNotifications();

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
            const json = await API.getPosts(url);
            
            if (!json.success) {
                return handleSetNotifications(json.errors.map((error) => 
                    createNotification(error.msg || error.message, 'error')
                ));
            };

            setLoading(false);
            setPosts(json.posts);
        };

        const timer = setTimeout(() => handleFetchPosts(), 2 * 1000);
        return () => clearTimeout(timer);
    }, []);

    return { data: posts, loading }
};

export default usePosts;