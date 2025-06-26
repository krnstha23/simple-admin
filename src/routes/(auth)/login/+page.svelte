<script>
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Eye, EyeOff } from 'lucide-svelte';
    import { enhance } from '$app/forms';
    import toast from 'svelte-french-toast';
    import { goto } from '$app/navigation';
    import '../../../app.css';

    let showPassword = $state(false);
    let loading = $state(false);

    const submitLogin = () => {
        return async ({ result }) => {
            loading = true;
            try {
                const res = await result;
                if (!res) return;
                if (res.type == 'redirect') {
                    goto('/');
                    return;
                }

                switch (res.data.type) {
                    case 'success':
                        toast.success(res.error?.message || 'Login successful', {
                            position: 'top-right'
                        });
                        break;
                    case 'error':
                        toast.error(res.data.error?.message || 'Login failed', {
                            position: 'top-right'
                        });
                        break;
                    default:
                        toast.error('Unexpected response', {
                            position: 'top-right'
                        });
                }
            } catch (error) {
                toast.error(error.message || 'Processing failed', {
                    position: 'top-right'
                });
            } finally {
                loading = false;
            }
        };
    };
</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
        <div class="flex flex-col gap-6">
            <Card.Root>
                <Card.Header class="text-center">
                    <Card.Title class="text-xl">User Login</Card.Title>
                </Card.Header>
                <Card.Content>
                    <form method="POST" use:enhance={submitLogin}>
                        <div class="grid gap-6">
                            <div class="grid gap-6">
                                <div class="grid gap-3">
                                    <Label for="email">Username</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        name="userName"
                                        placeholder="user_name"
                                        disabled={loading}
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
                                            disabled={loading}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onclick={() => (showPassword = !showPassword)}
                                            aria-label={showPassword
                                                ? 'Hide password'
                                                : 'Show password'}
                                            class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer border-0 bg-transparent"
                                        >
                                            {#if !showPassword}
                                                <Eye />
                                            {:else}
                                                <EyeOff />
                                            {/if}
                                        </button>
                                    </div>
                                </div>
                                <Button type="submit" class="w-full" disabled={loading}
                                    >{loading ? 'Logging In...' : 'Login'}</Button
                                >
                            </div>
                        </div>
                    </form>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</div>
