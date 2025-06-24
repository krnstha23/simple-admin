export const load = async (serverLoadEvent) => {
    const { fetch, params, cookies } = serverLoadEvent;
    const { id } = params;
    const token = 'Bearer ' + cookies.get('user_token');
    let url = `http://localhost:5126/api/user/${id}`;
    const res = await fetch(url, {
        headers: {
            Authorization: token
        }
    });

    var author = await res.json();
    return author;
};
