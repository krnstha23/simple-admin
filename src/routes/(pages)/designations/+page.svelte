<script lang="ts">
    export let data = [];
    import * as Table from '$lib/components/ui/table/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
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
                            <Dialog.Trigger>
                                <Button class="cursor-pointer bg-red-600 hover:bg-red-950"
                                    >Delete</Button
                                >
                            </Dialog.Trigger>
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
                                                <Button
                                                    type="submit"
                                                    class="mt-4 cursor-pointer bg-red-600 hover:bg-red-950"
                                                    >Delete</Button
                                                >
                                            </form>
                                            <Dialog.Close>
                                                <Button
                                                    class="cursor-poinnter mt-4 bg-green-600 hover:bg-green-950"
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
    <Dialog.Trigger
        class="fixed right-10 bottom-8 h-12 w-12 cursor-pointer rounded-full border-2 border-blue-800 bg-blue-700 text-3xl font-bold 
        text-amber-50 shadow-md hover:bg-blue-950"
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
                    <Button class="cursor-pointer bg-green-600 hover:bg-green-950">Save</Button>
                </form>
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>
