<script lang="ts">
	import 'app.css';
	import type { LayoutData } from '../$types';
	import type { PageData } from './$types';
	import dateConvert from '../../modules/dateConvert';

	export let data: PageData;
</script>

<main class="container flex flex-col mx-auto p-10 justify-center max-w-md relative">
	<h1 class="text-2xl font-bold text-center py-5">My Account</h1>

	<h1 class="text-xl font-bold py-5">Details</h1>
	<div class="flex place-content-between py-1">
		<div class="font-bold">Plan</div>
		<div class="flex font-mono">
			<div>{data.plan}</div>
			<a
				class="text-green-600 absolute left-full hover:text-green-800 font-sans"
				href="/user/subscribe"
			>
				Change</a
			>
		</div>
	</div>

	{#if data.plan !== 'community'}
		<div class="flex place-content-between py-1">
			<div class="font-bold">Plan Expiry</div>
			<div class="flex font-mono">
				<div>
					{dateConvert(data.plan_expires_at).toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</div>
			</div>
		</div>
	{/if}

	<div class="flex place-content-between py-1">
		<div class="font-bold">Registered On</div>
		<div class="flex font-mono">
			<div>
				{dateConvert(data.registered_on).toLocaleTimeString('en-US', {
					weekday: 'long',
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					hour12: true
				})}
			</div>
		</div>
	</div>
	<div class="flex place-content-between py-1">
		<div class="font-bold">Last Login</div>
		<div class="flex font-mono">
			<div>
				{dateConvert(data.last_login_at).toLocaleTimeString('en-US', {
					weekday: 'long',
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					hour12: true
				})}
			</div>
		</div>
	</div>

	{#if typeof data.devices !== 'undefined' && data.devices.length > 0}
		<div class="py-5" />
		<h1 class="text-xl font-bold py-5">Devices</h1>
		{#each data.devices as device}
			<div class="flex place-content-between py-1">
				<div class="font-mono font-bold">{device.model_name}</div>
				<div class="flex">
					<a
						class="text-red-600 hover:text-red-800"
						href="/user/revoke_device?id={device.device_id}"
					>
						Revoke</a
					>
				</div>
			</div>
		{/each}
	{/if}
</main>
