<template>
    <div class="oh" :style="style_container">
        <div class="swiper-free-mode" :style="style_img_container + `height: ${ swiper_outer_height }px;`">
            <template v-if="form.rotation_direction == 'vertical'">
                <swiper :key="carouselKey" class="w flex" :style="`height: ${ swiper_height }px;`" direction="vertical" :loop="true" :speed="swiper_speed" :autoplay="autoplay" :slides-per-view="slides_per_view" :space-between="space_between" :modules="modules">
                    <swiper-slide v-for="(item, index) in list" :key="index">
                        <div class="flex-row align-c gap-5">
                            <template v-if="!isEmpty(item) && is_show('head')">
                                <div class="oh re">
                                    <template v-if="!isEmpty(item.new_cover)">
                                        <image-empty v-model="item.new_cover[0]" :style="heading_img_radius"></image-empty>
                                    </template>
                                    <template v-else>
                                        <image-empty v-model="item.head_img" :style="heading_img_radius"></image-empty>
                                    </template>
                                </div>
                            </template>
                            <span v-if="is_show('nick_name')" class="flex-1 text-line-1" :style="trends_config('nick_name')">{{ item.nick_name }}</span>
                            <template v-if="is_show('goods_image')">
                                <image-empty v-model="item.goods_images" :style="goods_image_radius"></image-empty>
                            </template>
                            <span v-if="is_show('goods_title')" class="flex-1 text-line-1" :style="trends_config('goods_title')">{{ item.goods_title }}</span>
                            <span v-if="is_show('time')" class="nowarp" :style="trends_config('time')">{{ item.time }}</span>
                        </div>
                    </swiper-slide>
                </swiper>
            </template>
            <template v-else>
                <div class="swiper-horizontal-free-mode" :style="`height: ${ swiper_height }px;`">
                    <div v-for="(item, index) in new_list" :key="index" :style="`margin-bottom: ${ index < new_list.length - 1 ? space_between : 0 }px;`">
                        <swiper :key="carouselKey + index" class="w flex" :style="`height: ${ new_swiper_height }px;`" direction="horizontal" :loop="true" :slides-offset-before="slides_offset_before" :speed="swiper_speed + (1000 * index)" :autoplay="autoplay" slides-per-view="auto" :space-between="space_between" :modules="modules">
                            <swiper-slide v-for="(item1, index1) in item.split_list" :key="index1">
                                <div :style="swiper_horizontal_container + 'width: auto;'">
                                    <div class="flex-row align-c gap-5" :style="swiper_horizontal_img_container">
                                        <template v-if="is_show('goods_image')">
                                            <image-empty v-model="item1.goods_images" :style="goods_image_radius"></image-empty>
                                        </template>
                                        <span v-if="is_show('goods_title')" class="flex-1 text-line-1" :style="trends_config('goods_title') + `max-width: ${ max_title_width }px;`">{{ item1.goods_title }}</span>
                                        <span v-if="is_show('time')" class="nowarp" :style="trends_config('time')">{{ item1.time }}</span>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, common_img_computer, get_math, gradient_handle, radius_computer, background_computer, padding_computer } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
