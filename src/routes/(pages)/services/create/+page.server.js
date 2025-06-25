import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const title = data.get('title');
        const activeStatus = data.get('activeStatus');
        console.log(activeStatus);
        const description = data.get('description');
        const token = 'Bearer ' + cookies.get('user_token');
        await fetch('http://localhost:5126/api/service', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                activeStatus: activeStatus == 'Active' ? 1 : 2,
                description: description
            })
        });

        throw redirect(303, '/services');
    }
};
