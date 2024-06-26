import { PUBLIC_API_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load = (async ({ cookies, fetch }) => {
    let auth_token = cookies.get('auth_token')

    // Logout
    try {
        const _ = await fetch(`${PUBLIC_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            }
        });
    } catch (err) {
        console.log(err)
    }

    // Delete the cookie
    cookies.delete('auth_token')

    throw redirect(302, '/auth/login')

}) satisfies PageServerLoad;