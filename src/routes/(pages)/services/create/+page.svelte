<script>
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { ActiveStatus } from '../../../../enums/enums.js';
    import Textarea from '$lib/components/ui/textarea/textarea.svelte';
    import Select from '$lib/components/select.svelte';

    export let data;

    const activeList = Object.entries(ActiveStatus).map(([label, value]) => ({
        label,
        value: value === 1 ? 'Active' : 'Inactive'
    }));
</script>

<form method="POST">
    <Card.Root>
        <Card.Content>
            <div class="grid gap-6">
                <div class="grid gap-4">
                    <div class="grid w-full gap-1">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            bind:value={data.title}
                            required
                        />
                    </div>
                    <div class="grid w-full gap-1">
                        <Label for="description">Description</Label>
                        <Textarea
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Description"
                            bind:value={data.description}
                            required
                        />
                    </div>
                    <div class="grid w-full gap-1">
                        <Label for="activeStatus">Active Status</Label>
                        <Select name="activeStatus" holder="Active Status" list={activeList} />
                    </div>
                </div>

                <Button type="submit" class="custom-confirm-btn w-fit">Create</Button>
            </div>
        </Card.Content>
    </Card.Root>
</form>
