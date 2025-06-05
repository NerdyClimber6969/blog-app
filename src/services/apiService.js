class ApiError extends Error {
    constructor({ message, name, statusCode, timestamp, details=null }) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.timestamp = timestamp;
        this.details = details;
    };

    toJSON() {
        const result = {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            timestamp: this.timestamp
        };
      
        if (this.details !== null) {
            result.details = this.details;
        };
      
        return result;
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
        getPostsMetaData: (searchParams) => request(`/posts${searchParams ? `?${searchParams.toString()}` : ''}`, 'GET', null, true),
        getPost: (postId) => request(`/posts/${postId}`, 'GET', null, true),
        addComment: (postId, content) => request(`/posts/${postId}/comments`, 'POST', { content }, true)
    };
};

const API = createAPIService();

export default API;