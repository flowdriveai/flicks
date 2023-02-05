import type { Handle } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
 
export const handle = (async ({ event, resolve }) => {
    const auth_token = event.cookies.get('auth_token');

    // First time user
    if (auth_token === undefined && !(event.url.pathname.includes("auth"))) {
        return Response.redirect(`${event.url.origin}/auth/login`, 302)
    }

    // Refresh token or redirect to login
    try {
        const refreshRes = await fetch(`${PUBLIC_API_URL}/auth/refresh_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            },
            body: JSON.stringify({
                'long_living': false
            })
        });
        const refreshToJson = await refreshRes.json()
        if (refreshToJson.success) {
            event.cookies.set('auth_token', refreshToJson.message.auth_token, {
                path: '/',
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7
            })
            return resolve(event)
        } else {
            if (!(event.url.pathname.includes("auth"))) {
                return Response.redirect(`${event.url.origin}/auth/login`, 302)
            }
        }
    } catch (err) {
        console.log(err)
    }
 
    return resolve(event);
}) satisfies Handle;