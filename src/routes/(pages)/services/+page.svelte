<script>
    export let data = [];
    import * as Table from '$lib/components/ui/table/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import CreateButton from '$lib/components/create-button.svelte';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { ActiveStatus } from '../../../enums/enums.js';
    import { goto } from '$app/navigation';
    import * as Pagination from '$lib/components/ui/pagination/index.js';
    import Toaster from 'svelte-french-toast';
</script>

<Table.Root class="text-center">
    <Table.Header>
        <Table.Row>
            <Table.Head class="w-[40px] text-center">S.N.</Table.Head>
            <Table.Head class="text-center">Service</Table.Head>
            <Table.Head class="w-[120px] text-center">Active Status</Table.Head>
            <Table.Head class="text-center">Action</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each data.services as post, index (post.id)}
            <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>
                    {#if post.activeStatus == ActiveStatus.Active}
                        <div
                            class="rounded-sm border-2 border-solid border-green-500 bg-green-200 p-2 text-gray-700"
                        >
                            Active
                        </div>
                    {:else}
                        <div
                            class="rounded-sm border-2 border-solid border-red-500 bg-red-200 p-2 text-gray-700"
                        >
                            Inactive
                        </div>
                    {/if}
                </Table.Cell>
                <Table.Cell>
                    <div>
                        <Button
                            onclick={() => goto(`/services/edit/${post.id}`)}
                            class="cursor-pointer bg-blue-600 hover:bg-blue-950"
                            >Edit
                        </Button>
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
                                        this service.
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

<!-- {#if data.post.totalPages > 1} -->
<!--     <Pagination.Root class="mt-5" count={data.post.totalPages} perPage={10}> -->
<!--         {#snippet children({ pages, currentPage })} -->
<!--             <Pagination.Content> -->
<!--                 <Pagination.Item> -->
<!--                     <Pagination.PrevButton /> -->
<!--                 </Pagination.Item> -->
<!---->
<!--                 {#each pages as page (page.key)} -->
<!--                     {#if page.type === 'ellipsis'} -->
<!--                         <Pagination.Item> -->
<!--                             <Pagination.Ellipsis /> -->
<!--                         </Pagination.Item> -->
<!--                     {:else} -->
<!--                         <Pagination.Item> -->
<!--                             <Pagination.Link {page} isActive={currentPage === page.value}> -->
<!--                                 {page.value} -->
<!--                             </Pagination.Link> -->
<!--                         </Pagination.Item> -->
<!--                     {/if} -->
<!--                 {/each} -->
<!---->
<!--                 <Pagination.Item> -->
<!--                     <Pagination.NextButton /> -->
<!--                 </Pagination.Item> -->
<!--             </Pagination.Content> -->
<!--         {/snippet} -->
<!--     </Pagination.Root> -->
<!-- {/if} -->

<CreateButton link="/services/create" />
