<script lang="ts">
    export let data = [];
    import * as Table from '$lib/components/ui/table/index.js';
    import { Button } from '$lib/components/ui/button/index.js';

    import { ActiveStauts } from '../../../enums/enums.js';
    import { goto } from '$app/navigation';
</script>

<Table.Root class="text-center">
    <Table.Header>
        <Table.Row>
            <Table.Head class="w-[40px] text-center">S.N.</Table.Head>
            <Table.Head class="text-center">User Name</Table.Head>
            <Table.Head class="text-center">User Group</Table.Head>
            <Table.Head class="text-center">Active Status</Table.Head>
            <Table.Head class="text-center">Action</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each data.users as user, index (user.id)}
            <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{user.userName}</Table.Cell>
                <Table.Cell>{user.designation}</Table.Cell>
                <Table.Cell>
                    {#if user.activeStatus == ActiveStauts.Active}
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
                            onclick={() => goto(`/users/edit/${user.id}`)}
                            class="cursor-pointer bg-blue-600 hover:bg-blue-950">Edit</Button
                        >
                        <Button class="cursor-pointer bg-red-600 hover:bg-red-950">Delete</Button>
                    </div>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
