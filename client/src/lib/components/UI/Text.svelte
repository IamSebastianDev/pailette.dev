<!-- @format -->
<script lang="ts">
    import { joinClassNames } from '../../../utils';

    /**
     * @type { 'small' | 'regular' }
     * @description
     * Font-size of the text component.
     */
    export let size: 'small' | 'regular' = 'regular';

    /**
     * @type { 'relaxed' | 'tight' }
     * @description
     * Line-height of the text component.
     */
    export let spacing: 'relaxed' | 'tight' = 'relaxed';

    /**
     * @type { 'wide' | 'normal' }
     * @description
     * Tracking of the text component.
     */
    export let tracking: 'wide' | 'normal' = 'normal';

    /**
     * @type { boolean }
     * @description
     * Boolean flag indicating if the text should be bold.
     */
    export let bold: boolean = false;

    export let classes: string[] = [];
</script>

<span class={joinClassNames('text', bold ? 'bold' : null, size, spacing, tracking, ...classes)}>
    <slot />
</span>

<style lang="scss">
    .text {
        font-family: inherit;

        &.bold {
            font-weight: 500;
        }

        &.wide {
            letter-spacing: 0.1rem;
        }

        &.normal {
            letter-spacing: inherit;
        }

        &.relaxed {
            line-height: 1.8rem;
        }

        &.tight {
            line-height: 1.2rem;
        }

        &.small {
            font-size: 1.2rem;
        }

        &.regular {
            font-size: 1.5rem;
        }
    }
</style>
