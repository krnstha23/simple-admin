<script>
    let { children } = $props();
    import { Toaster } from 'svelte-french-toast';
</script>

{@render children()}
<Toaster />
