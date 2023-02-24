<script lang="ts">
	import 'app.css';
    import { selectedDriveId } from 'stores';
    import { page, navigating } from '$app/stores';
    import type { PageData } from './$types';
    import { ScaleOut } from 'svelte-loading-spinners';

    // update selected drive store
    selectedDriveId.set($page.params.drive_id)

    export let data: PageData;
    $: ({ driveResponse: driveFetchResponse } = data)
    $: ({ message: driveData } = driveFetchResponse)

    async function toggleShare() {
        const response = await fetch('/drive/share', {
                method: 'POST',
                body: JSON.stringify({
                    'drive_id': driveData.drive_id,
                    'shared': !driveData.shared
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        });

        const toJson = await response.json()
        if (toJson.success == true) {
            driveData.shared = toJson.message.shared
        }
    }
</script>

{#if $navigating}
    <div class="w-4/5 flex justify-center items-center text-3xl text-white/20 font-extrabold">
        <ScaleOut size="120" color="#FFFFFF1a" unit="px" duration="0.75s" />
    </div>
{:else}
{#key driveFetchResponse}
{#if driveFetchResponse.success === true}
	<div
		class="w-3/5 flex flex-col items-center text-3xl text-white font-extrabold divide-y-2 divide-white/20"
	>
            <div class="m-auto flex">
                <video controls width="700">
                    <source src={driveData.url_matrix.fcam} />
                </video>
            </div>

	</div>
    <div class="justify-between flex flex-col w-1/5 divide-y-2 divide-white/20">
            <div class="flex min-w-full items-center">
                <div class="p-5">
                    <div class="pb-5">
                        <div class="text-xs text-white/60">Started on</div>
                        <div>{new Date(driveData.started_on).toLocaleDateString('en-us', {weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</div>
                    </div>

                    <div class="pb-5">
                        <div class="text-xs text-white/60">Duration</div>
                        <div>{driveData.duration}</div>
                    </div>

                    <div class="pb-5">
                        <div class="text-xs text-white/60">Device ID</div>
                        <div class="font-mono">{driveData.device_id}</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col mt-auto min-w-full divide-y-2 divide-white/20">
                <a
                    href={driveData.url_matrix.qlog}
                    class=" hover:bg-blue-700 duration-300 text-center"
                    download
                >
                    <button class="text-sm font-normal py-5 px-10">Get Qlog</button>
                </a>
                <a
                    href={driveData.url_matrix.ecam}
                    class=" hover:bg-blue-700 duration-300 text-center"
                    download
                >
                    <button class="text-sm font-normal grow py-5 px-10">Get Ecam</button>
                </a>
                {#if driveData.owned}
                    {#if driveData.shared}
                        <button class="text-red-500  hover:text-white hover:bg-red-600 duration-300 text-center text-sm font-normal grow py-5 px-10" on:click|preventDefault={toggleShare}>Unshare Drive</button>
                    {:else}
                        <button class="text-green-500 hover:text-white hover:bg-green-600 duration-300 text-center text-sm font-normal grow py-5 px-10" on:click|preventDefault={toggleShare}>Share Drive</button>
                    {/if}
                {:else}
                        <button disabled class="text-white/60 text-center text-sm font-normal grow py-5 px-10">Shared</button>
                {/if}
            </div>
    </div>
{:else}
	<div class="w-4/5 flex justify-center items-center text-3xl text-red-500/30 font-extrabold">
		<div>{driveFetchResponse.message}</div>
	</div>
{/if}
{/key}
{/if}