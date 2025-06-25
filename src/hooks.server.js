import { redirect } from '@sveltejs/kit';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');
import { SECRET_JWT_KEY } from '$env/static/private';

const unprotectedRoutes = ['/', '/login'];

export function authCookie(cookies) {
    const token = cookies.get('user_token');
    if (!token) return undefined;

    try {
        const auth = jwt.verify(token, SECRET_JWT_KEY);
        return auth;
    } catch {
        return undefined;
    }
}

export const handle = async ({ event, resolve }) => {
    const { cookies, url } = event;
    const user = authCookie(cookies);

    event.locals.user = {
        isAuth: user ? true : false,
        user: user ? user.sub : ''
    };

    if (!user && !unprotectedRoutes.includes(url.pathname)) {
        throw redirect(303, '/login');
    }

    return resolve(event);
};
