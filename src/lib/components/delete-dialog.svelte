<script>
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { enhance } from '$app/forms';

    let { deleteHandler, name, id, open } = $props();
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger on:click={() => (open = true)} class="custom-delete-btn">Delete</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
            <Dialog.Description>
                This action cannot be undone. This will permanently delete this service.
                <div class="flex justify-center gap-3">
                    <form method="POST" action="?/delete" use:enhance={deleteHandler}>
                        <Input type="hidden" {name} id="Id" bind:value={id} required />
                        <Button type="submit" class="custom-delete-btn mt-4">Delete</Button>
                    </form>
                    <Dialog.Close>
                        <Button class="custom-confirm-btn mt-4">Close</Button>
                    </Dialog.Close>
                </div>
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>
