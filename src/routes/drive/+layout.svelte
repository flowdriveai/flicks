<script lang="ts">
	import type { LayoutData } from './$types';
	import '../../app.css';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { selectedDriveId } from 'stores';
	import dateConvert from '../../modules/dateConvert';

	export let data: LayoutData;

	if (browser) {
		selectedDriveId.subscribe((id: string) => {
			console.log('got a inform for ', id);
			selectDrive(id);
		});
	}

	async function selectDrive(id: string) {
		if (id !== '') {
			goto(`/drive/${id}`);
		}
	}
</script>

<main class="bg-black text-white">
	<div class="flex divide-x-2 divide-white/20 h-[calc(100vh-5rem)]">
		<aside class="w-1/5 flex flex-col divide-y divide-white/20 overflow-scroll">
			{#key $selectedDriveId}
				{#each data.drives as drive}
					{#if $selectedDriveId === drive.drive_id}
						<button
							id={drive.drive_id}
							class="text-left bg-blue-600 hover:bg-blue-700 duration-300 py-5 px-10"
							on:click|preventDefault={() => selectedDriveId.set(drive.drive_id)}
						>
							<div class="font-bold">
								{dateConvert(drive.started_on).toLocaleDateString('en-us', {
									weekday: 'long',
									month: 'short',
									day: 'numeric'
								})}
							</div>
							<div class="text-xs font-mono">
								{dateConvert(drive.started_on).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: 'numeric',
									hour12: true
								})}
								to
								{dateConvert(drive.ended_on).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: 'numeric',
									hour12: true
								})}
							</div>
						</button>
					{:else}
						<button
							id={drive.drive_id}
							class="text-left hover:bg-blue-700 duration-300 py-5 px-10"
							on:click|preventDefault={() => selectedDriveId.set(drive.drive_id)}
						>
							<div class="font-bold">
								{dateConvert(drive.started_on).toLocaleDateString('en-us', {
									weekday: 'long',
									month: 'short',
									day: 'numeric'
								})}
							</div>
							<div class="text-xs font-mono">
								{dateConvert(drive.started_on).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: 'numeric',
									hour12: true
								})}
								to
								{dateConvert(drive.ended_on).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: 'numeric',
									hour12: true
								})}
							</div>
						</button>
					{/if}
				{/each}
			{/key}
		</aside>
		<!-- +page.svelte is rendered in this <slot> -->
		<slot />
	</div>
</main>
