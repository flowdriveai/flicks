import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load = (async ({ cookies, params, fetch }) => {
    let auth_token = cookies.get('auth_token')

    // Get drive
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
}) satisfies PageServerLoad;