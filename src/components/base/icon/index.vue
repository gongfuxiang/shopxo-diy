<template>
    <i class="iconfont" :class="className" :style="'font-size:' + size + 'px;' + (props.color.indexOf('#') !== -1 || props.color.indexOf('rgba') !== -1 ? 'color:' + props.color + ';' : '') + styles" @click="onClick">
        <slot></slot>
    </i>
</template>

<script lang="ts" setup>
const props = defineProps({
    // 通过传递类名，来自定义样式
    name: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: '',
    },
    styles: {
        type: String,
        default: '',
    },
});
// const className = ref(`icon-${props.name} ${props.color ? (props.color.indexOf('#') == -1 ? `cr-${props.color}` : '') : ''}`);
const className = computed(() => {
    return `icon-${props.name} ${props.color ? (props.color.indexOf('#') == -1 ? `cr-${props.color}` : '') : ''}`;
});
const emit = defineEmits(['click']);
function onClick() {
    // 回调方法
    emit('click');
}
</script>

<style lang="scss">
@import '@/assets/search-icons/iconfont.css';
@import '@/assets/icons/iconfont.css';
i.iconfont {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: inherit;
    gap: 0.5rem;
    &:hover {
        opacity: 0.8;
    }
}
</style>
