<script>
    import { Button } from '$lib/components/ui/button/index.js';
    import { goto } from '$app/navigation';

    const data = $props();
</script>

<Button
    class="fixed right-10 bottom-8 h-12 w-12 cursor-pointer rounded-full border-2 border-blue-800 bg-blue-700 text-3xl font-bold 
    text-amber-50 shadow-md hover:bg-blue-950"
    onclick={() => goto(data.link)}
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-plus-icon lucide-plus"
    >
        <g transform="translate(12 12) scale(1.5) translate(-12 -12)">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </g>
    </svg>
</Button>
