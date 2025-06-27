import { redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const load = async (serverLoadEvent) => {
    const { cookies, url } = serverLoadEvent;
    const page = url.searchParams.get('page') ?? 0;
    console.log(page);
    const endpoint = `/service?offset=${page}`;

    var data = await fetchData(endpoint, 'GET', cookies);
    data.page = page;
    return data;
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
