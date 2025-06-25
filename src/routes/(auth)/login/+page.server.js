import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const userName = data.get('userName');
        const password = data.get('password');
        const res = await fetch('http://localhost:5126/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        });

        let token = await res.json();
        cookies.set('user_token', token.response, { path: '/', maxAge: 60 * 60 * 24 });
        throw redirect(303, '/');
    }
};
