<script>
	import '../../app.css';
</script>

<main class="container flex flex-col mx-auto p-10 justify-center max-w-md">
	<h1 class="text-2xl font-bold text-center p-5">Login</h1>
	<div>
		<div class="p-2 my-2 bg-green-500 text-white text-center rounded-md">Success</div>
		<div class="p-2 my-2 bg-red-500 text-white text-center rounded-md">Fail</div>
		<div class="p-2 my-2 bg-yellow-500 text-white text-center rounded-md">Warning</div>
	</div>
	<div class="divide-y divide-white/20">
		<div>
			<form class="mt-6 mb-2" method="POST">
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
					<div class="flex justify-end mb-4">
						<a href="/forgot-password" class="hover:underline text-blue-500">
							<small>Forgot Password ?</small>
						</a>
					</div>
					<button class="w-full bg-blue-600 hover:bg-blue-700 p-2 mt-2">Login</button>
				</div>
			</form>
		</div>
		<div>
			<a href="/register">
				<button class="w-full bg-blue-600 hover:bg-blue-700 p-2 my-2"
					>Not registered ? Register</button
				>
			</a>
		</div>
	</div>
</main>
