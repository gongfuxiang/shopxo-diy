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
                                        <data-rendering :custom-list="form.custom_list" :source-list="item1" :data-height="dataHeight" :scale="custom_scale" :custom-group-field-id="form?.data_source_field?.id || ''" :is-custom-group="true" :is-custom="isCustom" :show-data="showData" :config-loop="configLoop !== '1' ? form.is_use_parent_data : '1'" ></data-rendering>
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
                                        <data-rendering :custom-list="form.custom_list" :source-list="item1" :data-height="dataHeight" :scale="custom_scale" :custom-group-field-id="form?.data_source_field?.id || ''" :is-custom-group="true" :is-custom="isCustom" :show-data="showData" :config-loop="configLoop !== '1' ? form.is_use_parent_data : '1'"></data-rendering>
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
                        <div class="w h" :style="style_chunk_container">
                            <div class="w h oh" :style="style_chunk_img_container">
                                <data-rendering :custom-list="form.custom_list" :data-height="dataHeight" :scale="custom_scale" :is-custom-group="true" :is-custom="isCustom" :config-loop="configLoop !== '1' ? form.is_use_parent_data : '1'"></data-rendering>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { border_width, common_img_computer, common_styles_computer, get_math, radius_computer, get_is_eligible, get_indicator_location } from '@/utils';
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
    },
    groupSourceList: {
        type: Array,
        default: () => {
            return [];
        }
    },
    showData: {
        type: Object as PropType<{
            data_key: string;
            data_name: string;
            data_logo?: string;
        }>,
        default: () => ({
            data_key: 'id',
            data_name: 'name',
        })
    },
    configLoop: {
        type: String,
        default: '1'
    }
});
// 用于页面判断显示
const form = computed(() => props.value);
const new_style = computed(() => props.value.data_style);
// 从组件的顶层获取数据，避免多层组件传值导致数据遗漏和多余代码
const field_list: any = toRef(inject('field_list', []));
const is_show = computed(() => {
    if (props.configLoop == '1') {
        // 取出条件判断的内容
        const condition = form.value?.condition || { field: '', type: '', value: '' };
        return get_is_eligible(field_list.value, condition, props);
    } else {
        return true;
    }
});

//#region 自定义组真实数据
const data_source_content_list = computed(() => {
    const data_source_id = form.value?.data_source_field?.id || '';
    // 自定义组的数据源内容切换
    const is_data_source_id = field_list.value.filter((item: any) => item.field == data_source_id);
    if (props.configLoop == '1') {
        if (is_data_source_id.length > 0) {
            if (!isEmpty(props.sourceList)) {
                let list = get_nested_property(props.sourceList, data_source_id);
                // 如果是自定义标题，进一步处理嵌套对象中的数据
                if (props.sourceList.data) {
                    list = get_nested_property(props.sourceList.data, data_source_id);
                }
                return list == '' ? [] : list;
            } else {
                return [];
            }
        } else {
            if (!isEmpty(props.sourceList)) {
                return [ props.sourceList ];
            } else {
                return [];
            }
        }
    } else {
        // 如果使用父级数据，就直接使用父级的全部数据，否则的话就没有任何数据
        if (form.value.is_use_parent_data == '1') {
            return props.groupSourceList;
        } else {
            return [];
        }
    }
    
});
const get_nested_property = (obj: any, path: string) => {
    // 检查路径参数是否为字符串且非空，若不满足条件则返回空字符串
    if (typeof path !== 'string' || !path) return [];
    
    // 将属性路径字符串拆分为属性键数组
    const keys = path.split('.');

    // 使用reduce方法遍历属性键数组，逐层访问对象属性
    // 如果当前对象存在且拥有下一个属性键，则继续访问；否则返回空字符串
    return keys.reduce((o, key) => (o != null && o[key] != null ? o[key] : []), obj) ?? [];
}
// #endregion
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style) + (form.value.is_scroll_bar == '1' ? 'overflow: auto;' : ''));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
// 内容样式
const style_content_container = computed(() => common_styles_computer(new_style.value.data_content_style));
const style_content_img_container = computed(() => common_img_computer(new_style.value.data_content_style));
// 数据样式
const style_chunk_container = computed(() => common_styles_computer(new_style.value.data_style));
const style_chunk_img_container = computed(() => common_img_computer(new_style.value.data_style));
//#region 计算比例大小，和每块当前的大小
const custom_scale = ref(1);
// 计算整体宽度和比例
watchEffect(() => {
    const { common_style, data_style, data_content_style, column_gap = 0 } = new_style.value;
    const old_width = props.dataWidth * props.scale;
    // 外层左右间距
    const outer_spacing = common_style.margin_left + common_style.margin_right + common_style.padding_left + common_style.padding_right + border_width(common_style);
    // 内容左右间距
    const content_spacing = data_content_style.margin_left + data_content_style.margin_right + data_content_style.padding_left + data_content_style.padding_right + border_width(data_content_style);
    // 数据左右间距
    const internal_spacing = data_style.margin_left + data_style.margin_right + data_style.padding_left + data_style.padding_right + border_width(data_style);
    // 数据间距
    const data_spacing = ['vertical', 'horizontal'].includes(form.value.data_source_direction) ? column_gap * (form.value.data_source_carousel_col - 1) : 0;
    // 根据容器宽度来计算内部大小 6 是滚动条的宽度
    const new_width = old_width - outer_spacing - internal_spacing - content_spacing - data_spacing - (form.value.is_scroll_bar == '1' ? 6 : 0);
    // 获得对应宽度的比例
    const scale_number = new_width / props.dataWidth;
    custom_scale.value = scale_number > 0 ? scale_number : 0;
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
    let num = 0;
    // 轮播图数量
    if (!isEmpty(data_source_content_list.value)) {
        num = new_style.value.rolling_fashion == 'translation' ? data_source_content_list.value.length : Math.ceil(data_source_content_list.value.length / Number(data_source_carousel_col));
    }
    const { padding_top, padding_bottom, margin_bottom, margin_top } = new_style.value.data_style;
    // 轮播图高度控制
    if (form.value.data_source_direction == 'horizontal') {
        swiper_height.value = props.dataHeight * custom_scale.value + padding_top + padding_bottom + margin_bottom + margin_top;
        slides_per_view.value = Number(data_source_carousel_col);
    } else {
        // 商品数量大于列数的时候，高度是列数，否则是当前的数量
        const col = data_source_content_list.value.length > Number(data_source_carousel_col) ? Number(data_source_carousel_col) : data_source_content_list.value.length;
        slides_per_view.value = col;
        swiper_height.value = (props.dataHeight * custom_scale.value + padding_top + padding_bottom + margin_bottom + margin_top) * col + ((data_source_carousel_col - 1) * space_between.value);
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
// 指示器选中效果
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
