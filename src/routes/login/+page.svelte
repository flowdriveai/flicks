<script>
	import { enhance } from '$app/forms';
	import '../../app.css';
	/**
	 * @type {any}
	 */
	export let form = null;
</script>

<main class="container flex flex-col mx-auto p-10 justify-center max-w-md">
	<h1 class="text-2xl font-bold text-center p-5">Login</h1>
	{#if form}
		{#if form.success}
			<div class="p-2 my-2 bg-green-500 text-white text-center rounded-md">{form.message}</div>
		{:else}
			<div class="p-2 my-2 bg-red-500 text-white text-center rounded-md">
				{form.message}
			</div>
		{/if}
	{/if}
	<div class="divide-y divide-white/20">
		<div>
			<form class="mt-6 mb-2" method="POST" use:enhance>
				<div class="flex flex-col">
					<label for="email">Email</label>
					<input
						class="appearance-none border border-white/20 focus:outline-none focus:border-white/25 bg-black p-2 my-2"
						type="text"
						id="email"
						name="email"
					/>
					<label for="password">Password</label>
					<input
						class="appearance-none border border-white/20 focus:outline-none focus:border-white/25 bg-black p-2 my-2"
						type="password"
						id="password"
						name="password"
					/>
					<div class="flex justify-end">
						<a href="/forgot-password" class="hover:underline text-blue-500">
							<small>Forgot Password ?</small>
						</a>
					</div>
					<div class="flex justify-end mb-4">
						<a href="/resend-confirmation" class="hover:underline duration-300 text-blue-500">
							<small>Resend Confirmation Email</small>
						</a>
					</div>
					<button class="w-full bg-blue-600 hover:bg-blue-700 duration-300 p-2 mt-2">Login</button>
				</div>
			</form>
		</div>
		<div>
			<a href="/register">
				<button class="w-full bg-blue-600 hover:bg-blue-700 duration-300 p-2 my-2"
					>Not registered ? Register</button
				>
			</a>
		</div>
	</div>
</main>
