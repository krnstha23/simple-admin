<script lang="ts">
    export let data;
    import * as Table from '$lib/components/ui/table/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Plus } from 'lucide-svelte';
</script>

<Table.Root class="text-center">
    <Table.Header>
        <Table.Row>
            <Table.Head class="w-[40px] text-center">S.N.</Table.Head>
            <Table.Head class="text-center">Designation</Table.Head>
            <Table.Head class="text-center">Action</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each data.post as post, index (post.id)}
            <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{post.designation}</Table.Cell>
                <Table.Cell>
                    <div>
                        <!-- <Button -->
                        <!--     onclick={() => goto(`/users/edit/${post.id}`)} -->
                        <!--     class="cursor-pointer bg-blue-600 hover:bg-blue-950">Edit</Button -->
                        <!-- > -->
                        <Dialog.Root>
                            <Dialog.Trigger class="custom-delete-btn">Delete</Dialog.Trigger>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
                                    <Dialog.Description>
                                        This action cannot be undone. This will permanently delete
                                        this designation.
                                        <div class="flex justify-center gap-3">
                                            <form method="POST" action="?/delete">
                                                <Input
                                                    type="hidden"
                                                    name="designationId"
                                                    id="desginationId"
                                                    bind:value={post.id}
                                                    required
                                                />
                                                <Button type="submit" class="custom-delete-btn mt-4"
                                                    >Delete</Button
                                                >
                                            </form>
                                            <Dialog.Close>
                                                <Button class=" custom-confirm-btn mt-4"
                                                    >Close</Button
                                                >
                                            </Dialog.Close>
                                        </div>
                                    </Dialog.Description>
                                </Dialog.Header>
                            </Dialog.Content>
                        </Dialog.Root>
                    </div>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>

<Dialog.Root>
    <Dialog.Trigger class="custom-create-btn flex items-center justify-center">
        <Plus />
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Add new designation</Dialog.Title>
            <Dialog.Description>
                <form method="POST" action="?/save">
                    <Input
                        type="text"
                        class="mt-1 mb-3 w-full"
                        name="designation"
                        id="desgination"
                        required
                    />
                    <Button class="custom-confirm-btn">Save</Button>
                </form>
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>
