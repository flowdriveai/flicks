<script lang="ts">
	import type { PageData } from './$types';
	import '../app.css';

	export let data: PageData;
	console.log(data);
</script>

<main class="bg-black text-white">
	<div class="flex divide-x-2 divide-white/20 h-[calc(100vh-5rem)]">
		<div class="w-1/5 flex flex-col divide-y divide-white/20 overflow-scroll">
			{#each data.drives as drive}
				<button class="text-left hover:bg-white/10 duration-300 py-5 px-10">
					<div class="font-bold">{drive.name}</div>
					<div class="text-xs font-mono">{drive.timestamp}</div>
				</button>
			{/each}
		</div>
		<div class="w-4/5 flex justify-center items-center text-3xl text-white/20 font-extrabold">
			<div>&#8592; Choose a Drive</div>
		</div>
	</div>
</main>

<slot />
