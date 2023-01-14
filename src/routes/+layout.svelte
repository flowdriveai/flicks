<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<nav class="text-white  border-b-2 border-b-white/20">
	<div class="flex justify-between py-6 px-10">
		<a href="/">Flowdrive</a>
		<div class="flex gap-x-4">
			{#if data.email}
				<div>{data.email}</div>
				<a
					href="/logout"
					class="pl-5 text-red-500 border-red-500 hover:text-red-600"
					data-sveltekit-reload
					>Logout
				</a>
			{/if}
		</div>
	</div>
</nav>
<slot />
<footer class="flex flex-row-reverse p-4 pt-8 justify-center text-white/80">
	<hr class="bg-white" />
	<p class="text-xs">Flowdrive.ai, India</p>
</footer>
