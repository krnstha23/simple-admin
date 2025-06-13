<script>
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { cn } from '$lib/utils.js';
    let { class: className, ...restProps } = $props();

    let showPassword = $state(false);
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
    <Card.Root>
        <Card.Header class="text-center">
            <Card.Title class="text-xl">User Login</Card.Title>
        </Card.Header>
        <Card.Content>
            <form method="POST">
                <div class="grid gap-6">
                    <div class="grid gap-6">
                        <div class="grid gap-3">
                            <Label for="email">Username</Label>
                            <Input
                                id="email"
                                type="text"
                                name="userName"
                                placeholder="user_name"
                                required
                            />
                        </div>
                        <div class="grid gap-3">
                            <div class="flex items-center">
                                <Label for="password">Password</Label>
                            </div>
                            <div class="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                />
                                <button
                                    type="button"
                                    onclick={() => (showPassword = !showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer border-0 bg-transparent"
                                >
                                    {#if !showPassword}
                                        <svg
                                            width="20"
                                            height="20"
                                            fill="#000"
                                            stroke="none"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.324 3.176l-.898.898 3.867 3.848 8.105 8.105 4.278 4.297.898-.898-3.965-3.965c2.561-1.304 4.47-3.142 4.59-3.262l.41-.41-.39-.45C21.058 11.153 17.247 6.75 12 6.75c-1.245 0-2.405.261-3.457.645l-4.219-4.22zM12 8c1.353 0 2.6.347 3.71.84a4.37 4.37 0 0 1 .665 2.285 4.351 4.351 0 0 1-1.152 2.95l-1.778-1.778c.26-.32.43-.728.43-1.172A1.879 1.879 0 0 0 12 9.25c-.444 0-.852.17-1.172.43L9.54 8.39C10.313 8.16 11.131 8 12 8zm-5.86.547C4.118 9.79 2.873 11.232 2.782 11.34l-.39.45.41.41c.178.177 4.26 4.164 8.613 4.51h.04c.18.016.365.04.546.04.18 0 .366-.024.547-.04h.039c.498-.038.998-.128 1.484-.253l-1.074-1.074a3.99 3.99 0 0 1-.488.078l-.078.02a5.05 5.05 0 0 1-.86 0l-.058-.02a4.364 4.364 0 0 1-3.887-4.336c0-.334.042-.657.117-.977L6.141 8.547zm.41 1.23c-.11.44-.175.887-.175 1.348 0 1.008.273 1.95.742 2.773a20.4 20.4 0 0 1-2.988-2.187A15.327 15.327 0 0 1 6.55 9.777zm10.9 0a14.877 14.877 0 0 1 2.402 1.953 20.174 20.174 0 0 1-2.97 2.168 5.58 5.58 0 0 0 .743-2.773c0-.459-.068-.908-.176-1.348zM12 10.5c.344 0 .625.28.625.625a.583.583 0 0 1-.078.273l-.82-.82A.583.583 0 0 1 12 10.5z"
                                            ></path>
                                        </svg>
                                    {:else}
                                        <svg
                                            width="20"
                                            height="20"
                                            fill="#000"
                                            stroke="none"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M12 7c-5.21 0-9.219 4.59-9.219 4.59l-.37.41.37.41s3.655 4.168 8.516 4.55c.232.03.464.04.703.04.24 0 .471-.01.703-.04 4.861-.382 8.516-4.55 8.516-4.55l.37-.41-.37-.41S17.21 7 12 7zm0 1.25c1.377 0 2.646.376 3.75.879.398.66.625 1.418.625 2.246a4.372 4.372 0 0 1-3.887 4.355c-.012.003-.027-.002-.039 0-.149.008-.298.02-.449.02-.166 0-.327-.01-.488-.02a4.372 4.372 0 0 1-3.887-4.355c0-.815.22-1.575.605-2.227h-.02c1.114-.512 2.398-.898 3.79-.898zm0 1.25a1.875 1.875 0 1 0 .001 3.751A1.875 1.875 0 0 0 12 9.5zm-5.469.586c-.097.42-.156.842-.156 1.289a5.58 5.58 0 0 0 .86 2.988A14.497 14.497 0 0 1 4.206 12c.3-.308 1.138-1.123 2.324-1.914zm10.938 0A14.957 14.957 0 0 1 19.793 12a14.497 14.497 0 0 1-3.027 2.363 5.58 5.58 0 0 0 .703-4.277z"
                                            ></path>
                                        </svg>
                                    {/if}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" class="w-full">Login</Button>
                    </div>
                </div>
            </form>
        </Card.Content>
    </Card.Root>
</div>
