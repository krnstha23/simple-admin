export const load = async (loadEvent) => {
    const { fetch, cookies } = loadEvent;
    const token = 'Bearer ' + cookies.get('user_token');
    const res = await fetch('http://localhost:5126/api/user?offset=0', {
        headers: {
            Authorization: token
        }
    });
    const users = await res.json();
    return { users: users.users };
};
