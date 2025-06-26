import { redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const load = async (serverLoadEvent) => {
    const { cookies } = serverLoadEvent;
    const endpoint = `/service?offset=${0}`;

    return await fetchData(endpoint, 'GET', cookies);
};

export const actions = {
    delete: async ({ request, cookies, url }) => {
        const data = await request.formData();
        const designation = data.get('designationId');
        const endpoint = `/service/${designation}`;

        await fetchData(endpoint, 'DELETE', cookies);
        throw redirect(303, url.pathname);
    }
};
