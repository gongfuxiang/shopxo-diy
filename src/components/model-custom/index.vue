<template>
    <div :style="style_container">
        <div :style="style_img_container">
            <div :style="style_content_container">
                <div class="w h re" :style="style_content_img_container">
                    <template v-if="!isEmpty(form.data_source) && form.data_source_is_loop !== '0'">
                        <template v-if="data_source_content_list.length > 0 && form.data_source_direction == 'vertical'">
                            <div class="flex-row flex-wrap" :style="`row-gap: ${ new_style.row_gap }px;column-gap: ${ new_style.column_gap }px;`">
                                <div v-for="(item1, index1) in data_source_content_list" :key="index1" :style="`width: ${ gap_width }`">
                                    <div :style="style_chunk_container">
                                        <div class="w h oh" :style="style_chunk_img_container">
                                            <data-rendering :custom-list="form.custom_list" :source-list="item1" :config-loop="form?.data_source_is_loop || '1'" :group-source-list="data_source_content_list" :data-height="form.height" :scale="scale" :is-custom="form.is_custom_data == '1'" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }"></data-rendering>
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
                                            <data-rendering :custom-list="form.custom_list" :source-list="item1" :config-loop="form?.data_source_is_loop || '1'" :group-source-list="data_source_content_list" :data-height="form.height" :scale="scale" :is-custom="form.is_custom_data == '1'" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }"></data-rendering>
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
                            <div class="h" :style="style_chunk_container">
                                <div class="w h oh" :style="style_chunk_img_container">
                                    <data-rendering :custom-list="form.custom_list" :config-loop="form?.data_source_is_loop || '1'" :data-height="form.height" :scale="scale"></data-rendering>
                                </div>
                            </div>
                        </template>
                    </template>
                    <template v-else-if="!isEmpty(form.data_source) && form.data_source_is_loop == '0'">
                        <div class="h" :style="style_chunk_container">
                            <div class="w h oh" :style="style_chunk_img_container">
                                <data-rendering :custom-list="form.custom_list" :source-list="{}" :config-loop="form?.data_source_is_loop || '1'" :group-source-list="data_source_content_list" :data-height="form.height" :scale="scale" :is-custom="form.is_custom_data == '1'" :show-data="form?.show_data || { data_key: 'id', data_name: 'name' }"></data-rendering>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="h" :style="style_chunk_container">
                            <div class="w h oh" :style="style_chunk_img_container">
                                <data-rendering :custom-list="form.custom_list" :config-loop="form?.data_source_is_loop || '1'" :data-height="form.height" :scale="scale"></data-rendering>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { isEmpty, cloneDeep } from 'lodash';
import { border_width, common_img_computer, common_styles_computer, get_indicator_location, get_math, radius_computer } from '@/utils';
import { source_list } from '@/config/const/custom';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
const modules = [Autoplay];

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    magicScale: {
        type: Number,
        default: 1,
    },
    isCommonStyle: {
        type: Boolean,
        default: true,
    },
    outerContainerPadding: {
        type: Number,
        default: 0,
    }
});

// 用于页面判断显示
const form = computed(() => props.value?.content || {});
const new_style = computed(() => props.value?.style || {});

