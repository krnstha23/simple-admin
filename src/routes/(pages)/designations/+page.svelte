<script>
    let { data } = $props();

    import * as Table from '$lib/components/ui/table/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Plus } from 'lucide-svelte';
    import toast from 'svelte-french-toast';
    import { onMount } from 'svelte';
    import { invalidateAll } from '$app/navigation';
    import DeleteDialog from '$lib/components/delete-dialog.svelte';
    import { enhance } from '$app/forms';

    let loading = $state(false);
    let open = $state(false);
    let createDialog = $state(false);

    onMount(() => {
        if (data.type == 'error') {
            toast.error(data.error?.message || 'Unable to load sevices', {
                position: 'top-right'
            });
        }

        if (data.type != 'error' && data.data.length < 1) {
            toast.error('No data found', {
                position: 'top-right'
            });
        }
    });

    const saveToast = () => {
        return async ({ result }) => {
            loading = true;
            try {
                const res = await result;
                if (!res) return;

                switch (res.type) {
                    case 'success':
                        if (res.data.type === 'error') {
                            toast.error(
                                res.data.error?.message || 'Unable to create the designation',
                                {
                                    position: 'top-right'
                                }
                            );
                        } else {
                            toast.success('New designation has been created', {
                                position: 'top-right'
                            });
                        }
                        createDialog = false;
                        await invalidateAll();
                        break;
                    case 'error':
                        toast.error(res.data.error?.message || 'Unable to create new designation', {
                            position: 'top-right'
                        });
                        break;
                    default:
                        toast.error('Unexpected response', {
                            position: 'top-right'
                        });
                }
            } catch (error) {
                toast.error(error.message || 'Processing failed to create new designation', {
                    position: 'top-right'
                });
            } finally {
                loading = false;
            }
        };
    };

    const deleteToast = () => {
        return async ({ result }) => {
            loading = true;
            try {
                const res = await result;
                if (!res) return;

                switch (res.type) {
                    case 'success':
                        if (res.data.type === 'error') {
                            open = true;
                            toast.error(
                                res.data.error?.message || 'Unable to delete the designation',
                                {
                                    position: 'top-right'
                                }
                            );
                        }
                        break;
                    case 'error':
                        toast.error(res.data.error?.message || 'Unable to delete the designation', {
                            position: 'top-right'
                        });
                        break;
                    case 'redirect':
                        await invalidateAll();
                        toast.success(res.error?.message || 'The designation has been deleted', {
                            position: 'top-right'
                        });
                        break;
                    default:
                        toast.error('Unexpected response', {
                            position: 'top-right'
                        });
                }
            } catch (error) {
                toast.error(error.message || 'Processing failed to delete the designation', {
                    position: 'top-right'
                });
            } finally {
                loading = false;
            }
        };
    };
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
        {#if data.data != 'undefined'}
            {#each data.data as post, index (post.id)}
                <Table.Row>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{post.designation}</Table.Cell>
                    <Table.Cell>
                        <div>
                            <!-- <Button -->
                            <!--     onclick={() => goto(`/users/edit/${post.id}`)} -->
                            <!--     class="cursor-pointer bg-blue-600 hover:bg-blue-950">Edit</Button -->
                            <!-- > -->

                            <DeleteDialog
                                name="designationId"
                                id={post.id}
                                {open}
                                deleteHandler={deleteToast}
                            />
                        </div>
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/if}
    </Table.Body>
</Table.Root>

<Dialog.Root bind:open={createDialog}>
    <Dialog.Trigger
        on:click={() => (createDialog = true)}
        class="custom-float-btn bottom-8 flex items-center justify-center"
    >
        <Plus />
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Add new designation</Dialog.Title>
            <Dialog.Description>
                <form method="POST" action="?/create" use:enhance={saveToast}>
                    <Input
                        type="text"
                        class="mt-1 mb-3 w-full"
                        name="designation"
                        id="desgination"
                    />
                    <Button type="submit" class="custom-confirm-btn">Save</Button>
                </form>
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>
