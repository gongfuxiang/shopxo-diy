<template>
    <el-tooltip effect="dark" :show-after="200" :hide-after="200" :content="props.content" :raw-content="props.rawContent" placement="top">
        <icon name="help" size="12" color="#999"></icon>
    </el-tooltip>
</template>

<script lang="ts" setup>
interface TooltipProps {
    content: string;
    rawContent?: boolean;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

const props = withDefaults(defineProps<TooltipProps>(), {
    rawContent: true,
    placement: 'top',
});
</script>

