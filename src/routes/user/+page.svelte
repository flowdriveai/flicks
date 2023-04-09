<script lang="ts">
    import 'app.css';
	import type { LayoutData } from '../$types';
	import type { PageData } from './$types';

    export let data: PageData;

    console.log("page data: ", data)
</script>

<main class="container flex flex-col mx-auto p-10 justify-center max-w-md relative">
	<h1 class="text-2xl font-bold text-center py-5">My Account</h1>


	<h1 class="text-xl font-bold py-5">Details</h1>
    <div class="flex place-content-between py-1">
        <div class="font-bold">Plan</div>
        <div class="flex">
            <div>Standard</div>
            <a class="text-green-600 absolute left-full hover:text-green-800" href="#"> Upgrade</a>
        </div>
    </div>
    <div class="flex place-content-between py-1">
        <div class="font-bold">Registered On</div>
        <div>
        {new Date(data.registered_on).toLocaleTimeString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
        })} 
        </div>
    </div>
    <div class="flex place-content-between py-1">
        <div class="font-bold">Last Login</div>
        <div>
        {new Date(data.last_login_at).toLocaleTimeString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
        })} 
        </div>
    </div>
    <div class="py-5"></div>
	<h1 class="text-xl font-bold py-5">Devices</h1>
    <div class="flex place-content-between py-1">
        <div class="font-mono font-bold">Oneplus Nord</div>
        <div class="flex">
            <a class="text-red-600 absolute left-full hover:text-red-800" href="#"> Revoke</a>
        </div>
    </div>
    <div class="flex place-content-between py-1">
        <div class="font-mono font-bold">Pixel 7A</div>
        <div class="flex">
            <a class="text-red-600 absolute left-full hover:text-red-800" href="#"> Revoke</a>
        </div>
    </div>
</main>