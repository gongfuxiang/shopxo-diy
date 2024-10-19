<template>
    <div class="flex align-c jc-c suspension pa-5" :style="style">
        <div class="spread flex align-c jc-c">
            <template v-if="new_style.float_style == 'diffuse'">
                <div class="ring"></div>
                <div class="ring"></div>
            </template>
            <image-empty v-model="form.button_img[0]" :class="{'shadow': new_style.float_style == 'shadow'}" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { percentage_count } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
const style = ref('');
// 用于页面判断显示
const state = reactive({
    form: props.value?.content || {},
    new_style: props.value?.style || {},
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);
const color = computed(() => new_style.value.float_style_color)

const emits = defineEmits(['change']);
// 内容参数的集合
watch(props.value, (val) => {
    // 内容
    form.value = val?.content || {};
    // 样式
    new_style.value = val?.style || {};
    let location = `justify-content: flex-end;`;
    if (new_style.value.display_location == 'left') {
        location = `justify-content: flex-start;`;
    }

    style.value = location;
    emits('change', { bottom: new_style.value.offset_number, location: new_style.value.display_location });
}, {immediate: true, deep: true});
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    .image-slot img {
        width: 3rem;
        height: 3rem
    }
}
.shadow {
    box-shadow: 0 0 20px v-bind(color);
}
/**
* 呼吸灯
*/
.spread {
    position: relative;
    z-index: 1;
    width: 6rem;
    height: 6rem;
}
.spread .ring {
    /* 速度为1.5 * 层数 = 实际运行速度，速度修改则 animation-delay 属性也修改相同速度 */
    animation: pulsing 1.5s ease-out infinite;
    background-color: v-bind(color);
    border-radius: 100%;
    width: 5rem;
    height: 5rem;
    position: absolute;
}
/* 速度为1*层数 */
.spread .ring:nth-of-type(1) {
    -webkit-animation-delay: -1.5s;
    animation-delay: -1.5s;
}

/* 速度为1*层数 */
.spread .ring:nth-of-type(2) {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
}
@keyframes pulsing {
    100% {
        transform: scale(1.35);
        opacity: 0
    }
}
</style>
