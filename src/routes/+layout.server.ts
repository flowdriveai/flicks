import type { LayoutServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({ cookies, fetch }) => {
    let auth_token = cookies.get('auth_token')

    // Get user status
    try {
        const statusRes = await fetch(`${PUBLIC_API_URL}/user/status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            }
        });
        const statusToJson = await statusRes.json()
        if (statusToJson.success == true) {
            return statusToJson.message
        }
    } catch (err) {
        console.log(err)
    }

}) satisfies LayoutServerLoad;