<!-- @format -->
<script lang="ts">
    import { health } from '../../stores/health.store';
    import Text from '../UI/Text.svelte';

    $: color = $health?.ok ? 'var(--ui-color-semantic-success)' : 'var(--ui-color-semantic-error)';
</script>

<div class="layout flex-row flex-align-center small container">
    <div class="indicator" style="border-color: {color}; " />
    <Text size="small" spacing="tight">
        Version: {$health?.version || '--'}
    </Text>
</div>

<style lang="scss">
    .container {
        padding: 0.4rem;
    }

    .indicator {
        width: 1.2rem;
        font-size: 1.2rem;
        aspect-ratio: 1 / 1;
        border-radius: 0.6rem;
        border-style: solid;
        border-width: 0.2rem;
    }
</style>
