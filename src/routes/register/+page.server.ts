import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
 
export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch('https://staging-api.flowdrive.ai/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })

        const json = await response.json()
        const result = JSON.stringify(json)

        console.log(result)
    }
};