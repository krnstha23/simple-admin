import { redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const title = data.get('title');
        const activeStatus = data.get('activeStatus');
        const description = data.get('description');
        const body = JSON.stringify({
            title: title,
            activeStatus: activeStatus == 'Active' ? 1 : 2,
            description: description
        });
        const endpoint = '/service';

        await fetchData(endpoint, 'POST', cookies, body);
        throw redirect(303, '/services');
    }
};
