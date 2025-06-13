<script>
    import * as Tabs from '$lib/components/ui/tabs/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import DatePicker from '$lib/components/date-picker.svelte';
    import { Textarea } from '$lib/components/ui/textarea/index.js';
    import DropdownMenu from '$lib/components/dropdown-menu.svelte';

    export let data;
</script>

<Tabs.Root value="general">
    <Tabs.List>
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="general">
        <Card.Root>
            <Card.Header class="text-center">
                <Card.Title class="text-left text-xl">General</Card.Title>
            </Card.Header>
            <Card.Content>
                <form method="POST">
                    <div class="grid gap-6">
                        <div class="grid gap-4">
                            <div class="flex w-full flex-col gap-3 md:flex-row">
                                <div class="grid w-full gap-1">
                                    <Label for="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        bind:value={data.firstName}
                                        required
                                    />
                                </div>
                                <div class="grid w-full gap-1">
                                    <Label for="middleName">Middle Name</Label>
                                    <Input
                                        id="middleName"
                                        type="text"
                                        name="middleName"
                                        placeholder="Middle Name"
                                    />
                                </div>
                                <div class="grid w-full gap-1">
                                    <Label for="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        bind:value={data.lastName}
                                        required
                                    />
                                </div>
                            </div>
                            <div class="grid gap-1">
                                <div class="flex items-center">
                                    <Label for="userName">User Name</Label>
                                </div>
                                <Input
                                    id="userName"
                                    name="userName"
                                    placeholder="userName"
                                    type="text"
                                    bind:value={data.userName}
                                    required
                                />
                            </div>
                            <div class="flex flex-col gap-3 md:flex-row">
                                <div class="grid gap-1">
                                    <div class="flex items-center">
                                        <Label for="dateOfBirth">Date Of Birth</Label>
                                    </div>
                                    <DatePicker />
                                </div>
                                <div class="grid gap-1">
                                    <div class="flex items-center">
                                        <Label for="email">Email</Label>
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Email Address"
                                        type="text"
                                        bind:value={data.email}
                                        required
                                    />
                                </div>

                                <div class="grid gap-1">
                                    <div class="flex items-center">
                                        <Label for="twitter">Twitter</Label>
                                    </div>
                                    <Input
                                        id="twitter"
                                        name="twitter"
                                        placeholder="Twitter Account"
                                        type="text"
                                        bind:value={data.twitter}
                                        required
                                    />
                                </div>

                                <div class="grid gap-1">
                                    <div class="flex items-center">
                                        <Label for="phoneNumber">Phone Number</Label>
                                    </div>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="9XX-XXXXXXX"
                                        type="tel"
                                        pattern="[0-9]{3}-[0-9]{7}"
                                        bind:value={data.phoneNumber}
                                        required
                                    />
                                </div>
                            </div>
                            <div class="grid gap-1">
                                <div class="flex items-center">
                                    <Label for="biography">Biography</Label>
                                </div>
                                <Textarea
                                    id="biography"
                                    name="biography"
                                    placeholder="Biography"
                                    type="text"
                                    bind:value={data.biography}
                                    required
                                />
                            </div>

                            <div class="grid gap-1">
                                <div class="flex items-center">
                                    <Label for="department">Department</Label>
                                </div>
                                <Input
                                    id="department"
                                    name="department"
                                    placeholder="Department"
                                    type="text"
                                    bind:value={data.department}
                                    required
                                />
                            </div>

                            <div class="flex flex-col gap-3 md:flex-row">
                                <div class="grid w-full gap-1">
                                    <div class="flex items-center">
                                        <Label for="activeStatus">Active Status</Label>
                                    </div>
                                    <DropdownMenu />
                                </div>

                                <div class="grid w-full gap-1">
                                    <div class="flex items-center">
                                        <Label for="userGroup">User Group</Label>
                                    </div>
                                    <DropdownMenu />
                                </div>
                            </div>
                            <Button type="submit" class="w-fit bg-blue-600 hover:bg-blue-800"
                                >Update</Button
                            >
                        </div>
                    </div>
                </form>
            </Card.Content>
        </Card.Root>
    </Tabs.Content>
</Tabs.Root>
