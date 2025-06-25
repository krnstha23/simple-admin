import { redirect } from '@sveltejs/kit';
import { fetchData } from '$lib/fetch';

export const load = async (serverLoadEvent) => {
    const { cookies } = serverLoadEvent;
    const endpoint = `/service?offset=${0}`;
    const fetchFn = 'GET';

    return await fetchData(endpoint, fetchFn, cookies);
};

// export const actions = {
//     save: async ({ request, cookies, url }) => {
//         const data = await request.formData();
//         const desigantion = data.get('designation');
//         const token = 'Bearer ' + cookies.get('user_token');
//         await fetch('http://localhost:5126/api/Designation', {
//             method: 'POST',
//             headers: {
//                 Authorization: token,
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include',
//             body: JSON.stringify({
//                 designation: desigantion
//             })
//         });
//
//         throw redirect(303, url.pathname);
//     },
//
//     delete: async ({ request, cookies, url }) => {
//         const data = await request.formData();
//         const designation = data.get('designationId');
//         const token = 'Bearer ' + cookies.get('user_token');
//         await fetch(`http://localhost:5126/api/service/${designation}`, {
//             method: 'DELETE',
//             headers: {
//                 Authorization: token,
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include'
//         });
//
//         throw redirect(303, url.pathname);
//     }
// };
