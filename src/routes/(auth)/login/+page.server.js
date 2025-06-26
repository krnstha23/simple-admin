import { redirect } from '@sveltejs/kit';
import { login } from '$lib/fetch';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const userName = data.get('userName');
        if (userName.length < 1) {
            return {
                type: 'error',
                error: {
                    message: 'Username cannot be null'
                },
                status: 400
            };
        }
        const password = data.get('password');
        if (userName.length < 1) {
            return {
                type: 'error',
                error: {
                    message: 'Password cannot be null'
                },
                status: 400
            };
        }
        const body = JSON.stringify({
            userName: userName,
            password: password
        });

        try {
            const response = await login(body, cookies);

            if (!response.success) {
                return {
                    type: 'error',
                    error: {
                        message: response.errors?.join(', ') || 'Invalid credentials'
                    },
                    status: 400
                };
            }

            throw redirect(303, '/');
        } catch (err) {
            if (
                err &&
                typeof err === 'object' &&
                'status' in err &&
                err.status >= 300 &&
                err.status <= 308 &&
                'location' in err
            ) {
                throw err;
            }

            return {
                status: err.status || 500,
                type: 'error',
                error: {
                    message: err.message || 'An unexpected error occurred'
                }
            };
        }
    }
};
