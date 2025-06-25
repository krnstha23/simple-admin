<script lang="ts">
    import * as Select from '$lib/components/ui/select/index.js';

    const data = $props();
    const options = data.list ?? [];
    const name = data.name;
    let selectedValue = $state(data.value ?? '');
    let holder = data.holder;
</script>

<Select.Root type="single" {name} bind:value={selectedValue}>
    <Select.Trigger class="w-full">{selectedValue == '' ? holder : selectedValue}</Select.Trigger>
    <Select.Content>
        {#each options as option (option.value)}
            <Select.Item value={option.value}>{option.label}</Select.Item>
        {/each}
    </Select.Content>
</Select.Root>
