import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {

    // Fetch Plans
    const plansRes = await fetch(
        `${PUBLIC_API_URL}/plans`, {
            method: 'GET',
    });

    const plansToJson = await plansRes.json()
    return { 'plans' : plansToJson.message }
}) satisfies PageServerLoad;

 
export const actions = {
  subscribe: async ({ fetch, request, cookies }) => {
        let auth_token = cookies.get('auth_token')

        const data = await request.formData();
        const plan = data.get('plan');
        const key = data.get('key');

        const response = await fetch(`${PUBLIC_API_URL}/user/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            },
            body: JSON.stringify({
                'plan': plan,
                'key': key
            })
        })

        let toJson = await response.json();
        toJson.status = response.status;
        if (toJson.success) {
            throw redirect(302, '/user')
        }

        return toJson;
  },

  unsubscribe: async ({ fetch, request, cookies }) => {
        const auth_token = cookies.get('auth_token');

        const data = await request.formData();
        const original_plan = data.get('original_plan');
        const input_plan = data.get('input_plan');

        if (original_plan !== input_plan) {
            return {
                "success": false,
                "message": "Input does not match to the subscribed plan"
            }
        }

        const response = await fetch(`${PUBLIC_API_URL}/user/subscribe`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            },
        });

        let toJson = await response.json();
        toJson.status = response.status;
        if (toJson.success) {
            throw redirect(302, '/user')
        }

        return toJson;
  }
} satisfies Actions;