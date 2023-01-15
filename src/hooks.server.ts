import type { Handle } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
 
export const handle = (async ({ event, resolve }) => {
    const auth_token = event.cookies.get('auth_token');

    if (auth_token === undefined && event.url.pathname === "/") {
        return Response.redirect(`${event.url.origin}/login`, 302)
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
        if (refreshToJson.success == true) {
            event.cookies.set('auth_token', refreshToJson.message.auth_token, {
                path: '/',
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7
            })
            if (event.url.pathname !== "/logout" && event.url.pathname !== "/") {
                return Response.redirect(`${event.url.origin}`, 302)
            }
        } else {
            if (event.url.pathname === "/") {
                return Response.redirect(`${event.url.origin}/login`, 302)
            }
        }
    } catch (err) {
        console.log(err)
    }
 
    const response = await resolve(event);
    return response;

}) satisfies Handle;