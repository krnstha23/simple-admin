<script>
    import * as Tabs from '$lib/components/ui/tabs/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import DatePicker from '$lib/components/date-picker.svelte';
    import { Textarea } from '$lib/components/ui/textarea/index.js';
    import { ActiveStatus } from '../../../../../enums/enums.js';

    export let data;
    const activeList = Object.entries(ActiveStatus).map(([label, value]) => ({
        label,
        value: value === 1 ? 'Active' : 'Inactive'
    }));
</script>

<Tabs.Root value="general">
    <Tabs.List>
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="general">
        <form method="POST">
            <Card.Root>
                <Card.Header class="text-center">
                    <Card.Title class="-mb-4 text-left text-xl">General</Card.Title>
                </Card.Header>
                <Card.Content>
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
                                <div class="grid w-full gap-1">
                                    <div class="flex items-center">
                                        <Label for="dateOfBirth">Date Of Birth</Label>
                                    </div>
                                    <DatePicker />
                                </div>
                                <div class="grid w-full gap-1">
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

                                <div class="grid w-full gap-1">
                                    <div class="flex items-center">
                                        <Label for="twitter">Twitter</Label>
                                    </div>
                                    <Input
                                        id="twitter"
                                        name="twitter"
                                        placeholder="Twitter Account"
                                        type="text"
                                        bind:value={data.twitter}
                                    />
                                </div>

                                <div class="grid w-full gap-1">
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
                                </div>

                                <div class="grid w-full gap-1">
                                    <div class="flex items-center">
                                        <Label for="userGroup">User Group</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Content>
            </Card.Root>

            <Card.Root class="mt-4">
                <Card.Header class="text-center">
                    <Card.Title class="-mb-4 text-left text-xl">Permanent Address</Card.Title>
                </Card.Header>
                <Card.Content>
                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-2 md:flex-row">
                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="addressLine1">Address Line 1</Label>
                                </div>
                                <Input
                                    id="addressLine1"
                                    name="addressLine1"
                                    placeholder="AddressLine1"
                                    type="text"
                                    bind:value={data.permanentAddresses.addressLine1}
                                    required
                                />
                            </div>

                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="addressLine2">Address Line 2</Label>
                                </div>
                                <Input
                                    id="addressLine2"
                                    name="addressLine2"
                                    placeholder="addressLine2"
                                    type="text"
                                    bind:value={data.permanentAddresses.addressLine2}
                                    required
                                />
                            </div>
                        </div>

                        <div class="flex flex-col gap-2 md:flex-row">
                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="city">City</Label>
                                </div>
                                <Input
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                    bind:value={data.permanentAddresses.city}
                                    required
                                />
                            </div>

                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="state">State</Label>
                                </div>
                                <Input
                                    id="state"
                                    name="state"
                                    placeholder="State"
                                    type="text"
                                    bind:value={data.permanentAddresses.state}
                                    required
                                />
                            </div>

                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="zipCode">Zip Code</Label>
                                </div>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    placeholder="zipCode"
                                    type="number"
                                    bind:value={data.permanentAddresses.zipCode}
                                    required
                                />
                            </div>

                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="country">Country</Label>
                                </div>
                                <Input
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                    bind:value={data.permanentAddresses.country}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </Card.Content>
            </Card.Root>

            <Card.Root class="mt-4">
                <Card.Header class="text-center">
                    <Card.Title class="-mb-4 text-left text-xl">Temporary Address</Card.Title>
                </Card.Header>
                <Card.Content>
                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-2 md:flex-row">
                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="addressLine1">Address Line 1</Label>
                                </div>
                                <Input
                                    id="addressLine1"
                                    name="addressLine1"
                                    placeholder="AddressLine1"
                                    type="text"
                                    bind:value={data.temporaryAddresses.addressLine1}
                                    required
                                />
                            </div>

                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="addressLine2">Address Line 2</Label>
                                </div>
                                <Input
                                    id="addressLine2"
                                    name="addressLine2"
                                    placeholder="addressLine2"
                                    type="text"
                                    bind:value={data.temporaryAddresses.addressLine2}
                                    required
                                />
                            </div>
                        </div>

                        <div class="flex flex-col gap-2 md:flex-row">
                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="city">City</Label>
                                </div>
                                <Input
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                    bind:value={data.temporaryAddresses.city}
                                    required
                                />
                            </div>

                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="state">State</Label>
                                </div>
                                <Input
                                    id="state"
                                    name="state"
                                    placeholder="State"
                                    type="text"
                                    bind:value={data.temporaryAddresses.state}
                                    required
                                />
                            </div>

                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="zipCode">Zip Code</Label>
                                </div>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    placeholder="zipCode"
                                    type="number"
                                    bind:value={data.temporaryAddresses.zipCode}
                                    required
                                />
                            </div>

                            <div class="grid w-full gap-1">
                                <div class="flex items-center">
                                    <Label for="country">Country</Label>
                                </div>
                                <Input
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                    bind:value={data.temporaryAddresses.country}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </Card.Content>
            </Card.Root>

            <Button type="submit" class="mt-2 w-fit bg-blue-600 hover:bg-blue-800">Update</Button>
        </form>
    </Tabs.Content>
</Tabs.Root>
