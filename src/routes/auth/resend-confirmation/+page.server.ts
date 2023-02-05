import { PUBLIC_API_URL } from '$env/static/public';
import type { Actions } from './$types';
 
export const actions: Actions = {
    default: async ({ fetch, request }) => {
        const data = await request.formData();
        const email = data.get('email');

        const response = await fetch(`${PUBLIC_API_URL}/auth/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
            })
        })

        let toJson = await response.json();
        toJson.status = response.status;

        return toJson;
    }
};