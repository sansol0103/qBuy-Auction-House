export async function dataFetch(url, data) {
    const response = await fetch(url, data);
    const result = await response.json();
    
    return result;
};