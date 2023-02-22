import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load = (async () => {
    throw redirect(302, '/drive')
}) satisfies PageServerLoad;