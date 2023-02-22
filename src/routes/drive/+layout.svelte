<script lang="ts">
	import type { LayoutData } from './$types';
	import '../../app.css';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	let previousDriveButton: Element | null = null;
	let uid: string | null = null;

	async function selectDrive(id: string) {
		let driveButton: Element | null = document.getElementById(id);
		driveButton?.classList.add('bg-blue-600');
		previousDriveButton?.classList.remove('bg-blue-600');
		previousDriveButton = driveButton;
		uid = id;

        goto(`/drive/${uid}`)
	}
</script>

<main class="bg-black text-white">
	<div class="flex divide-x-2 divide-white/20 h-[calc(100vh-5rem)]">
        <aside class="w-1/5 flex flex-col divide-y divide-white/20 overflow-scroll">
            {#each data.drives as drive}
                <button
                    id={drive.drive_id}
                    class="text-left hover:bg-blue-700 duration-300 py-5 px-10"
                    on:click|preventDefault={() => selectDrive(drive.drive_id)}
                >
                    <div class="font-bold">
                        {new Date(drive.started_on).toLocaleDateString('en-us', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                    <div class="text-xs font-mono">
                        {new Date(drive.started_on).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })} 
                        to
                        {new Date(drive.ended_on).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}
                    </div>
                </button>
            {/each}
        </aside>
        <!-- +page.svelte is rendered in this <slot> -->  
        <slot />
    </div>
</main>


