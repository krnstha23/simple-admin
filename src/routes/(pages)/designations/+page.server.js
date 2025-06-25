import { redirect } from '@sveltejs/kit';

export const load = async (serverLoadEvent) => {
    const { fetch, cookies } = serverLoadEvent;
    const token = 'Bearer ' + cookies.get('user_token');
    const res = await fetch('http://localhost:5126/api/Designation', {
        headers: {
            Authorization: token
        }
    });
    let post = await res.json();
    return { post: post };
};

export const actions = {
    save: async ({ request, cookies, url }) => {
        const data = await request.formData();
        const desigantion = data.get('designation');
        const token = 'Bearer ' + cookies.get('user_token');
        await fetch('http://localhost:5126/api/Designation', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                designation: desigantion
            })
        });

        throw redirect(303, url.pathname);
    },

    delete: async ({ request, cookies, url }) => {
        const data = await request.formData();
        const desigantion = data.get('designationId');
        const token = 'Bearer ' + cookies.get('user_token');
        await fetch(`http://localhost:5126/api/Designation/${desigantion}`, {
            method: 'DELETE',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        throw redirect(303, url.pathname);
    }
};
