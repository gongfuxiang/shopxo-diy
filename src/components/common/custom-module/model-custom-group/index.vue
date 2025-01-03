<template>
    <div v-if="is_show" class="flex-1" :style="style_container">
        <div :style="style_img_container">
            <div :style="style_content_container">
                <div class="w h re" :style="style_content_img_container">
                    <template v-if="data_source_content_list.length > 0 && form.data_source_direction == 'vertical'">
                        <div class="flex-row flex-wrap" :style="`row-gap: ${ new_style.row_gap }px;column-gap: ${ new_style.column_gap }px;`">
                            <div v-for="(item1, index1) in data_source_content_list" :key="index1" :style="`width: ${ gap_width }`">
                                <div :style="style_chunk_container">
                                    <div class="w h oh" :style="style_chunk_img_container">
                                        <data-rendering :custom-list="form.custom_list" :source-list="item1" :data-height="dataHeight" :scale="custom_scale" :is-custom="form.is_custom_data == '1'" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }"></data-rendering>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div v-else-if="data_source_content_list.length > 0 && ['vertical-scroll', 'horizontal'].includes(form.data_source_direction)" class="oh" :style="form.data_source_direction == 'horizontal' ? `height:100%;` : `height: ${ swiper_height }px;`">
                        <swiper :key="carouselKey" class="w flex" :direction="form.data_source_direction == 'horizontal' ? 'horizontal': 'vertical'" :height="swiper_height" :loop="true" :autoplay="autoplay" :slides-per-view="slides_per_view" :slides-per-group="slides_per_group" :space-between="space_between" :allow-touch-move="false" :pause-on-mouse-enter="true" :modules="modules" @slide-change="slideChange">
                            <swiper-slide v-for="(item1, index1) in data_source_content_list" :key="index1">
                                <div :style="style_chunk_container">
                                    <div class="w h oh" :style="style_chunk_img_container">
                                        <data-rendering :custom-list="form.custom_list" :source-list="item1" :data-height="dataHeight" :scale="custom_scale" :is-custom="form.is_custom_data == '1'" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }"></data-rendering>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                        <div v-if="new_style.is_show == '1' && dot_list.length > 1" :class="['left', 'right'].includes(new_style.indicator_new_location) ? 'indicator_up_down_location' : 'indicator_about_location'" :style="indicator_location_style">
                            <template v-if="new_style.indicator_style == 'num'">
                                <div :style="indicator_style" class="dot-item">
                                    <span class="num-active">{{ actived_index + 1 }}</span><span>/{{ dot_list.length }}</span>
                                </div>
                            </template>
                            <template v-else>
                                <div v-for="(item, index) in dot_list" :key="index" :style="indicator_style" :class="{ 'dot-item': true, active: actived_index == index }" />
                            </template>
                        </div>
                    </div>
                    <template v-else>
                        <div :style="style_chunk_container">
                            <div class="w h oh" :style="style_chunk_img_container">
                                <data-rendering :custom-list="form.custom_list" :source-list="sourceList" :data-height="dataHeight" :scale="custom_scale" :is-custom="isCustom" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }"></data-rendering>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { border_width, common_img_computer, common_styles_computer, get_math, radius_computer, custom_condition_data, custom_condition_judg } from '@/utils';
