import type { Actions } from './$types';
 
export const actions: Actions = {
    default: async ({ request, url }) => {
        const data = await request.formData();
        const password = data.get('password');
        const token = url.searchParams.get('token')

        const response = await fetch('https://staging-api.flowdrive.ai/auth/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'token': token,
                'password': password
            })
        })

        let toJson = await response.json();
        toJson.status = response.status;

        return toJson;
    }
};