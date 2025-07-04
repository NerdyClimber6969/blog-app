export function calculateNumberOfDay(date1, date2) {
    const numberOfDay = Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
    return numberOfDay < 0 ? 0 : numberOfDay; 
};

export function updateSearchParams(searchParams, updates) {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
            newSearchParams.delete(key);
        } else {
            newSearchParams.set(key, value);
        };
    });
    
    return newSearchParams;
};