import { isEmpty } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
const modules = [Autoplay];

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
        required: true
    },
    sourceList: {
        type: Object,
        default: () => {
            return {};
        }
    },
    dataWidth: {
        type: Number,
        default: 0,
    },
    dataHeight: {
        type: Number,
        default: 0,
    },
    isDisplayPanel: {
        type: Boolean,
        default: false
    },
    scale: {
        type: Number,
        default: 1
    },
    isCustom: {
        type: Boolean,
        default: false
    }
});
// 用于页面判断显示
const form = computed(() => props.value);
const new_style = computed(() => props.value.data_style);
// 从组件的顶层获取数据，避免多层组件传值导致数据遗漏和多余代码
const field_list: any[] | undefined = inject('field_list', []);
const is_show = computed(() => {
    // 取出条件判断的内容
    const condition = form.value?.condition || { field: '', type: '', value: ''};
    // 获取对应条件字段的字段数据
    let option: any[] = [];
    if (field_list) {
        option = field_list.filter((item: any) => item.field === condition.field);
    }
    // 获取到字段的真实数据
    const field_value = custom_condition_data(condition?.field || '', option[0] || {}, props.sourceList, props.isCustom);
    // 判断条件字段是否为空并且是显示面板才会生效，则直接返回true
    if (!isEmpty(condition.field) && !props.isDisplayPanel) {
        return custom_condition_judg(field_value, condition.type, condition.value);
    } else {
        return true;
    }
});
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style) + 'overflow: auto;');
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
// 内容样式
const style_content_container = computed(() => common_styles_computer(new_style.value.data_content_style));
const style_content_img_container = computed(() => common_img_computer(new_style.value.data_content_style));
// 数据样式
const style_chunk_container = computed(() => common_styles_computer(new_style.value.data_style));
const style_chunk_img_container = computed(() => common_img_computer(new_style.value.data_style));
const data_source_content_list = ref([]);
//#region 计算比例大小，和每块当前的大小
const custom_scale = ref(1);
// 计算整体宽度和比例
watchEffect(() => {
    const { common_style, data_style, data_content_style } = new_style.value;
    const old_width = props.dataWidth * props.scale;
    // 外层左右间距
    const outer_spacing = common_style.margin_left + common_style.margin_right + common_style.padding_left + common_style.padding_right + border_width(common_style);
    // 内容左右间距
    const content_spacing = data_content_style.margin_left + data_content_style.margin_right + data_content_style.padding_left + data_content_style.padding_right + border_width(data_content_style);
    // 数据左右间距
    const internal_spacing = data_style.margin_left + data_style.margin_right + data_style.padding_left + data_style.padding_right + border_width(data_style);
    // 根据容器宽度来计算内部大小
    const new_width = old_width - outer_spacing - internal_spacing - content_spacing;
    // 获得对应宽度的比例
    custom_scale.value = new_width / old_width;
});
//#endregion
// 计算纵向显示的宽度
const gap_width = computed(() => {
    const model_number = Number(form.value.data_source_carousel_col);
    // 计算间隔的空间。(gap * gap数量) / 模块数量
    let gap = (new_style.value.column_gap * (model_number - 1)) / model_number;
    return `calc(${100 / model_number}% - ${gap}px)`;
});
//#region 轮播图
// 轮播图key值
const carouselKey = ref('0');
const autoplay = ref<boolean | object>(false);
const slides_per_group = ref(1);
const dot_list = ref<unknown[]>([]);
const swiper_height = ref(390);
const slides_per_view = ref(1);
const space_between = ref(0);
// 内容参数的集合
watchEffect(() => {
    // 是否滚动
    if (new_style.value.is_roll == '1') {
        autoplay.value = {
            delay: (new_style.value.interval_time || 2) * 1000,
            pauseOnMouseEnter: true,
        };
    } else {
        autoplay.value = false;
    }
    // 间距
    space_between.value = form.value.data_source_direction == 'horizontal' ? new_style.value.column_gap : new_style.value.row_gap;
    // 显示数量
    const data_source_carousel_col = Number(form.value.data_source_carousel_col);
    // 判断是平移还是整屏滚动
    slides_per_group.value = new_style.value.rolling_fashion == 'translation' ? 1 : Number(data_source_carousel_col);
    // 商品数量大于列数的时候，高度是列数，否则是当前的数量
    const col = data_source_content_list.value.length > Number(data_source_carousel_col) ? Number(data_source_carousel_col) : data_source_content_list.value.length;
    slides_per_view.value = col;
    let num = 0;
    // 轮播图数量
    if (!isEmpty(data_source_content_list.value)) {
        num = new_style.value.rolling_fashion == 'translation' ? data_source_content_list.value.length : Math.ceil(data_source_content_list.value.length / Number(data_source_carousel_col));
    }
    const { padding_top, padding_bottom, margin_bottom, margin_top } = new_style.value.data_style;
    // 轮播图高度控制
    if (form.value.data_source_direction == 'horizontal') {
        swiper_height.value = form.value.height * custom_scale.value + padding_top + padding_bottom + margin_bottom + margin_top;
    } else {
        swiper_height.value = (form.value.height * custom_scale.value + padding_top + padding_bottom + margin_bottom + margin_top) * col + ((data_source_carousel_col - 1) * space_between.value);
    }
    dot_list.value = Array(num);
    // 更新轮播图的key，确保更换时能重新更新轮播图
    carouselKey.value = get_math();
});
// 轮播图显示样式
const actived_color = computed(() => new_style.value?.actived_color || '#2A94FF' );
const indicator_style = computed(() => {
    let indicator_styles = '';
    if (!isEmpty(new_style.value.indicator_radius)) {
        indicator_styles += radius_computer(new_style.value.indicator_radius);
    }
    const size = new_style.value?.indicator_size || 5;
    if (new_style.value.indicator_style == 'num') {
        indicator_styles += `color: ${new_style.value?.color || '#DDDDDD'};`;
        indicator_styles += `font-size: ${size}px;`;
    } else if (new_style.value.indicator_style == 'elliptic') {
        indicator_styles += `background: ${new_style.value?.color || '#DDDDDD'};`;
        if (['left', 'right'].includes(new_style.value.indicator_new_location)) {
            indicator_styles += `width: ${ size }px; height: ${size * 3}px;`;
        } else {
            indicator_styles += `width: ${size * 3}px; height: ${size}px;`;
        }
    } else {
        indicator_styles += `background: ${new_style.value?.color || '#DDDDDD'};`;
        indicator_styles += `width: ${size}px; height: ${size}px;`;
    }
    return indicator_styles;
});
const actived_index = ref(0);
const slideChange = (swiper: { realIndex: number }) => {
    // 轮播图滚动时，更新当前激活的下标， 如果不是平移的时候，需要除以列数，否则就是当前的下标
    actived_index.value = new_style.value.rolling_fashion == 'translation' ? swiper.realIndex : (swiper.realIndex / Number(form.value.data_source_carousel_col)) > 0 ? (swiper.realIndex / Number(form.value.data_source_carousel_col)) : 0;
};
//#endregion
//#region 指示器位置
// 根据指示器的位置来处理 对齐方式的处理
const indicator_location_style = computed(() => {
    const { indicator_new_location,  indicator_location, indicator_bottom } = new_style.value;
    let styles = '';
    if (['left', 'right'].includes(indicator_new_location)) {
        if (indicator_location == 'flex-start') {
            styles += `top: 0px;`;
        } else if (indicator_location == 'center') {
            styles += `top: 50%; transform: translateY(-50%);`;
        } else {
            styles += `bottom: 0px;`;
        }
    } else {
        if (indicator_location == 'flex-start') {
            styles += `left: 0px;`;
        } else if (indicator_location == 'center') {
            styles += `left: 50%; transform: translateX(-50%);`;
        } else {
            styles += `right: 0px;`;
        }
    }
    // 如果有位置的处理，就使用指示器的位置处理，否则的话就用下边距处理
    styles += `${ !isEmpty(indicator_new_location) ? `${indicator_new_location}: ${ indicator_bottom }px;` : `bottom: ${ indicator_bottom }px;` }`;
    return styles;
});
//#endregion
</script>
<style lang="scss" scoped>
.rich-text-content {
    white-space: normal;
    word-break:break-all;
    * {
        max-width: 100%;
    }
}
</style>
