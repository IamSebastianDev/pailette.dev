<!-- @format -->
<script lang="ts">
    import { health } from '../../stores/health.store';
    import Text from '../UI/Text.svelte';

    $: color = $health?.ok ? 'rgba(76, 175, 80, 0.7)' : 'rgba(244, 67, 54, 1)';
</script>

<div class="layout flex-row flex-align-center small">
    <div class="indicator" style="border-color: {color}; " />
    <Text size="small">
        Version: {$health?.version || '--'}
    </Text>
</div>

<style lang="scss">
    .indicator {
        width: 1.2rem;
        font-size: 1.2rem;
        aspect-ratio: 1 / 1;
        border-radius: 0.6rem;
        border-style: solid;
        border-width: 0.2rem;
    }
</style>
