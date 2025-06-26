<script>
    let { children } = $props();
    import { Toaster } from 'svelte-french-toast';
    import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
{@render children()}
<Toaster />
