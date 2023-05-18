<!-- @format -->
<script lang="ts">
    import { joinClassNames } from '../../../utils/joinClassnames';

    export let size: 'small' | 'regular' | 'large' = 'regular';
    export let spacing: 'relaxed' | 'normal' | 'tight' = 'normal';
</script>

<span class={joinClassNames(size, spacing)}>
    <slot />
</span>

<style>
    .relaxed {
        line-height: 2rem;
    }

    .normal {
        line-height: 1.6rem;
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

    .large {
        font-size: 2.1rem;
    }
</style>
