<script lang="ts">
	import 'app.css';
    import { selectedDriveId } from 'stores';
    import { page } from '$app/stores';
    import type { PageData } from './$types';

    // update selected drive store
    selectedDriveId.update(_ => $page.params.drive_id)

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

{#key driveFetchResponse}
{#if driveFetchResponse.success === true}
	<div
		class="w-4/5 flex flex-col items-center text-3xl text-white font-extrabold divide-y-2 divide-white/20"
	>
            <div class="h-5/6 p-10 flex">
                <video controls width="700">
                    <source src={driveData.url_matrix.fcam} />
                </video>
            </div>

            <div class="flex mt-auto min-w-full divide-x-2 divide-white/20">
                <a
                    href={driveData.url_matrix.qlog}
                    class="grow hover:bg-blue-700 duration-300 text-center"
                    download
                >
                    <button class="text-base font-normal py-5 px-10">Get Qlog</button>
                </a>
                <a
                    href={driveData.url_matrix.ecam}
                    class="grow hover:bg-blue-700 duration-300 text-center"
                    download
                >
                    <button class="text-base font-normal grow py-5 px-10">Get Ecam</button>
                </a>
                {#if driveData.owned}
                    {#if driveData.shared}
                        <button class="text-red-500 grow hover:text-white hover:bg-red-600 duration-300 text-center text-base font-normal grow py-5 px-10" on:click|preventDefault={toggleShare}>Unshare Drive</button>
                    {:else}
                        <button class="text-green-500 grow hover:text-white hover:bg-green-600 duration-300 text-center text-base font-normal grow py-5 px-10" on:click|preventDefault={toggleShare}>Share Drive</button>
                    {/if}
                {/if}
            </div>
	</div>
{:else}
	<div class="w-4/5 flex justify-center items-center text-3xl text-red-500/30 font-extrabold">
		<div>{driveFetchResponse.message}</div>
	</div>
{/if}
{/key}