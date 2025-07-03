<script>
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { ActiveStatus } from '../../../../enums/enums.js';
    import Textarea from '$lib/components/ui/textarea/textarea.svelte';
    import Select from '$lib/components/select.svelte';
    import toast from 'svelte-french-toast';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let loading = $state(false);

    const activeList = Object.entries(ActiveStatus).map(([label, value]) => ({
        label,
        value: value === 1 ? 'Active' : 'Inactive'
    }));

    const saveToast = () => {
        return async ({ result }) => {
            loading = true;
            try {
                const res = await result;
                if (!res) return;
                console.log(res);

                switch (res.type) {
                    case 'success':
                        if (res.data.type === 'error') {
                            toast.error(res.data.error?.message || 'Unable to create the service', {
                                position: 'top-right'
                            });
                        }
                        break;
                    case 'error':
                        toast.error(res.data.error?.message || 'Unable to create the service', {
                            position: 'top-right'
                        });
                        break;
                    case 'redirect':
                        goto('/services');
                        toast.success(res.error?.message || 'The service has been created', {
                            position: 'top-right'
                        });
                        break;
                    default:
                        toast.error('Unexpected response', {
                            position: 'top-right'
                        });
                }
            } catch (error) {
                toast.error(error.message || 'Processing failed to create the service', {
                    position: 'top-right'
                });
            } finally {
                loading = false;
                open = false;
            }
        };
    };
</script>

<form method="POST" use:enhance={saveToast}>
    <Card.Root>
        <Card.Content>
            <div class="grid gap-6">
                <div class="grid gap-4">
                    <div class="grid w-full gap-1">
                        <Label for="title">Title</Label>
                        <Input id="title" type="text" name="title" placeholder="Title" required />
                    </div>
                    <div class="grid w-full gap-1">
                        <Label for="url">Url</Label>
                        <Input id="url" type="text" name="url" placeholder="Url" required />
                    </div>
                    <div class="grid w-full gap-1">
                        <Label for="metaTitle">Meta Title</Label>
                        <Input
                            id="metaTitle"
                            type="text"
                            name="metaTitle"
                            placeholder="Meta Title"
                            required
                        />
                    </div>
                    <div class="grid w-full gap-1">
                        <Label for="metaDescription">Meta Description</Label>
                        <Input
                            id="metaDescription"
                            type="text"
                            name="metaDescription"
                            placeholder="Meta Description"
                            required
                        />
                    </div>
                    <div class="grid w-full gap-1">
                        <Label for="content">Content</Label>
                        <Textarea
                            id="content"
                            type="text"
                            name="content"
                            placeholder="content"
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
