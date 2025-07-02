<script>
    import { Button } from '$lib/components/ui/button/index.js';
    import { Funnel } from 'lucide-svelte';

    const { toggleFilter } = $props();
</script>

<Button
    class="custom-float-btn bottom-24 [&_svg:not([class*='size-'])]:size-6"
    onclick={toggleFilter}><Funnel /></Button
>
