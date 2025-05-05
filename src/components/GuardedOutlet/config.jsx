const config = {
    '/login': (isAuthenticated) => (isAuthenticated ? '/' : null),
    '/sign-up': (isAuthenticated) => (isAuthenticated ? '/' : null)
};

export default config;