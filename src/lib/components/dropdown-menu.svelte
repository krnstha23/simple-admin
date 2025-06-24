<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import { createEventDispatcher } from 'svelte';

    const attri = $props();
    let position = $state(attri.value);
    const options = attri.list ?? [];
    const name = attri.name;

    const dispatch = createEventDispatcher();

    function onSelect(newValue) {
        position = newValue;
        dispatch('change', { position });
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <Button {...props} variant="outline">
                {#if position == ''}
                    {name}
                {:else}
                    {position}
                {/if}
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-80">
        <DropdownMenu.Group>
            <DropdownMenu.RadioGroup
                {name}
                bind:value={position}
                on:change={() => onSelect(position)}
            >
                {#each options as option (option.value)}
                    <DropdownMenu.RadioItem value={option.value}>
                        {option.label}
                    </DropdownMenu.RadioItem>
                {/each}
            </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
</DropdownMenu.Root>
