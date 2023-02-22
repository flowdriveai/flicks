import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, fetch }) => {
    let auth_token = cookies.get('auth_token')
    // Get list of drives
    try {
        const response = await fetch('http://127.0.0.1:5000/drive/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            }
        });
        const toJson = await response.json()
        if (toJson.success == true) {
            return {'drives': toJson.message}
        }
    } catch (err) {
        console.log(err)
    }

}) satisfies LayoutServerLoad;
