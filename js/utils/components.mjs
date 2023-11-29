export const userId = localStorage.getItem('name');
export const token = localStorage.getItem('accessToken');

export function getQueryString() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const postId = params.get('id');
    return postId;
};