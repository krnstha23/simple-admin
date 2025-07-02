<script>
    import { Input } from '$lib/components/ui/input/index.js';

    let { total, onPageChange, current } = $props();
</script>

{#if total > 1}
    <div class="my-3 flex items-center justify-center gap-2">
        <Input
            type="number"
            class="w-[150px]"
            min="1"
            max={total}
            oninput={onPageChange}
            id="pagination"
            bind:value={current}
        />
        <label for="pagination"> Total Pages : {total} </label>
    </div>
{/if}
