import { redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const load = async (serverLoadEvent) => {
    const { cookies } = serverLoadEvent;
    const endpoint = '/Designation';

    try {
        const data = await fetchData(endpoint, 'GET', cookies);

        if (data.type == 'error') {
            return {
                type: 'error',
                error: {
                    message: data.error?.message || 'Unable to load the designation'
                },
                status: 400
            };
        }

        return { data };
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
};

export const actions = {
    save: async ({ request, cookies, url }) => {
        const data = await request.formData();
        const designation = data.get('designation');
        if (designation.length < 1) {
            return {
                type: 'error',
                error: {
                    message: 'Designation must not be empty.'
                },
                status: 400
            };
        }

        const endpoint = '/Designation';
        const body = JSON.stringify({
            designation: designation
        });

        try {
            let response = await fetchData(endpoint, 'POST', cookies, body);

            if (!response.success) {
                return {
                    type: 'error',
                    error: {
                        message: response.error?.message || 'Unable to create new designation'
                    },
                    status: 400
                };
            }

            throw redirect(303, url.pathname);
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
    },

    delete: async ({ request, cookies, url }) => {
        const data = await request.formData();
        const designation = data.get('designationId');
        const endpoint = `/Designation/${designation}`;

        if (designation.length < 1) {
            return {
                type: 'error',
                error: {
                    message: 'This designation doesnot exist.'
                },
                status: 400
            };
        }

        try {
            let response = await fetchData(endpoint, 'DELETE', cookies);

            if (!response.success) {
                return {
                    type: 'error',
                    error: {
                        message: response.error?.message || 'Unable to delete the desigantion'
                    },
                    status: 400
                };
            }

            throw redirect(303, url.pathname);
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
