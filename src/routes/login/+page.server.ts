import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
 
export const actions: Actions = {
    default: async ({ fetch, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch('https://staging-api.flowdrive.ai/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })

        let toJson = await response.json();
        toJson.status = response.status;

        if (toJson.success) {
            throw redirect(300, '/')
        }

        return toJson;
    }
};