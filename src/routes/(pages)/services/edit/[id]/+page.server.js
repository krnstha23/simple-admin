import { redirect } from '@sveltejs/kit';
import toast from 'svelte-french-toast';

export const load = async (serverLoadEvent) => {
    const { fetch, cookies, params } = serverLoadEvent;
    const token = 'Bearer ' + cookies.get('user_token');
    const { id } = params;
    const res = await fetch(`http://localhost:5126/api/service/${id}`, {
        headers: {
            Authorization: token
        }
    });
    let post = await res.json();
    toast.success('Data loaded successfully');
    return post;
};

export const actions = {
    default: async ({ request, cookies, params }) => {
        const data = await request.formData();
        const { id } = params;
        const title = data.get('title');
        const description = data.get('description');
        const activeStatus = data.get('activeStatus');
        let status = activeStatus == 'Active' ? 1 : 2;
        const token = 'Bearer ' + cookies.get('user_token');
        await fetch(`http://localhost:5126/api/service/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                id: id,
                title: title,
                description: description,
                activeStatus: status
            })
        });

        throw redirect(303, '/services');
    }
};
