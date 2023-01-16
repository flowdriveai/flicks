<script lang="ts">
	import type { PageData } from './$types';
	import '../app.css';

	export let data: PageData;

	let previousDriveButton: Element | null = null;
	let uid: string | null = null;
	$: url = null;

	function selectDrive(id: string) {
		let driveButton: Element | null = document.getElementById(id);
		driveButton?.classList.add('bg-blue-600');
		previousDriveButton?.classList.remove('bg-blue-600');
		previousDriveButton = driveButton;
		uid = id;

		let _drives = data.drives;
		url = _drives.find((drive: any) => drive.timestamp === id).url;
	}
</script>

<main class="bg-black text-white">
	<div class="flex divide-x-2 divide-white/20 h-[calc(100vh-5rem)]">
		<div class="w-1/5 flex flex-col divide-y divide-white/20 overflow-scroll">
			{#each data.drives as drive}
				<button
					id={drive.timestamp}
					class="text-left hover:bg-blue-700 duration-300 py-5 px-10"
					on:click|preventDefault={() => selectDrive(drive.timestamp)}
				>
					<div class="font-bold">{drive.name}</div>
					<div class="text-xs font-mono">{drive.timestamp}</div>
				</button>
			{/each}
		</div>
		{#if uid === null}
			<div class="w-4/5 flex justify-center items-center text-3xl text-white/20 font-extrabold">
				<div>&#8592; Choose a Drive</div>
			</div>
		{:else}
			<div class="w-4/5 flex flex-col items-center text-3xl text-white font-extrabold">
				<div class="p-10">Viewing {uid}</div>
				{#key url}
					<video controls width="700">
						<source src={url} />
					</video>
				{/key}
			</div>
		{/if}
	</div>
</main>

<slot />
