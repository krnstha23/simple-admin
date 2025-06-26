import { error, redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const load = async (serverLoadEvent) => {
    const { cookies } = serverLoadEvent;
    const endpoint = '/Designation';

    const post = await fetchData(endpoint, 'GET', cookies);
    return { post };
};

export const actions = {
    save: async ({ request, cookies, url }) => {
        const data = await request.formData();
        const desigantion = data.get('designation');
        const endpoint = '/Designation';
        const body = JSON.stringify({
            designation: desigantion
        });

        try {
            await fetchData(endpoint, 'POST', cookies, body);
        } catch (err) {
            console.log('Error: ', err);
            throw error(err.status, err.message);
        }
        throw redirect(303, url.pathname);
    },

    delete: async ({ request, cookies, url }) => {
        const data = await request.formData();
        const desigantion = data.get('designationId');
        const endpoint = `/Designation/${desigantion}`;

        await fetchData(endpoint, 'DELETE', cookies);
        throw redirect(303, url.pathname);
    }
};
