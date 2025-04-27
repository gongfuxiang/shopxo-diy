<template>
    <div v-if="form[`is_${ type }_show`] == '1'" :style="corner_marker">
        <div class="flex-row nowrap oh" :style="corner_img_marker">
            <template v-if="form[`${ type }_type`] == 'img-icon'">
                <template v-if="!isEmpty(form[`${ type }_img`])">
                    <image-empty v-model="form[`${ type }_img`][0]" :style="img_style"></image-empty>
                </template>
                <template v-else>
                    <icon :name="form[`${ type }_icon`]" :size="new_type_size + ''" :color="new_type_color"></icon>
                </template>
            </template>
            <template v-else>
                <span class="text-line-1" :style="`font-size: ${ new_type_size }px;color: ${ new_type_color };`">{{ form[`${ type }_text`] }}</span>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash'
import { common_styles_computer, padding_computer } from '@/utils';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    type: {
        type: String,
        default: '',
    },
});

const form = computed(() => props.value?.content || {});
const new_style = computed(() => props.value?.style || {});
// 取出某一个对应的数据信息
const new_type_style = computed(() => new_style.value[`${ props.type }_style`] || {} );
// 取出对应的大小显示
const new_type_size = computed(() => new_type_style.value?.size || 0 );
const new_type_color = computed(() => new_type_style.value?.color || '' );
//#region 大小设置
const corner_marker = computed(() => common_styles_computer(new_type_style.value));
const corner_img_marker = computed(() => padding_computer(new_type_style.value));
// 图片设置
const img_style = computed(() => `height: ${ new_type_style.value.img_height }px; width: ${ new_type_style.value.img_width }px`);
//#endregion
</script>

<style lang="scss" scoped>
.max-width {
    max-width: 100%;
}
</style>