import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, url }) => {
  const session = cookies.get('user_token'); // or your session cookie name
  if (!session && url.pathname !== '/login') {
    throw redirect(303, '/login');
  }
  return {};
};
