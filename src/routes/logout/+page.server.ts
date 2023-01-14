import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load = (async ({ cookies, fetch }) => {
    let auth_token = cookies.get('auth_token')

    // Logout
    try {
        const _ = await fetch('https://staging-api.flowdrive.ai/auth/logout', {
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

    throw redirect(302, '/login')

}) satisfies PageServerLoad;