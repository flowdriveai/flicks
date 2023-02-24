<script>
  import { page } from '$app/stores';
  import 'app.css';
</script>

<div class="flex flex-col justify-center items-center text-white/20 font-extrabold h-[calc(100vh-5rem)]">
    <div class="text-5xl pb-5">{$page.status}</div> 
</div>