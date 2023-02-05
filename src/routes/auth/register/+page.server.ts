import { PUBLIC_API_URL } from '$env/static/public';
import type { Actions } from './$types';
 
export const actions: Actions = {
    default: async ({ fetch, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch(`${PUBLIC_API_URL}/auth/register`, {
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

        return toJson;
    }
};