const modules = [Autoplay];
/**
 * @description: 文章列表（渲染）
 * @param value{Object} 样式数据
 * @param isCommonStyle{Object} 是否为通用样式
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    isCommonStyle: {
        type: Boolean,
        default: true,
    },
});
const form = computed(() => props.value?.content || {});
const new_style = computed(() => props.value?.style || {});
// 头像样式
const heading_img_radius = computed(() => {
    const { heading_img_radius, heading_img_width, heading_img_height, heading_img_border_color, heading_img_border_size } = new_style.value
    return `width: ${ heading_img_width }px;height: ${ heading_img_height }px;border: ${ heading_img_border_size }px solid ${ heading_img_border_color };` + radius_computer(heading_img_radius);
});

const goods_image_radius =  computed(() => {
    const { goods_img_radius, goods_img_width, goods_img_height, goods_img_border_color, goods_img_border_size } = new_style.value
    return `width: ${ goods_img_width }px;height: ${ goods_img_height }px;border: ${ goods_img_border_size }px solid ${ goods_img_border_color };` + radius_computer(goods_img_radius);
});
// 根据传递的参数，从对象中取值
const trends_config = (key: string) => {
    return style_config(new_style.value[`${key}_typeface`], new_style.value[`${key}_size`], new_style.value[`${key}_color`]);
};
// 根据传递的值，显示不同的内容
const style_config = (typeface: string, size: number, color: string | object) => {
    return `font-weight:${typeface}; font-size: ${size}px;line-height: ${ size }px;color: ${color};`;
};
// 判断是否显示对应的内容
const is_show = (index: string) => {
    return form.value.is_show.includes(index);
};
// 横向时的显示内容
const swiper_horizontal_container = computed(() => {
    const { content_color_list, content_direction, content_radius } = new_style.value
    return gradient_handle(content_color_list, content_direction) + radius_computer(content_radius);
});
// 横向时的图片显示内容
const swiper_horizontal_img_container = computed(() => {
    const { content_background_img_style, content_background_img, content_padding } = new_style.value;
    const data = {
        background_img_style: content_background_img_style,
        background_img: content_background_img,
    }
    return background_computer(data) + padding_computer(content_padding);
})
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
//#region 列表数据
type data_list = {
    head_img: string,
    new_cover: string[],
    nick_name: string,
    goods_title: string,
    goods_images: string,
    time: string
}
const default_list = {
    head_img: '',
    new_cover: [],
    nick_name: '测试昵称测试昵称测试昵称测试昵称',
    goods_title: '测试商品标题测试',
    goods_images: '',
    time: '02-04 23:01:01'
};
type split_list = {
    split_list: data_list[]
}
const new_list = ref<split_list[]>([]);
const list = ref<data_list[]>([]);
// 初始化的时候执行
onMounted(() => {
    // 指定商品并且指定商品数组不为空
    if (!isEmpty(form.value.data_list) && form.value.data_type == '0') {
        list.value = form.value.data_list.map((item: any) => ({
            ...item.data,
            title: !isEmpty(item.new_title) ? item.new_title : item.data.title,
            new_cover: item.new_cover,
        }));
    } else if (!isEmpty(form.value.data_auto_list) && form.value.data_type == '1') {
        // 筛选商品并且筛选商品数组不为空
        list.value = form.value.data_auto_list;
    } else {
        list.value = Array(50).fill(default_list);
    }
});

const get_products = () => {
    const { category_ids, brand_ids, number, order_by_type, order_by_rule, keywords } = form.value;
    const params = {
        goods_keywords: keywords,
        goods_category_ids: category_ids,
        goods_brand_ids: brand_ids,
        goods_order_by_type: order_by_type,
        goods_order_by_rule: order_by_rule,
        goods_number: number,
    };
    list.value = Array(50).fill(default_list);
    // 获取商品列表
    // ShopAPI.getShopLists(params).then((res: any) => {
    //     if (!isEmpty(res.data)) {
    //         list.value = res.data;
    //     } else {
    //         list.value = Array(4).fill(default_list);
    //     }
    // });
};
// 取出监听的数据
const watch_data = computed(() => {
    const { category_ids, brand_ids, number, order_by_type, order_by_rule, data_type, data_list, keywords } = form.value;
    return { category_ids: category_ids, brand_ids: brand_ids, number: number, order_by_type: order_by_type, order_by_rule: order_by_rule, data_type: data_type, data_list: data_list, keyword: keywords };
})
// 初始化的时候不执行, 监听数据变化
watch(() => watch_data.value, (val, oldVal) => {
    // 使用JSON.stringify()进行判断 新值和旧值是否一样 不一样就重新获取数据
    if ((JSON.stringify(val) !== JSON.stringify(oldVal)) || props.isCommonStyle) {
        if (val.data_type == '0') {
            if (!isEmpty(val.data_list)) {
                list.value = cloneDeep(val.data_list).map((item: any) => ({
                    ...item.data,
                    title: !isEmpty(item.new_title) ? item.new_title : item.data.title,
                    new_cover: item.new_cover,
                }));
            } else {
                list.value = Array(4).fill(default_list);
            }
        } else {
            get_products();
        }
    }
}, { deep: true });
//#endregion
//#region 轮播设置
// 轮播图key值
const carouselKey = ref('0');
// 是否开启轮播
const autoplay = ref<boolean | object>(false);
// 轮播内容显示数量
const slides_per_view = ref(1);
// 轮播内容间隔
const space_between = ref(0);
// 纵向轮播时的轮播图高度
const swiper_height = ref(0);
// 整个容器的高度
const swiper_outer_height = ref(0);
// 移动时间
const swiper_speed = ref(0);
// 商品标题最大可见数量
const max_title_width = ref(0);
// 横向滑动时轮播图高度
const new_swiper_height = ref(0);
// 设置初始偏移量
const slides_offset_before = ref(0);
const size_handle = (val: number, type: string) => {
    return form.value.is_show.includes(type) ? val : 0;
};
// 内容参数的集合
watchEffect(() => {
    const { rotation_direction, interval_time, show_number = 1, is_roll, is_show } = form.value;
    // 是否滚动
    if (is_roll == '1' && list.value.length > 0) {
        autoplay.value = {
            delay: 0,
            waitForTransition: true,
            pauseOnMouseEnter: true,
        };
    } else {
        autoplay.value = false;
    }
    // 数据间距
    space_between.value = new_style.value.data_spacing;
    // 显示数量
    const show_num = show_number || 1;
    slides_per_view.value = show_num;
    // 轮播图速度
    swiper_speed.value = interval_time * 1000;
    // 轮播图高度
    const { heading_img_height, nick_name_size, goods_img_height, goods_title_size, time_size, data_spacing, common_style, content_padding } = new_style.value;
    if (rotation_direction == 'vertical') {
        swiper_height.value = Math.max(size_handle(heading_img_height, 'head'), size_handle(nick_name_size, 'nick_name'), size_handle(goods_img_height, 'goods_image'), size_handle(goods_title_size, 'goods_title'), size_handle(time_size, 'time')) * show_num + (data_spacing * (show_num - 1));
    } else {
        // 设置初始偏移量
        slides_offset_before.value = 390 - common_style.margin_left + common_style.margin_right - common_style.padding_left - common_style.padding_right;
        max_title_width.value = goods_title_size * 9;
        new_list.value = [];
        // 拆分的数量
        const split_num = Math.ceil(list.value.length / show_num);
        let new_num = show_num;
        for (let i = 0; i < show_num; i++) {
            if (!isEmpty(list.value[i * split_num])) {
                new_list.value.push({ split_list: list.value.slice(i * split_num, (i + 1) * split_num) });
            } else {
                new_num = i - 1;
                break;
            }
        }
        // 每个swiper的高度
        new_swiper_height.value = Math.max(size_handle(goods_img_height, 'goods_image'), size_handle(goods_title_size, 'goods_title'), size_handle(time_size, 'time')) + content_padding.padding_top + content_padding.padding_bottom;
        // 总的高度
        swiper_height.value = new_swiper_height.value * new_num + (data_spacing * (new_num - 1));
    }
    swiper_outer_height.value = swiper_height.value + common_style.padding_top + common_style.padding_bottom;
    // 更新轮播图的key，确保更换时能重新更新轮播图
    carouselKey.value = get_math();
});
//#endregion
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    background-color: #fff;
    .image-slot img {
        width: 2rem;
        height: 2rem;
    }
}
.swiper-free-mode :deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}
.swiper-horizontal-free-mode :deep(.swiper-slide) {
    width: auto !important;
}
</style>
