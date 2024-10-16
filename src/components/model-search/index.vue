<template>
    <div :style="style_container">
        <div :style="style_img_container">
            <div class="search w re" :style="style">
                <div class="box h oh flex align-c gap-10" :style="box_style">
                    <template v-if="form.is_icon_show == '1'">
                        <template v-if="form.icon_img.length > 0">
                            <div class="img-box">
                                <image-empty v-model="form.icon_img[0]" class="img" error-img-style="width: 4rem;height: 2.5rem;" />
                            </div>
                        </template>
                        <template v-else>
                            <el-icon :class="`iconfont ${ !isEmpty(form.icon_class) ? 'icon-' + form.icon_class : 'icon-search' } size-14`" :style="`color:${new_style.icon_color};`" />
                        </template>
                    </template>
                    <template v-if="!isEmpty(form.hot_word_list) && form.is_hot_word_show == '1'">
                        <el-carousel :key="carouselKey" class="flex-1" indicator-position="none" :interval="interval_list.time" arrow="never" height="32px" direction="vertical" :autoplay="interval_list.is_roll == '1'">
                            <el-carousel-item v-for="(item, index) in form.hot_word_list" :key="index" class="flex align-c" :style="{ 'color': !isEmpty(item.color) ? item.color : !isEmpty(new_style.hot_words_color) ? new_style.hot_words_color : '#999' }">{{ item.value }}</el-carousel-item>
                        </el-carousel>
                    </template>
                    <template v-else>
                        <span v-if="form.is_tips_show == '1'" :class="[props.isPageSettings ? 'size-12 text-line-1' : 'size-14 text-line-1']" :style="`color: ${ new_style.tips_color }`">{{ form.tips }}</span>
                    </template>
                </div>
                <div v-if="form.is_search_show == '1'" class="abs search-botton h flex align-c jc-c" :style="search_button">
                    <template v-if="form.search_type === 'text'">
                        <div :class="['ptb-3 size-12', props.isPageSettings ? 'plr-12' : 'plr-16']">{{ form.search_tips }}</div>
                    </template>
                    <template v-else-if="!isEmpty(form.search_botton_img) && form.search_botton_img.length > 0">
                        <image-empty v-model="form.search_botton_img[0]" class="img" :style="search_button_radius" error-img-style="width: 4rem;height: 2.8rem;" />
                    </template>
                    <template v-else>
                        <div :class="['ptb-3 size-12', props.isPageSettings ? 'plr-12' : 'plr-16']">
                            <el-icon :class="`iconfont ${ !isEmpty(form.search_botton_icon) ? 'icon-' + form.search_botton_icon : '' } size-14`" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, common_styles_computer, gradient_computer, radius_computer, common_img_computer, get_math } from '@/utils';
import { isEmpty } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    isPageSettings: {
        type: Boolean,
        default: false,
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
const style_container = computed(() => props.isPageSettings ? '' : common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => props.isPageSettings ? '' : common_img_computer(new_style.value.common_style));

const search_button_radius = computed(() => radius_computer(new_style.value.search_button_radius));
// 搜索框设置
const box_style = computed(() => {
    let style = `background: ${ new_style.value.search_bg_color };border: 1px solid ${ new_style.value.search_border }; ${ radius_computer(new_style.value.search_border_radius) };`;
    if (form.value.is_center == '1') {
        style += `justify-content: center;`;
    }
    return style;
});
const search_button = computed(() => {
    let style = search_button_radius.value;
    const { search_botton_color_list, search_botton_direction, search_botton_background_img_style, search_botton_background_img  } = new_style.value;
    if (form.value.search_type != 'img') {
        const data = {
            color_list: search_botton_color_list,
            direction: search_botton_direction,
            background_img: search_botton_background_img,
            background_img_style: search_botton_background_img_style,
        }
        style += gradient_computer(data) + background_computer(data) + `color: ${ new_style.value.button_inner_color };`;
    }
    return style;
})
// 轮播图key值
const carouselKey = ref('0');
// 记录当前显示的轮播图的数据
const interval_list = ref({
    time: 2000,
    is_roll: '1',
    length: 0,
    is_hot_word_show: '0',
});
// 内容参数的集合
watchEffect(() => {
    //#region 轮播图设置
    const time = (new_style.value?.interval_time || 2) * 1000;
    const is_roll = new_style.value.is_roll;
    // 判断长度是否相等
    const hot_word_length = form.value.hot_word_list.length;
    const data = {
        time: time,
        is_roll: is_roll,
        length: hot_word_length,
        is_hot_word_show: form.value.is_hot_word_show,
    }
    // 旧数据
    const oldDataStringified = JSON.stringify(interval_list);
    // 新数据
    const newDataStringified = JSON.stringify(data);
    // 判断跟历史的是否相等，不相等更新组件时间
    if (oldDataStringified != newDataStringified) {
        // 更新旧数据
        interval_list.value = JSON.parse(newDataStringified);
        // 更新轮播图的key，确保更换时能重新更新轮播图
        carouselKey.value = get_math();
    }
    //#endregion
});
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
