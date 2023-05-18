<!-- @format -->
<script lang="ts">
    export let size: 'small' | 'regular' | 'large' = 'regular';
</script>

<span class={size}>
    <slot />
</span>

<style>
    .small {
        font-size: 1.2rem;
    }

    .regular {
        font-size: 1.6rem;
    }

    .large {
        font-size: 2.1rem;
    }
</style>
