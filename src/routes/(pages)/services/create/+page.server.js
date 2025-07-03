import { redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const title = data.get('title');
        if (title.length < 1) {
            return {
                type: 'error',
                error: {
                    message: 'Title cannot be empty'
                },
                status: 400
            };
        }

        const activeStatus = data.get('activeStatus');
        if (activeStatus.length < 1) {
            return {
                type: 'error',
                error: {
                    message: 'Please choose active status'
                },
                status: 400
            };
        }

        const description = data.get('description');
        if (title.length < 1) {
            return {
                type: 'error',
                error: {
                    message: 'Description cannot be empty'
                },
                status: 400
            };
        }

        const body = JSON.stringify({
            title: title,
            activeStatus: activeStatus == 'Active' ? 1 : 2,
            description: description
        });
        const endpoint = '/service';

        try {
            let response = await fetchData(endpoint, 'POST', cookies, body);

            if (!response.success) {
                return {
                    type: 'error',
                    error: {
                        message: response.error?.message || 'Unable to create new service'
                    },
                    status: 400
                };
            }

            throw redirect(303, '/services');
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
