<script>
    import { ScaleOut } from 'svelte-loading-spinners';
    import { navigating } from '$app/stores';
</script>

{#if $navigating}
    <div class="w-4/5 flex justify-center items-center text-3xl text-white/20 font-extrabold">
        <ScaleOut size="120" color="#FFFFFF1a" unit="px" duration="0.75s" />
    </div>
{:else}
<div class="w-4/5 flex justify-center items-center text-3xl text-white/20 font-extrabold">
    <div>&#8592; Choose a Drive</div>
</div>
{/if}