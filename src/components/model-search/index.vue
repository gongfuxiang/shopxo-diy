<template>
    <div :style="style_container">
        <div :style="style" class="flex-row align-c">
            <div class="search w re">
                <div class="box h oh flex align-c gap-10" :style="box_style">
                    <template v-if="form.is_icon_show">
                        <template v-if="form.icon_img_src.length > 0">
                            <div class="img-box">
                                <image-empty v-model="form.icon_img_src[0]" class="img" error-img-style="width: 4rem;height: 2.5rem;" />
                            </div>
                        </template>
                        <template v-else>
                            <el-icon :class="`iconfont ${ !isEmpty(form.icon_class) ? 'icon-' + form.icon_class : 'icon-search' } size-14`" :style="`color:${new_style.icon_color};`" />
                        </template>
                    </template>
                    <span v-if="form.is_tips_show" class="size-14" :style="`color: ${ new_style.tips_color }`">{{ form.tips }}</span>
                </div>
                <div v-if="form.is_search_show" class="abs search-botton h flex align-c jc-c" :style="search_button">
                    <template v-if="form.search_type === 'text'">
                        <div class="pl-16 pr-16 ptb-3 size-12">{{ form.search_tips }}</div>
                    </template>
                    <template v-else-if="form.search_botton_src.length > 0">
                        <image-empty v-model="form.search_botton_src[0]" class="img" :style="search_button_radius" error-img-style="width: 4rem;height: 2.8rem;" />
                    </template>
                    <template v-else>
                        <div class="pl-16 pr-16 ptb-3 size-12">
                            <el-icon :class="`iconfont ${ 'icon-' + form.search_botton_icon } size-14`" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, common_styles_computer, gradient_computer, radius_computer } from '@/utils';
import { isEmpty } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
// 用于页面判断显示
const state = reactive({
    form: props.value.content,
    new_style: props.value.style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

// 用于样式显示
const style = computed(() => {
    let common_styles = '';
    if (new_style.value.text_style == 'italic') {
        common_styles += `font-style: italic`;
    } else if (new_style.value.text_style == '500') {
        common_styles += `font-weight: 500`;
    }
    return common_styles;
});
const style_container = computed(() => common_styles_computer(new_style.value.common_style));

const search_button_radius = computed(() => radius_computer(new_style.value.search_button_radius));
// 搜索框设置
const box_style = computed(() => {
    let style = `background: ${ new_style.value.search_border }; ${ radius_computer(new_style.value.search_border_radius) }`;
    if (form.value.is_center) {
        style += `justify-content: center;`;
    }
    return style;
});
const search_button = computed(() => {
    let style = search_button_radius.value;
    if (form.value.search_type != 'img') {
        style += gradient_computer(new_style.value) + background_computer(new_style.value) + `color: ${ new_style.value.button_inner_color };`;
    }
    return style;
})
</script>
<style lang="scss" scoped>
.search {
    height: 3.2rem;
    .box {
        padding: 0.6rem 1.5rem;
    }
    .img-box {
        height: 100%;
        min-width: 2rem;
        max-width: 6rem;
    }
    .search-botton {
        height: 2.8rem;
        top: 0.2rem;
        right: 0.2rem;
        .img {
            height: 2.8rem;
            min-width: 3rem;
            max-width: 10rem;
        }
    }
    
}
</style>
