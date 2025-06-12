export const load = async (serverLoadEvent) => {
    const { fetch, params } = serverLoadEvent;
    const { id } = params;
    let url = `http://localhost:5126/api/user/${id}`;
    const res = await fetch(url, {
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJLcG9Db21wYW55IjpbIkFkbWluIiwiRGV2ZWxvcGVyIl0sImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkF1dGhlbnRpY2F0ZWQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImM1YTE4NzAzLWZlNzUtNGVlNy04Nzg1LTcyNTkwYjExZmI5ZCIsInN1YiI6ImFkbWluIiwiVG9rZW5FeHBpcmVEYXRlVGltZSI6IjYvMTIvMjAyNSAxMDo0MTowMFx1MjAyRlBNIiwiZXhwIjoxNzQ5NzY4MDYwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0In0.wziX_RfLSdH27WC1hxcSxscDVi-8GoPP5FjkrLip9cg'
        }
    });

    var author = await res.json();
    console.log(author);
    return author;
};
