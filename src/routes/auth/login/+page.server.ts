import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions: Actions = {
    default: async ({ fetch, request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch(`${PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })

        const toJson = await response.json();
        toJson.status = response.status;

        if (toJson.success) {
            cookies.set('auth_token', toJson.message.auth_token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            throw redirect(302, '/')
        }

        return toJson;
    }
};