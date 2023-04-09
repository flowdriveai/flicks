import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({ cookies, fetch }) => {
    let auth_token = cookies.get('auth_token')
    // Get list of drives
    const response = await fetch(`${PUBLIC_API_URL}/device` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth_token}`
        }
    });
    const toJson = await response.json()
    if (toJson.success == true) {
        return {'devices': toJson.message}
    }
}) satisfies PageServerLoad;