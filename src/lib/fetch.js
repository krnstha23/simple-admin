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
        const errorText = await res.text();
        console.error('Fetch error:', res.status, errorText);
        throw new Error(`Fetch failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
}

export async function login(body, cookies) {
    const endpoint = SERVER_NAME + '/auth/login';

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: body
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Login error:', res.status, errorText);
        throw new Error(`Login failed with status ${res.status}`);
    }

    let token = await res.json();
    cookies.set('user_token', token.response, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24
    });
    return token;
}
