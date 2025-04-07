function createAPIService() {
    const BASE_URL = 'http://localhost:3000';

    async function request(endpoint, method='GET', data=null, requiresAuth=false) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (requiresAuth) {
            const token = localStorage.getItem('accessToken');
            headers['Authorization'] = `Bearer ${token}`;
        };
          
        const options = {
            method,
            headers
        };
          
        if (data) {
            options.body = JSON.stringify(data);
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, options);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('API request failed:', error);

            return {
                success: false,
                errors: [{ message: 'Network or server error occurred' }]
            };
        };
    };

    return {
        signUp: (formData) => request('/sign-up', 'POST', formData),
        login: (credentials) => request('/login', 'POST', credentials),
        getProfile: () => request('/profiles', 'GET', null, true),
        getPosts: (url) => request(url, 'GET', null, true),
    };
};

const API = createAPIService();

export default API;