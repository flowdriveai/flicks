<script lang="ts">
	import 'app.css';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import collapse from '../../../modules/collapse';

	export let data: PageData;
	export let form: ActionData;

	let end_curr_sub_toggle = false;
	console.log('page data: ', data);
</script>

<main class="container flex flex-col mx-auto p-10 justify-center max-w-xl relative">
	<h1 class="text-2xl font-bold text-center pb-20">Plans</h1>

	{#if form}
		{#if form.success}
			<div class="p-2 my-2 bg-green-500 duration-300 text-white text-center rounded-md">
				{form.message}
			</div>
		{:else}
			<div class="p-2 my-2 bg-red-500 duration-300 text-white text-center rounded-md">
				{form.message}
			</div>
		{/if}
	{:else}
		<div class="p-2 my-5" />
	{/if}

	<div class="flex flex-grow flex-col pt-5">
		{#each data.plans as plan}
			{#if data.plan === plan.name}
				<div class="flex flex-col border-2 border-green-600">
					<div class="flex flex-grow place-items-center justify-between">
						<div class="font-mono p-10 text-l">
							<div>
								{plan.name}
							</div>
						</div>

						{#if plan.name != 'community'}
							<button
								class="p-10 text-red-500"
								on:click={() => (end_curr_sub_toggle = !end_curr_sub_toggle)}
							>
								{#if end_curr_sub_toggle}
									<div class="text-blue-600">go back</div>
								{:else}
									end
								{/if}
							</button>
						{/if}
					</div>

					<div use:collapse={{ open: end_curr_sub_toggle, duration: 0.2, easing: 'ease' }}>
						<form method="POST" action="?/unsubscribe" use:enhance>
							<div class="px-10 text-sm">
								This is a permanent action. Type in {plan.name} to proceed
							</div>
							<input type="hidden" id="original_plan" name="original_plan" value={plan.name} />
							<div class="text-sm mr-20 px-10 py-5 w-5/12">
								<input
									class="appearance-none border border-white/20 focus:outline-none focus:border-white/25 bg-black font-mono p-2 placeholder-white/20"
									type="text"
									id="input_plan"
									name="input_plan"
									placeholder={plan.name}
								/>
							</div>
							<div>
								<button
									class="mx-10 mb-10 p-2 w-5/12 text-sm border border-red-500 hover:bg-red-500"
									>Confirm End plan
								</button>
							</div>
						</form>
					</div>
				</div>
			{:else}
				<form method="POST" action="?/subscribe" use:enhance>
					<div
						class="relative flex flex-grow place-items-center place-content-stretch justify-between border border-white/20 "
					>
						<div class="font-mono p-10 text-l">{plan.name}</div>
						<input type="hidden" id="plan" name="plan" value={plan.name} />
						{#if plan.key_required}
							<div class="text-sm mr-28">
								<input
									class="appearance-none border border-white/20 focus:outline-none focus:border-white/25 bg-black font-mono m-2 p-2 placeholder-white/20"
									type="text"
									id="key"
									name="key"
									placeholder="Access Key"
								/>
							</div>
						{/if}
						<button
							class="absolute right-0 hover:bg-blue-700 duration-300 p-10 h-full justify-items-stretch items-stretch"
							>&rarr;</button
						>
					</div>
				</form>
			{/if}
		{/each}
	</div>
</main>
