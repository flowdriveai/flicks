import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({ cookies, params, fetch }) => {
    let auth_token = cookies.get('auth_token')

    // Get drive
    try {
        const driveRes = await fetch(
            `${PUBLIC_API_URL}/drive?` + new URLSearchParams({ drive_id: params.drive_id }), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth_token}`
                }
        });
        const driveToJson = await driveRes.json()
        return { 'driveResponse': driveToJson }
    } catch (err) {
        console.log(err)
    }

}) satisfies PageServerLoad;