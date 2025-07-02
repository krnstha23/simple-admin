<script>
    import { Button } from '$lib/components/ui/button/index.js';
    import { goto } from '$app/navigation';
    import { Plus } from 'lucide-svelte';

    const data = $props();
</script>

<Button
    class="custom-float-btn bottom-8 [&_svg:not([class*='size-'])]:size-6"
    onclick={() => goto(data.link)}><Plus /></Button
>
