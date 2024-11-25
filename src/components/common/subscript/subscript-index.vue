<template>
    <div v-if="form.seckill_subscript_show == '1'" class="corner-marker" :style="corner_marker">
        <div class="flex-row nowrap" :style="corner_img_marker">
            <template v-if="form.subscript_type == 'img-icon'">
                <template v-if="!isEmpty(form.subscript_img_src)">
                    <image-empty v-model="form.subscript_img_src[0]" :style="img_style"></image-empty>
                </template>
                <template v-else>
                    <icon :name="form.subscript_icon_class" :size="new_style.subscript_style.text_or_icon_size + ''" :color="new_style.subscript_style.text_or_icon_color"></icon>
                </template>
            </template>
            <template v-else>
                <span class="text-line-1" :style="`font-size: ${ new_style.subscript_style.text_or_icon_size }px;color: ${ new_style.subscript_style.text_or_icon_color };`">{{ form.subscript_text }}</span>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash'
import { common_img_computer, common_styles_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    type: {
        type: String,
        default: 'outer',
    },
});

const form = computed(() => props.value?.content || {});
const new_style = computed(() => props.type == 'nav-group' ? { subscript_style: props.value?.style || {} } : props.value?.style || {});

//#region 角标
// 左上角，右上角，右下角，左下角
const corner_marker = computed(() => {
    const { subscript_style } = new_style.value;
    let location = common_styles_computer(subscript_style);
    // 获取内部的显示数据
    const { seckill_subscript_location, top_or_bottom_spacing, left_or_right_spacing } = subscript_style;
    // 圆角根据图片的圆角来计算 对角线是同样的圆角
    if (seckill_subscript_location == 'top-left') {
        location += `top: ${ top_or_bottom_spacing }px;left: ${ left_or_right_spacing }px;`;
    } else if (seckill_subscript_location == 'top-center') {
        location += 'top: 0;left: 50%;transform: translateX(-50%);';
    } else if (seckill_subscript_location == 'top-right') {
        location += `top: ${ top_or_bottom_spacing }px;right:${ left_or_right_spacing }px;`;
    } else if (seckill_subscript_location == 'bottom-left') {
        location += `bottom: ${ top_or_bottom_spacing }px;left: ${ left_or_right_spacing }px;`;
    } else if (seckill_subscript_location == 'bottom-center') {
        location += 'bottom: 0;left: 50%;transform: translateX(-50%);';
    } else if (seckill_subscript_location == 'bottom-right') {
        location += `bottom: ${ top_or_bottom_spacing }px;right: ${ left_or_right_spacing }px;`;
    }
    return location;
});
const corner_img_marker = computed(() => common_img_computer(new_style.value.subscript_style));
// 图片设置
const img_style = computed(() => `height: ${new_style.value.subscript_style.img_height}px; width: ${new_style.value.subscript_style.img_width}px`);
//#endregion
</script>

<style lang="scss" scoped>
.corner-marker {
    position: absolute;
    max-width: 100%;
}
</style>