// 将顶级的字段暴露给孙子组件, 避免传递层级太深
provide('field_list', computed(() => form.value?.field_list || []));
onBeforeMount(() => {
    // 历史数据处理
    if (!Object.keys(form.value.data_source_content).includes('data_auto_list') && !Object.keys(form.value.data_source_content).includes('data_list')) {
        const data = cloneDeep(form.value.data_source_content);
        form.value.data_source_content = cloneDeep(source_list['common']);
        if (!isEmpty(data)) {
            form.value.data_source_content.data_list = [ data ];
        }
    }
});
// 计算纵向显示的宽度
const gap_width = computed(() => {
    const model_number = Number(form.value.data_source_carousel_col);
    // 计算间隔的空间。(gap * gap数量) / 模块数量
    let gap = (new_style.value.column_gap * (model_number - 1)) / model_number;
    return `calc(${100 / model_number}% - ${gap}px)`;
});
//#region 计算比例大小，和每块当前的大小
const scale = ref(1);
// 计算整体宽度和比例
watchEffect(() => {
    const { common_style, data_style, data_content_style, column_gap } = new_style.value;
    const new_width = 390 * props.magicScale;
    // 外层左右间距
    const outer_spacing = common_style.margin_left + common_style.margin_right + common_style.padding_left + common_style.padding_right + border_width(common_style);
    // 内容左右间距
    const content_spacing = data_content_style.margin_left + data_content_style.margin_right + data_content_style.padding_left + data_content_style.padding_right + border_width(data_content_style);
    // 数据左右间距
    const internal_spacing = data_style.margin_left + data_style.margin_right + data_style.padding_left + data_style.padding_right + border_width(data_style);
    // 数据间距
    const data_spacing = ['vertical', 'horizontal'].includes(form.value.data_source_direction) ? column_gap * (form.value.data_source_carousel_col - 1) : 0;
    // 根据容器宽度来计算内部大小
    const width = new_width - outer_spacing - internal_spacing - content_spacing - data_spacing - props.outerContainerPadding;
    // 获得对应宽度的比例
    const scale_number = width / 390;
    scale.value = scale_number > 0 ? scale_number : 0;
});
//#endregion
// 公共样式
const style_container = computed(() => props.isCommonStyle ? common_styles_computer(new_style.value.common_style) : '');
const style_img_container = computed(() => props.isCommonStyle ? common_img_computer(new_style.value.common_style) : '');
// 内容样式
const style_content_container = computed(() => common_styles_computer(new_style.value.data_content_style));
const style_content_img_container = computed(() => common_img_computer(new_style.value.data_content_style));
// 数据样式
const style_chunk_container = computed(() => common_styles_computer(new_style.value.data_style));
const style_chunk_img_container = computed(() => common_img_computer(new_style.value.data_style));

// 数据来源的内容
const data_source_content_list = computed(() => {
    // 是自定义数据类型的时候，显示自定义数据，否则显示数据来源的数据
    if (form.value.is_custom_data == '1') {
        if (Number(form.value.data_source_content.data_type) === 0) {
            return form.value.data_source_content?.data_list || [];
        } else {
            return !isEmpty(form.value.data_source_content) ? 
                form.value.data_source_content.data_auto_list.map((item: any) => ({
                    id: Math.random(),
                    new_cover: [],
                    new_title: '',
                    data: item,
                })) : [];
        }
    } else {
        return form.value.data_source_content?.data_list || [];
    }
})
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
    let num = 0;
    // 轮播图数量
    if (!isEmpty(data_source_content_list.value)) {
        num = new_style.value.rolling_fashion == 'translation' ? data_source_content_list.value.length : Math.ceil(data_source_content_list.value.length / Number(data_source_carousel_col));
    }
    const { padding_top, padding_bottom, margin_bottom, margin_top } = new_style.value.data_style;
    // 轮播图高度控制
    if (form.value.data_source_direction == 'horizontal') {
        swiper_height.value = form.value.height * scale.value + padding_top + padding_bottom + margin_bottom + margin_top;
        slides_per_view.value = Number(data_source_carousel_col);
    } else {
        // 商品数量大于列数的时候，高度是列数，否则是当前的数量
        const col = data_source_content_list.value.length > Number(data_source_carousel_col) ? Number(data_source_carousel_col) : data_source_content_list.value.length;
        swiper_height.value = (form.value.height * scale.value + padding_top + padding_bottom + margin_bottom + margin_top) * col + ((data_source_carousel_col - 1) * space_between.value);
        slides_per_view.value = col;
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
    const size = new_style.value.indicator_size;
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
const indicator_location_style = computed(() => get_indicator_location(new_style.value));
//#endregion
</script>
<style lang="scss" scoped>
.dot-item {
    &.active {
        background: v-bind(actived_color) !important;
    }
    .num-active {
        color: v-bind(actived_color) !important;
    }
}
</style>
