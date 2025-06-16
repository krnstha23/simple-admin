<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import { Button } from '$lib/components/ui/button/index.js';

    const name = $props();
    let position = $state(name.value);
    const options = name.list ?? [];
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <Button {...props} variant="outline">
                {#if position == ''}
                    {name.name}
                {:else}
                    {position}
                {/if}
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
        <DropdownMenu.Group>
            <DropdownMenu.RadioGroup bind:value={position}>
                {#each options as option (option.value)}
                    <DropdownMenu.RadioItem value={option.value}>
                        {option.label}
                    </DropdownMenu.RadioItem>
                {/each}
            </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
</DropdownMenu.Root>
