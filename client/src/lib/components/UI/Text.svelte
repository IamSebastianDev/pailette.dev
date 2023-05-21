<!-- @format -->
<script lang="ts">
    import { joinClassNames } from '../../../utils';

    export let size: 'small' | 'regular' = 'regular';
    export let spacing: 'relaxed' | 'tight' = 'relaxed';
    export let classes: string[] = [];
</script>

<span class={joinClassNames(size, spacing, ...classes)}>
    <slot />
</span>

<style>
    .relaxed {
        line-height: 1.8rem;
    }

    .tight {
        line-height: 1.2rem;
    }

    .small {
        font-size: 1.2rem;
    }

    .regular {
        font-size: 1.6rem;
    }
</style>
