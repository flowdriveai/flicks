<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<nav class="text-white  border-b-2 border-b-white/20">
	<div class="flex justify-between py-6 px-10 place-content-center place-items-center">
		<a
			class="font-extrabold text-xl bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-pink-500
            animate-text
            "
			href="/">Flicks</a
		>
		<div class="flex gap-x-4 place-content-center place-items-center">
			{#if data.email}
				<a
					href="/user"
					class="p-2 hover:text-black hover:bg-white duration-150 border-white/40 shadow-sm text-white rounded-sm"
				>
					{data.email} &rightarrow;
				</a>
				<a
					href="/logout"
					class="p-2 hover:text-black hover:bg-red-500 text-red-500 border-red-500/40 shadow-sm rounded-sm duration-150"
					data-sveltekit-reload
					>Logout
				</a>
			{/if}
		</div>
	</div>
</nav>
<slot />
{#if $page.url.pathname.includes('auth')}
	<footer class="flex flex-row-reverse p-4 pt-8 justify-center text-white/80">
		<hr class="bg-white" />
		<p class="text-xs">Flowdrive.ai, India</p>
	</footer>
{/if}
