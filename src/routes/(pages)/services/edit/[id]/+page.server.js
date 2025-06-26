import { redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const load = async (serverLoadEvent) => {
    const { cookies, params } = serverLoadEvent;
    const { id } = params;
    const endpoint = `/service/${id}`;

    return await fetchData(endpoint, 'GET', cookies);
};

export const actions = {
    default: async ({ request, cookies, params }) => {
        const data = await request.formData();
        const { id } = params;
        const title = data.get('title');
        const description = data.get('description');
        const activeStatus = data.get('activeStatus');
        const body = JSON.stringify({
            id: id,
            title: title,
            description: description,
            activeStatus: activeStatus == 'Active' ? 1 : 2
        });
        const endpoint = `/service/${id}`;

        await fetchData(endpoint, 'PUT', cookies, body);
        throw redirect(303, '/services');
    }
};
