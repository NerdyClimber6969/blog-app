export function isExpired(exp) {
    if (!exp) {
        return null;
    };

    const currentTime = Math.floor(Date.now()/1000);
    return exp < currentTime;
};

export function decodeToken(token) {
    if (!token) {
        return null;
    };

    const splited = token.split('.');
    const header = JSON.parse(atob(splited[0]));
    const payload = JSON.parse(atob(splited[1]));
    return { header, payload };
};
