<template>
    <div class="container">
        <template v-if="type == '1'">
            <footer-nav-content :value="form.content" :footer-style="form.style" :config="config" :footer-dialog-position-top="footerDialogPositionTop" @update:value="content_update"></footer-nav-content>
        </template>
        <template v-else-if="type == '2'">
            <footer-nav-styles :value="form.style"></footer-nav-styles>
        </template>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 底部导航（切换）
 * @param type{String} 类型是进入内容组件还是样式组件
 * @param value{Object} 底部导航样式
 * @param footerDialogPositionTop{Number} 底部导航弹窗样式
 */
const props = defineProps({
    type: {
        type: String,
        default: '1',
    },
    value: {
        type: Object,
        default: () => ({}),
    },
    footerDialogPositionTop: {
        type: Number,
        default: 0,
    },
    config: {
        type: Object,
        default: () => ({}),
    },
});
const form = ref(props.value);
const emit = defineEmits(['update:value']);
// 内容更新回调事件
const content_update = (value: any) => {
    form.value.content = value;
    const new_arry = ['margin', 'margin_left', 'margin_right', 'margin_top', 'margin_bottom', 'padding', 'padding_left', 'padding_right', 'padding_top', 'padding_bottom', 'radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right'];
    if (value.nav_type == 1) {
        new_arry.forEach((item) => {
            if (item.indexOf('radius') != -1) {
                form.value.style.common_style[item] = 100;
            } else {
                form.value.style.common_style[item] = 10;
            }
        });
    } else {
        new_arry.forEach((item) => {
            form.value.style.common_style[item] = 0;
        });
    }
};
</script>
