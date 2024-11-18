<template>
    <div :style="style_container">
        <div class="w h re" :style="style_img_container">
            <template v-if="data_source_content_list.length > 0 && form.data_source_direction == '0'">
                <div v-for="(item1, index1) in data_source_content_list" :key="index1" :style="style_chunk_container">
                    <div class="w h" :style="style_chunk_img_container">
                        <data-rendering :custom-list="form.custom_list" :source-list="item1" :source-type="form?.data_source || ''" :data-height="form.height" :scale="scale"></data-rendering>
                    </div>
                </div>
            </template>
            <div v-else-if="data_source_content_list.length > 0 && ['1', '2'].includes(form.data_source_direction)" class="oh" :style="form.data_source_direction == '2' ? `height:100%;` : `height: ${ swiper_height }px;`">
                <swiper :key="carouselKey" class="w flex" :direction="form.data_source_direction == '2' ? 'horizontal': 'vertical'" :height="swiper_height" :loop="true" :autoplay="autoplay" :slides-per-view="form.data_source_carousel_col" :slides-per-group="slides_per_group" :allow-touch-move="false" :pause-on-mouse-enter="true" :modules="modules" @slide-change="slideChange">
                    <swiper-slide v-for="(item1, index1) in data_source_content_list" :key="index1">
                        <div :style="style_chunk_container">
                            <div class="w h" :style="style_chunk_img_container">
                                <data-rendering :custom-list="form.custom_list" :source-list="item1" :source-type="form?.data_source || ''" :data-height="form.height" :scale="scale"></data-rendering>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <div v-if="new_style.is_show == '1' && dot_list.length > 0" :class="['left', 'right'].includes(new_style.indicator_new_location) ? 'indicator_up_down_location' : 'indicator_about_location'" :style="indicator_location_style">
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
                    <div class="w h" :style="style_chunk_img_container">
                        <data-rendering :custom-list="form.custom_list" :data-height="form.height" :scale="scale"></data-rendering>
                    </div>
                </div>
            </template>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { isEmpty, cloneDeep } from 'lodash';
import { common_img_computer, common_styles_computer, get_math, radius_computer } from '@/utils';
import { source_list } from '@/config/const/custom';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
const modules = [Autoplay];

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
    outerContainerPadding: {
        type: Number,
        default: 0,
    }
});
// 用于页面判断显示
const state = reactive({
    form: props.value.content,
    new_style: props.value.style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

onBeforeMount(() => {
    // 历史数据处理
    if (!Object.keys(form.value.data_source_content).includes('data_auto_list') && !Object.keys(form.value.data_source_content).includes('data_list')) {
        const data = cloneDeep(form.value.data_source_content);
        const new_list = cloneDeep(source_list[form.value.data_source as keyof typeof source_list]);
        if (!isEmpty(new_list)) {
            form.value.data_source_content = new_list;
        } else {
            form.value.data_source_content = cloneDeep(source_list['common']);
        }
        if (!isEmpty(data)) {
            form.value.data_source_content.data_list = [ data ];
        }
    }
});
//#region 计算比例大小，和每块当前的大小
const scale = ref(1);
// 计算整体宽度和比例
watchEffect(() => {
    const { common_style, data_style } = new_style.value;
    const outer_spacing = common_style.margin_left + common_style.margin_right + common_style.padding_left + common_style.padding_right;
    const internal_spacing = data_style.margin_left + data_style.margin_right + data_style.padding_left + data_style.padding_right;
    // 根据容器宽度来计算内部大小
    const width = 390 - outer_spacing - internal_spacing - props.outerContainerPadding;
    // 获得对应宽度的比例
    scale.value = width / 390;
});
//#endregion
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));

const style_chunk_container = computed(() => common_styles_computer(new_style.value.data_style));
const style_chunk_img_container = computed(() => common_img_computer(new_style.value.data_style));

// 数据来源的内容
let data_source_content_list = computed(() => {
    if (['goods', 'article', 'brand'].includes(form.value.data_source)) {
        if (form.value.data_source_content.data_type == '0') {
            return form.value.data_source_content.data_list;
        } else {
            return form.value.data_source_content.data_auto_list.map((item: any) => ({
                id: Math.random(),
                new_cover: [],
                new_title: '',
                data: item,
            }));
        }
    } else {
        return form.value.data_source_content.data_list;
    }
})
//#region 轮播图
// 轮播图key值
const carouselKey = ref('0');
const autoplay = ref<boolean | object>(false);
const slides_per_group = ref(1);
const dot_list = ref<unknown[]>([]);
const swiper_height = ref(390);
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
    // 判断是平移还是整屏滚动
    slides_per_group.value = new_style.value.rolling_fashion == 'translation' ? 1 : form.value.data_source_carousel_col;
    const num = new_style.value.rolling_fashion == 'translation' ? data_source_content_list.value.length : Math.ceil(data_source_content_list.value.length / form.value.data_source_carousel_col);
    const { padding_top, padding_bottom, margin_bottom, margin_top } = new_style.value.data_style;
    // 轮播图高度控制
    if (form.value.data_source_direction == '2') {
        swiper_height.value = form.value.height * scale.value + padding_top + padding_bottom + margin_bottom + margin_top;
    } else {
        swiper_height.value = (form.value.height * scale.value + padding_top + padding_bottom + margin_bottom + margin_top) * form.value.data_source_carousel_col;
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
    actived_index.value = new_style.value.rolling_fashion == 'translation' ? swiper.realIndex : (swiper.realIndex / form.value.data_source_carousel_col) > 0 ? (swiper.realIndex / form.value.data_source_carousel_col) : 0;
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
.dot-item {
    &.active {
        background: v-bind(actived_color) !important;
    }
    .num-active {
        color: v-bind(actived_color) !important;
    }
}
</style>
