import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load = (async ({ cookies, fetch }) => {
    let auth_token = cookies.get('auth_token')

}) satisfies PageServerLoad;