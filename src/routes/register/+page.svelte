<script>
	import '../../app.css';
</script>

<main class="container flex flex-col mx-auto p-10 justify-center max-w-md">
	<h1 class="text-2xl font-bold text-center p-5">Register</h1>
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
					<button class="w-full bg-blue-600 hover:bg-blue-700 p-2 mt-2">Register</button>
				</div>
			</form>
		</div>
		<div>
			<a href="/login">
				<button class="w-full bg-blue-600 hover:bg-blue-700 p-2 my-2"
					>Already registered ? Login</button
				>
			</a>
		</div>
	</div>
</main>
