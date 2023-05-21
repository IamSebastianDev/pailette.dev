<!-- @format -->
<script lang="ts">
    import { joinClassNames } from '../../../../utils/joinClassNames';
    /**
     * @type {string[]}
     * @description
     * Additional classnames to add.
     */
    export let classes: string[] = [];
</script>

<p class={joinClassNames(...classes)}>
    <slot />
</p>
