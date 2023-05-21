<!-- @format -->
<script lang="ts">
    import { Refresh, CheckmarkCircle, CircleX } from 'svelte-pangolicons';
    import { version } from '../../stores/version.store';
    import { joinClassNames } from '../../../utils/';
    import type { VersionStoreData } from '../../../types';
    import Text from '../UI/Text/Text.svelte';
    const { loading, data } = version;

    const getTheme = (loading: boolean, data: VersionStoreData | null) => {
        return {
            icon: loading ? Refresh : data && data.ok ? CheckmarkCircle : CircleX,
            status: loading ? 'state-loading' : data && data.ok ? 'state-success' : 'state-error',
        };
    };

    $: ({ icon, status } = getTheme($loading, $data));
</script>

<div class="layout flex-row flex-align-center container">
    <div class={joinClassNames('indicator', status)}>
        <svelte:component this={icon} size={'1.6rem'} />
    </div>
    <Text tracking={'wide'} bold={true} size={'small'}>
        {#if !$loading}
            v{$data?.version ?? '--'}
            {$data?.ok ? '- OK' : '- ERROR'}
        {:else}
            v ----------
        {/if}
    </Text>
</div>

<style lang="scss">
    .container {
        padding: 0.4rem;
        gap: 0.8rem;

        font-family: var(--ui-fonts-heading);
        color: var(--ui-color-text-60);
    }

    .indicator {
        &.state-loading {
            animation: spin 1.4s ease-out infinite;
        }

        &.state-error {
            color: var(--ui-color-semantic-error);
        }
        &.state-success {
            color: var(--ui-color-semantic-success);
        }
    }
</style>
