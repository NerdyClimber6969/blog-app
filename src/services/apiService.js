class ApiError extends Error {
    constructor({ message, name, statusCode, timeStamp, details=null }) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.timeStamp = timeStamp;
        this.details = details;
    };
};

function createAPIService() {
    const BASE_URL = 'http://localhost:3000';

    async function request(endpoint, method='GET', data=null, includeCredentials=false) {
        const headers = {
            'Content-Type': 'application/json'
        };

        const options = {
            method,
            headers
        };

        if (includeCredentials) {
            options.credentials = 'include';
        };
          
        if (data) {
            options.body = JSON.stringify(data);
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, options);
            const json = await response.json();

            if (!response.ok) {
                throw new ApiError(json.error);
            };

            return json;
        } catch (error) {
            console.error('API request failed:', error.message);
            throw error;
        };
    };

    return {
        signUp: (formData) => request('/authen/sign-up', 'POST', formData),
        login: (username, password) => request('/authen/login', 'POST', { username, password }, true),
        logout: () => request('/authen/logout', 'POST', null, true),
        verify: () =>request('/authen/verify', 'GET', null, true),
        getPosts: (searchParams) => request(`/posts${searchParams ? `?${searchParams.toString()}` : ''}`, 'GET', null, true),
        getPost: (postId) => request(`/posts/${postId}`, 'GET', null, true),
        addComment: (postId, content) => request(`/posts/${postId}/comments`, 'POST', { content }, true)
    };
};

const API = createAPIService();

export default API;