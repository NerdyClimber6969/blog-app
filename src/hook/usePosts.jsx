import { useEffect, useState } from 'react';
import { useNotifications } from '../context/NotificationProvider.jsx';

function usePosts(queryConfig=null) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setNotifications } = useNotifications();

    let url;
    if (!queryConfig) {
        url = 'http://localhost:3000/posts';
    } else {
        const queryString = [];
        for (const [key, value] of Object.entries(queryConfig)) {
            queryString.push(`${key}=${value}`);
        };

        url = 'http://localhost:3000/posts?' + queryString.join('&');
    };

    useEffect(() => {
        const handleFetchPosts = async() => {
            const token = localStorage.getItem('accessToken');
            
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const json = await response.json();
        
                if (!json.success) {
                    return setNotifications(json.errors.map((error) => ({
                        message: error.message,
                        id: 1,
                        isClosing: false,
                        type: 'error'
                    })));
                };

                setLoading(false);
                setPosts(json.posts);
            } catch (error) {
                console.error(error);
                setNotifications([{
                    message: "Failed to fetch posts",
                    id: 1,
                    isClosing: false,
                    type: 'error'
                }]);
            }
        };

        const timer = setTimeout(() => handleFetchPosts(), 2 * 1000);
        return () => clearTimeout(timer);
    }, []);

    return { data: posts, loading }
};

export default usePosts;