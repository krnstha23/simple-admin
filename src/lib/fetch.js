import { SERVER_NAME } from '$env/static/private';

export async function fetchData(endpoint, fetchFn, cookies, body) {
    endpoint = SERVER_NAME + endpoint;
    const token = 'Bearer ' + cookies.get('user_token');
    const res = await fetch(`${endpoint}`, {
        method: `${fetchFn}`,
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: body
    });

    if (!res.ok) {
        // Optionally read text for debugging
        const errorText = await res.text();
        console.error('Fetch error:', res.status, errorText);
        throw new Error(`Fetch failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
}
