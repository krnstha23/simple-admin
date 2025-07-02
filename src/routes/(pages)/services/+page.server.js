import { redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const load = async (serverLoadEvent) => {
    const { cookies, url } = serverLoadEvent;
    let page = url.searchParams.get('page') ?? 0;
    if (page > 0) {
        page = page - 1;
    }
    const title = url.searchParams.get('title') ?? '';
    const active = url.searchParams.get('activeStatus') ?? 0;
    let endpoint = `/service?offset=${page}`;
    if (title.length > 1) {
        endpoint = endpoint + `&title=${title}`;
    }
    if (active.length > 1) {
        endpoint = endpoint + `&activeStatus=${active}`;
    }

    try {
        var data = await fetchData(endpoint, 'GET', cookies);

        if (data.type == 'error') {
            return {
                type: 'error',
                error: {
                    message: data.error?.message || 'Unable to load the service'
                },
                status: 400
            };
        }

        data.page = page;
        return data;
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
    delete: async ({ request, cookies, url }) => {
        const data = await request.formData();
        const designation = data.get('designationId');
        const endpoint = `/service/${designation}`;
        if (designation.length < 1) {
            return {
                type: 'error',
                error: {
                    message: 'This service doesnot exist.'
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
                        message: response.error?.message || 'Unable to delete the service'
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
