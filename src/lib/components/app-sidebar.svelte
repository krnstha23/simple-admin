<script module>
    // sample data

    // This is sample data.
    const data = {
        navMain: [
            {
                title: 'Dashboard',
                url: '/'
            },
            {
                title: 'Careers',
                url: '#',
                items: [
                    {
                        title: 'Career',
                        url: '#'
                    },
                    {
                        title: 'Career Categories',
                        url: '#'
                        // isActive: false,
                    }
                ]
            },
            {
                title: 'Pages',
                url: '#'
            },
            {
                title: 'Projects',
                url: '#'
            },
            {
                title: 'Services',
                url: '/services'
            },
            {
                title: 'Designations',
                url: '/designations'
            },
            {
                title: 'Settings',
                url: '#',
                items: [
                    {
                        title: 'Theme',
                        url: '#'
                    },
                    {
                        title: 'Contant',
                        url: '#'
                    },
                    {
                        title: 'Config',
                        url: '#'
                        // isActive: false,
                    }
                ]
            },
            {
                title: 'Users & Permissions',
                url: '#',
                items: [
                    {
                        title: 'Users',
                        url: '/users'
                    },
                    {
                        title: 'Users View',
                        url: '#'
                    },
                    {
                        title: 'Permissions',
                        url: '#'
                        // isActive: false,
                    }
                ]
            },
            {
                title: 'Salary Sheets',
                url: '#'
            }
        ]
    };
</script>

<script>
    import SearchForm from './search-form.svelte';
    import * as Collapsible from '$lib/components/ui/collapsible/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
    import MinusIcon from '@lucide/svelte/icons/minus';
    import PlusIcon from '@lucide/svelte/icons/plus';
    let { ref = $bindable(null), ...restProps } = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton size="lg">
                    {#snippet child({ props })}
                        <a href="/" {...props}>
                            <div
                                class="bg-sidebar-primary text-sidebar-primary-foreground
                                flex aspect-square size-8 items-center justify-center rounded-lg"
                            >
                                <GalleryVerticalEndIcon class="size-4" />
                            </div>
                            <div class="flex flex-col gap-0.5 leading-none">
                                <span class="font-medium">Simple Admin Panel</span>
                            </div>
                        </a>
                    {/snippet}
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
        <SearchForm />
    </Sidebar.Header>
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.Menu>
                {#each data.navMain as item, index (item.title)}
                    {#if item.items?.length}
                    <Collapsible.Root open={index === 15} class="group/collapsible">
                        <Sidebar.MenuItem>
                            <Collapsible.Trigger>
                                {#snippet child({ props })}
                                    <Sidebar.MenuButton {...props}>
                                        {item.title}
                                        <PlusIcon
                                            class="ml-auto group-data-[state=open]/collapsible:hidden"
                                        />
                                        <MinusIcon
                                            class="ml-auto group-data-[state=closed]/collapsible:hidden"
                                        />
                                    </Sidebar.MenuButton>
                                {/snippet}
                            </Collapsible.Trigger>
                            {#if item.items?.length}
                                <Collapsible.Content>
                                    <Sidebar.MenuSub>
                                        {#each item.items as subItem (subItem.title)}
                                            <Sidebar.MenuSubItem>
                                                <Sidebar.MenuSubButton isActive={subItem.isActive}>
                                                    {#snippet child({ props })}
                                                        <a href={subItem.url} {...props}
                                                            >{subItem.title}</a
                                                        >
                                                    {/snippet}
                                                </Sidebar.MenuSubButton>
                                            </Sidebar.MenuSubItem>
                                        {/each}
                                    </Sidebar.MenuSub>
                                </Collapsible.Content>
                            {/if}
                        </Sidebar.MenuItem>
                    </Collapsible.Root>
                    {:else}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                <a href={item.url}>{item.title}</a>
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {/if}
                {/each}
            </Sidebar.Menu>
        </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Rail />
</Sidebar.Root>
