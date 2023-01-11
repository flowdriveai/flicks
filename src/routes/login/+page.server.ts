import type { Actions } from './$types';
 
export const actions: Actions = {
    default: async ({ request }) => {
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
        console.log(response.body)

        const json = await response.json()
        const result = JSON.stringify(json)

        console.log(result)
    }
};