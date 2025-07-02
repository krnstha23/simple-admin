<script>
    let { data } = $props();

    import * as Card from '$lib/components/ui/card/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import * as Table from '$lib/components/ui/table/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import CreateButton from '$lib/components/create-button.svelte';
    import FilterButton from '$lib/components/filter-button.svelte';
    import { ActiveStatus } from '../../../enums/enums.js';
    import { goto } from '$app/navigation';
    import toast from 'svelte-french-toast';
    import { invalidateAll } from '$app/navigation';
    import DeleteDialog from '$lib/components/delete-dialog.svelte';
    import Pagination from '$lib/components/pagination.svelte';
    import { onMount } from 'svelte';
    import Select from '$lib/components/select.svelte';
    import { slide } from 'svelte/transition';

    let loading = $state(false);
    let open = $state(false);
    let toggleFilter = $state(false);
    let currentPage = data.page + 1;
    const activeList = Object.entries(ActiveStatus).map(([label, value]) => ({
        label,
        value: value === 1 ? 'Active' : 'Inactive'
    }));

    onMount(() => {
        if (data.type == 'error') {
            toast.error(data.error?.message || 'Unable to load sevices', {
                position: 'top-right'
            });
        }

        if (data.services.length < 1) {
            toast.error('No data found', {
                position: 'top-right'
            });
        }
    });

    function toggleFilterState() {
        toggleFilter = !toggleFilter;
    }

    function onPageChange(event) {
        const newPage = event.target.value;
        if (newPage && !isNaN(newPage) && Number(newPage) > 0) {
            goto(`?page=${newPage}`, { replaceState: true });
        }
    }

    function onFilterChange(event) {
        const urlParams = new URLSearchParams(window.location.search);

        let name, value;

        if (event && event.target) {
            name = event.target.name;
            value = event.target.value;
        } else {
            name = 'activeStatus';
            value = event;
        }

        if (value && value !== '' && value !== 'undefined') {
            urlParams.set(name, value);
        } else {
            urlParams.delete(name);
        }
        const newQuery = urlParams.toString();
        goto(`?${newQuery}`, { replaceState: true });
    }

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
                            toast.error(res.data.error?.message || 'Unable to delete the service', {
                                position: 'top-right'
                            });
                        }
                        break;
                    case 'error':
                        toast.error(res.data.error?.message || 'Unable to delete the service', {
                            position: 'top-right'
                        });
                        break;
                    case 'redirect':
                        await invalidateAll();
                        toast.success(res.error?.message || 'The service has been deleted', {
                            position: 'top-right'
                        });
                        break;
                    default:
                        toast.error('Unexpected response', {
                            position: 'top-right'
                        });
                }
            } catch (error) {
                toast.error(error.message || 'Processing failed to delete the service', {
                    position: 'top-right'
                });
            } finally {
                loading = false;
                open = false;
            }
        };
    };
</script>

{#if toggleFilter}
    <div transition:slide={{ duration: 300 }}>
        <Card.Root class="mb-3">
            <Card.Header class="text-center">
                <Card.Title class="-mb-4 text-left text-xl">Filter</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="grid gap-6">
                    <div class="flex w-full flex-col gap-3 md:flex-row">
                        <div class="grid w-full gap-1">
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                onchange={onFilterChange}
                                placeholder="Title"
                            />
                        </div>
                        <div class="grid w-full gap-1">
                            <Label for="activeStatus">Active Status</Label>
                            <Select
                                name="activeStatus"
                                holder="Active Status"
                                changeHandler={onFilterChange}
                                list={activeList}
                            />
                        </div>
                    </div>
                </div>
            </Card.Content>
        </Card.Root>
    </div>
{/if}

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
                        <div class="custom-active-btn">Active</div>
                    {:else}
                        <div class="custom-inactive-btn">Inactive</div>
                    {/if}
                </Table.Cell>
                <Table.Cell>
                    <Button
                        onclick={() => goto(`/services/edit/${post.id}`)}
                        class="custom-edit-btn"
                        >Edit
                    </Button>
                    <DeleteDialog
                        name="designationId"
                        id={post.id}
                        {open}
                        deleteHandler={deleteToast}
                    />
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>

<Pagination total={data.totalPages} {onPageChange} current={currentPage} />

<CreateButton link="/services/create" />
<FilterButton toggleFilter={toggleFilterState} />
