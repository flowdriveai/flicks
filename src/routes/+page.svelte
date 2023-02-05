<script lang="ts">
	import type { PageData } from './$types';
	import '../app.css';

	export let data: PageData;

	let previousDriveButton: Element | null = null;
	let uid: string | null = null;
	$: resourceMap = null;
	$: drive = null;
	$: driveResourceFound = true;

	async function selectDrive(id: string) {
		let driveButton: Element | null = document.getElementById(id);
		driveButton?.classList.add('bg-blue-600');
		previousDriveButton?.classList.remove('bg-blue-600');
		previousDriveButton = driveButton;
		uid = id;

		let _drives = data.drives;
		let _drive = _drives.find((drive: any) => drive.timestamp === id);
		drive = _drive;
		console.log(drive);

		const response = await fetch('/drive', {
			method: 'POST',
			body: JSON.stringify(_drive),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let jsonData = await response.json();
		driveResourceFound = jsonData.success;
		if (driveResourceFound) {
			resourceMap = jsonData.message;
		}

		console.log(jsonData);
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
					<div class="font-bold">
						{new Date(drive.timestamp * 1000).toLocaleDateString('en-us', {
							weekday: 'long',
							month: 'short',
							day: 'numeric'
						})}
					</div>
					<div class="text-xs font-mono">
						{new Date(drive.timestamp * 1000).toLocaleString('en-US', {
							hour: 'numeric',
							minute: 'numeric',
							hour12: true
						})}
					</div>
				</button>
			{/each}
		</div>
		{#if uid === null}
			<div class="w-4/5 flex justify-center items-center text-3xl text-white/20 font-extrabold">
				<div>&#8592; Choose a Drive</div>
			</div>
		{:else if driveResourceFound === true}
			<div
				class="w-4/5 flex flex-col items-center text-3xl text-white font-extrabold divide-y-2 divide-white/20"
			>
				{#key resourceMap}
					{#if resourceMap && drive}
						<div class="h-5/6 p-10 flex">
							<video controls width="700">
								<source src={resourceMap[drive.ecam]} />
							</video>
						</div>

						<div class="flex mt-auto min-w-full divide-x-2 divide-white/20">
							<a
								href={resourceMap[drive.qlog]}
								class="grow hover:bg-blue-700 duration-300 text-center"
								download
							>
								<button class="text-base font-normal py-5 px-10">Get Qlog</button>
							</a>
							<a
								href={resourceMap[drive.ecam]}
								class="grow hover:bg-blue-700 duration-300 text-center"
								download
							>
								<button class="text-base font-normal grow py-5 px-10">Get Ecam</button>
							</a>
							<a
								href={resourceMap[drive.qlog]}
								class="grow hover:bg-blue-700 duration-300 text-center"
								download
							>
								<button class="text-base font-normal grow py-5 px-10">Share Drive</button>
							</a>
						</div>
					{/if}
				{/key}
			</div>
		{:else}
			<div class="w-4/5 flex justify-center items-center text-3xl text-red-500/30 font-extrabold">
				<div>Drive Resources not Found</div>
			</div>
		{/if}
	</div>
</main>

<slot />
