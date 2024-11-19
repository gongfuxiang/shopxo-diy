<template>
    <div class="oh" :style="style_container">
        <div :style="style_img_container">
            <div :class="outer_class" :style="onter_style">
                <template v-if="!['5'].includes(theme)">
                    <div v-for="(item, index) in list" :key="index" class="re oh" :class="layout_type" :style="layout_style">
                        <div :class="['oh w h', ['0', '4'].includes(theme) ? 'flex-row' : 'flex-col' ]" :style="layout_img_style">
                            <template v-if="theme == '6'">
                                <div :class="['flex-row align-c jc-sb ptb-15 mlr-10 gap-20', { 'br-b-e': index != list.length - 1 }]">
                                    <div v-if="is_show('title')" :class="text_line" :style="trends_config('title', 'title')">{{ item.title }}</div>
                                    <div v-if="is_show('price') && !isEmpty(item.min_price)" class="num nowrap" :style="`color: ${new_style.shop_price_color}`">
                                        <span class="identifying">{{ item.show_price_symbol }}</span
                                        ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                        <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <template v-if="!isEmpty(item)">
                                    <div class="oh re" :class="`flex-img${theme}`">
                                        <template v-if="!isEmpty(item.new_cover)">
                                            <image-empty v-model="item.new_cover[0]" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <template v-else>
                                            <image-empty v-model="item.images" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <!-- 角标 -->
                                        <subscript-index :value="props.value"></subscript-index>
                                    </div>
                                </template>
                                <div v-if="is_show('title') || is_show('simple_desc') || is_show('price') || is_show('original_price') || is_show('sales_count') || is_show('plugins_view_icon') || form.is_shop_show == '1'" class="flex-col flex-1 jc-sb content gap-10" :style="content_style">
                                    <div class="flex-col gap-10 top-title">
                                        <div v-if="is_show('title') || (['0', '1', '2', '3', '5'].includes(theme) && is_show('simple_desc'))" class="flex-col" :style="`gap: ${ new_style.title_simple_desc_spacing }px;`">
                                            <div v-if="is_show('title')" :class="text_line" :style="trends_config('title', 'title')">{{ item.title }}</div>
                                            <div v-if="['0', '1', '2', '3', '5'].includes(theme) && is_show('simple_desc')" class="text-line-1" :style="trends_config('simple_desc', 'desc')">{{ item.simple_desc }}</div>
                                        </div>
                                        <div v-if="show_content && is_show('plugins_view_icon') && !isEmpty(item.plugins_view_icon_data)" class="flex-row gap-5 align-c">
                                            <div v-for="(icon_data, icon_index) in item.plugins_view_icon_data" :key="icon_index" class="radius-sm size-9 pl-3 pr-3" :style="icon_style(icon_data)">{{ icon_data.name }}</div>
                                        </div>
                                    </div>
                                    <div v-if="!['3', '4', '5'].includes(form.theme)" class="flex-col gap-5 oh">
                                        <div :class="[form.is_price_solo == '1' ? 'flex-row align-c nowrap' : 'flex-col gap-5']">
                                            <div v-if="is_show('price') && (!isEmpty(item.min_price) || typeof item.min_price == 'number')" class="num" :style="`color: ${new_style.shop_price_color}`">
                                                <span class="identifying">{{ item.show_price_symbol }}</span
                                                ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                                <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                            </div>
                                            <div v-if="show_content && is_show('original_price') && (!isEmpty(item.min_original_price) || typeof item.min_original_price == 'number')" class="size-10 flex">
                                                <!-- <img class="original-price-left" :src="form.static_img[0].url" /> -->
                                                <span :class="['original-price text-line-1', { 'flex-1': form.is_price_solo == '1' }]"
                                                    >{{ item.show_original_price_symbol }}{{ item.min_original_price }}
                                                    <template v-if="is_show('original_price_unit')">
                                                        {{ item.show_original_price_unit }}
                                                    </template>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex-row jc-sb align-e">
                                            <div>
                                                <div v-if="show_content" class="flex-row align-c size-10">
                                                    <div v-if="is_show('sales_count')" class="pr-5" :style="trends_config('sold_number')">已售{{ item.sales_count }}件</div>
                                                    <!-- <div v-if="is_show('sales_count')" :class="['pr-5', {'br-r-e': is_show('sales_count') && is_show('4')}]" :style="trends_config('sold_number')">已售{{ item.sales_count }}件</div> -->
                                                    <!-- <div v-if="is_show('4')" class="pl-5" :style="trends_config('score')">评分0</div> -->
                                                </div>
                                            </div>
                                            <div v-if="form.is_shop_show == '1'">
                                                <template v-if="form.shop_type == 'text'">
                                                    <div class="plr-11 ptb-3 round cr-f" :style="trends_config('button', 'gradient') + `color: ${new_style.shop_button_text_color};`">{{ form.shop_button_text }}</div>
                                                </template>
                                                <template v-else>
                                                    <icon class="round plr-6 ptb-5" :name="!isEmpty(form.shop_button_icon_class) ? form.shop_button_icon_class : 'cart'" :color="new_style.shop_icon_color" :size="new_style.shop_icon_size + ''" :styles="button_gradient()"></icon>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="flex-row align-c jc-sb">
                                        <div class="flex-row align-c nowrap">
                                            <div v-if="is_show('price') && (!isEmpty(item.min_price) || typeof item.min_price == 'number')" class="num" :style="`color: ${new_style.shop_price_color}`">
                                                <span class="identifying">{{ item.show_price_symbol }}</span
                                                ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                                <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                            </div>
                                            <div v-if="show_content && is_show('original_price') && (!isEmpty(item.min_original_price) || typeof item.min_original_price == 'number')" class="size-10 flex">
                                                <!-- <img class="original-price-left" :src="form.static_img[0].url" /> -->
                                                <span :class="['original-price text-line-1', { 'flex-1': form.is_price_solo == '1' }]"
                                                    >{{ item.show_original_price_symbol }}{{ item.min_original_price }}
                                                    <template v-if="is_show('original_price_unit')">
                                                        {{ item.show_original_price_unit }}
                                                    </template>
                                                </span>
                                            </div>
                                        </div>
                                        <div v-if="form.is_shop_show == '1'">
                                            <template v-if="form.shop_type == 'text'">
                                                <div class="plr-11 ptb-3 round cr-f" :style="trends_config('button', 'gradient') + `color: ${new_style.shop_button_text_color};`">{{ form.shop_button_text }}</div>
                                            </template>
                                            <template v-else>
                                                <icon class="round plr-6 ptb-5" :name="!isEmpty(form.shop_button_icon_class) ? form.shop_button_icon_class : 'cart'" :color="new_style.shop_icon_color" :size="new_style.shop_icon_size + ''" :styles="button_gradient()"></icon>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <swiper :key="carouselKey" class="w flex" direction="horizontal" :loop="true" :autoplay="autoplay" :slides-per-view="form.carousel_col" :slides-per-group="slides_per_group" :allow-touch-move="false" :space-between="content_outer_spacing" :pause-on-mouse-enter="true" :modules="modules">
                        <swiper-slide v-for="(item, index) in list" :key="index" :class="layout_type" :style="layout_style">
                            <div :class="['oh w h', ['0', '4'].includes(theme) ? 'flex-row' : 'flex-col' ]" :style="layout_img_style">
                                <template v-if="!isEmpty(item)">
                                    <div class="oh re" :class="`flex-img${theme}`">
                                        <template v-if="!isEmpty(item.new_cover)">
                                            <image-empty v-model="item.new_cover[0]" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <template v-else>
                                            <image-empty v-model="item.images" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <!-- 角标 -->
                                        <subscript-index :value="props.value"></subscript-index>
                                    </div>
                                </template>
                                <div v-if="is_show('title') || is_show('simple_desc') || is_show('price') || is_show('plugins_view_icon') || is_show('original_price') || form.is_shop_show == '1'" class="flex-col flex-1 jc-sb content gap-10" :style="content_style">
                                    <div class="flex-col gap-10 top-title">
                                        <div v-if="is_show('title') || (['0', '1', '2', '3', '5'].includes(theme) && is_show('simple_desc'))" class="flex-col" :style="`gap: ${ new_style.title_simple_desc_spacing }px;`">
                                            <div v-if="is_show('title')" :class="text_line" :style="trends_config('title', 'title')">{{ item.title }}</div>
                                            <div v-if="['0', '1', '2', '3', '5'].includes(theme) && is_show('simple_desc')" class="text-line-1" :style="trends_config('simple_desc', 'desc')">{{ item.simple_desc }}</div>
                                        </div>
                                        <div v-if="show_content && is_show('plugins_view_icon') && !isEmpty(item.plugins_view_icon_data)" class="flex-row gap-5 align-c">
                                            <div v-for="(icon_data, icon_index) in item.plugins_view_icon_data" :key="icon_index" class="radius-sm size-9 pl-3 pr-3" :style="icon_style(icon_data)">{{ icon_data.name }}</div>
                                        </div>
                                    </div>
                                    <div class="flex-row align-c jc-sb">
                                        <div class="flex-row align-c nowrap">
                                            <div v-if="is_show('price') && (!isEmpty(item.min_price) || typeof item.min_price == 'number')" class="num" :style="`color: ${new_style.shop_price_color}`">
                                                <span class="identifying">{{ item.show_price_symbol }}</span
                                                ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                                <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                            </div>
                                            <div v-if="show_content && is_show('original_price') && (!isEmpty(item.min_original_price) || typeof item.min_original_price == 'number')" class="size-10 flex">
                                                <!-- <img class="original-price-left" :src="form.static_img[0].url" /> -->
                                                <span :class="['original-price text-line-1', { 'flex-1': form.is_price_solo == '1' }]"
                                                    >{{ item.show_original_price_symbol }}{{ item.min_original_price }}
                                                    <template v-if="is_show('original_price_unit')">
                                                        {{ item.show_original_price_unit }}
                                                    </template>
                                                </span>
                                            </div>
                                        </div>
                                        <div v-if="form.is_shop_show == '1'">
                                            <template v-if="form.shop_type == 'text'">
                                                <div class="plr-11 ptb-3 round cr-f" :style="trends_config('button', 'gradient') + `color: ${new_style.shop_button_text_color};`">{{ form.shop_button_text }}</div>
                                            </template>
                                            <template v-else>
                                                <icon class="round plr-6 ptb-5" :name="!isEmpty(form.shop_button_icon_class) ? form.shop_button_icon_class : 'cart'" :color="new_style.shop_icon_color" :size="new_style.shop_icon_size + ''" :styles="button_gradient()"></icon>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_img_computer, common_styles_computer, get_math, gradient_handle, padding_computer, radius_computer, background_computer } from '@/utils';
import { isEmpty, cloneDeep, throttle } from 'lodash';
import ShopAPI from '@/api/shop';
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
    isCommonStyle: {
        type: Boolean,
        default: true,
    },
});

const form = computed(() => props.value?.content || {});
const new_style = computed(() => props.value?.style || {});

interface plugins_icon_data {
    name: string;
    bg_color: string;
    br_color: string;
    color: string;
    url: string;
}
interface data_list {
    title: string;
    images: string;
    new_cover: string[];
    min_original_price: string;
    show_original_price_symbol: string;
    show_original_price_unit: string;
    simple_desc: string;
    min_price: string;
    title_simple_desc_spacing: string;
    show_price_symbol: string;
    show_price_unit: string;
    sales_count: string;
    plugins_view_icon_data: plugins_icon_data[];
}
const default_list = {
    title: '测试商品标题',
    min_original_price: '41.2',
    show_original_price_symbol: '￥',
    show_original_price_unit: '/ 台',
    min_price: '51',
    show_price_symbol: '￥',
    show_price_unit: '/ 台',
    sales_count: '1000',
    images: '',
    new_cover: [],
    plugins_view_icon_data: [
        {
            name: '满减活动',
            bg_color: '#EA3323',
            br_color: '',
            color: '#fff',
            url: '',
        },
        {
            name: '包邮',
            bg_color: '',
            br_color: '#EA3323',
            color: '#EA3323',
            url: '',
        },
        {
            name: '领劵',
            bg_color: '',
            br_color: '#EA9223',
            color: '#EA9223',
            url: '',
        },
    ],
};
//#region 列表数据
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
        list.value = Array(4).fill(default_list);
    }
});

const get_products = () => {
    const { category_ids, brand_ids, number, order_by_type, order_by_rule, keyword } = form.value;
    const params = {
        goods_keywords: keyword,
        goods_category_ids: category_ids,
        goods_brand_ids: brand_ids,
        goods_order_by_type: order_by_type,
        goods_order_by_rule: order_by_rule,
        goods_number: number,
    };
    // 获取商品列表
    ShopAPI.getShopLists(params).then((res: any) => {
        if (!isEmpty(res.data)) {
            list.value = res.data;
        } else {
            list.value = Array(4).fill(default_list);
        }
    });
};
// 取出监听的数据
const watch_data = computed(() => {
    const { category_ids, brand_ids, number, order_by_type, order_by_rule, data_type, data_list, keyword } = form.value;
    return { category_ids: category_ids, brand_ids: brand_ids, number: number, order_by_type: order_by_type, order_by_rule: order_by_rule, data_type: data_type, data_list: data_list, keyword: keyword };
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

// 圆角设置
const content_radius = computed(() => radius_computer(new_style.value.shop_radius));
// 图片圆角设置
const content_img_radius = computed(() => radius_computer(new_style.value.shop_img_radius));
// 内边距设置
const content_padding = computed(() => padding_computer(new_style.value.shop_padding));
// 选择的风格
const theme = computed(() => form.value.theme);
// 商品间距
const content_outer_spacing = computed(() => new_style.value.content_outer_spacing);
// 两列风格
const two_columns = computed(() => content_outer_spacing.value + 'px');
// 三列风格
const three_columns = computed(() => content_outer_spacing.value * 2 + 'px');

// 最外层不同风格下的显示
const outer_class = computed(() => {
    const flex = ['0', '2', '6'].includes(theme.value) ? 'flex-col ' : 'flex-row ';
    const wrap = theme.value == '5' ? '' : 'flex-wrap ';
    const background = ['6'].includes(theme.value) ? 'bg-f ' : '';
    return flex + wrap + background + 'oh';
});
const onter_style = computed(() => {
    const radius = theme.value == '6' ? content_radius.value : `gap: ${new_style.value.content_outer_spacing + 'px'};`;
    return `${radius}`;
});
// 不同风格下的样式
const layout_type = computed(() => {
    let class_type = '';
    switch (theme.value) {
        case '0':
            class_type = `oh`;
            break;
        case '1':
            class_type = `two-columns oh`;
            break;
        case '2':
            class_type = `oh`;
            break;
        case '3':
            class_type = `three-columns oh`;
            break;
        case '4':
            class_type = `two-columns oh`;
            break;
        case '5':
            class_type = `multicolumn-columns oh`;
            break;
        default:
            break;
    }
    return class_type;
});
// 容器样式
const layout_style = computed(() => {
    const radius = theme.value == '6' ? '' : content_radius.value;
    const gradient = theme.value != '6' ? gradient_handle(new_style.value.shop_color_list, new_style.value.shop_direction) : '';
    return `${radius} ${ gradient }`;
});

// 容器图片样式
const layout_img_style = computed(() => {
    const padding = ['0', '4'].includes(theme.value) ? content_padding.value : '';
    const data = {
        background_img_style: new_style.value.shop_background_img_style,
        background_img: new_style.value.shop_background_img,
    }
    const background = theme.value != '6' ? background_computer(data) : '';
    return padding + background;
});

// 内容区域的样式
const content_style = computed(() => {
    const spacing_value = new_style.value.content_spacing;
    let spacing = '';
    if (['0', '4'].includes(theme.value)) {
        spacing = `margin-left: ${spacing_value}px;`;
    } else {
        spacing = content_padding.value;
    }
    if (['4'].includes(theme.value)) {
        spacing += `width: 0;`;
    }
    return `${spacing}`;
});
// 显示除标题外的其他区域
const show_content = computed(() => ['0', '1', '2'].includes(theme.value));
// 超过多少行隐藏
const text_line = computed(() => {
    let line = '';
    if (['1', '6'].includes(theme.value)) {
        line = 'text-line-1';
    } else if (['0', '2', '3', '4', '5'].includes(theme.value)) {
        line = 'text-line-2';
    }
    return line;
});
// 判断是否显示对应的内容
const is_show = (index: string) => {
    return form.value.is_show.includes(index);
};
// 根据传递的参数，从对象中取值
const trends_config = (key: string, type?: string) => {
    return style_config(new_style.value[`shop_${key}_typeface`], new_style.value[`shop_${key}_size`], new_style.value[`shop_${key}_color`], type);
};
// 根据传递的值，显示不同的内容
const style_config = (typeface: string, size: number, color: string | object, type?: string) => {
    let style = `font-weight:${typeface}; font-size: ${size}px;`;
    if (type == 'gradient') {
        style += button_gradient();
    } else if (type == 'title') {
        if (['1', '6'].includes(theme.value)) {
            style += `line-height: ${size}px;height: ${size}px;color: ${color};`;
        } else if (['0', '2', '3', '4', '5'].includes(theme.value)) {
            style += `line-height: ${size > 0 ? size + 3 : 0}px;height: ${size > 0 ? (size + 3) * 2 : 0}px;color: ${color};`;
        }
    } else if (type == 'desc') {
        style += `line-height: ${size}px;height: ${size}px;color: ${color};`;
    } else {
        style += `color: ${color};`;
    }
    return style;
};
// 按钮渐变色处理
const button_gradient = () => {
    return gradient_handle(new_style.value.shop_button_color, '180deg');
};
// icon标志显示样式
const icon_style = (item: { bg_color: string; color: string; br_color: string }) => {
    let style = `background: ${item.bg_color};color: ${item.color};`;
    if (!isEmpty(item.br_color)) {
        style += `border: 1px solid ${item.br_color};`;
    } else {
        style += `border: 1px solid ${item.bg_color};`;
    }
    return style;
};
// 公共样式
const style_container = computed(() => {
    if (props.isCommonStyle) {
        return common_styles_computer(new_style.value.common_style);
    } else {
        return '';
    }
});

const style_img_container = computed(() => {
    if (props.isCommonStyle) {
        return common_img_computer(new_style.value.common_style);
    } else {
        return '';
    }
});
// 不换行显示
const multicolumn_columns_width = computed(() => {
    const { carousel_col } = toRefs(form.value);
    // 计算间隔的空间。(gap * gap数量) / 模块数量
    let gap = (new_style.value.content_outer_spacing * (carousel_col.value - 1)) / carousel_col.value;
    return `calc(${100 / carousel_col.value}% - ${gap}px)`;
});
const content_outer_height = computed(() => new_style.value.content_outer_height + 'px');
const product_style_list = [
    { name: '单列展示', value: '0', width: 110, height: 120 },
    { name: '大图展示', value: '2', width: 166, height: 166 },
    { name: '无图模式', value: '6', width: 0, height: 0 },
    { name: '两列展示(纵向)', value: '1', width: 180, height: 180 },
    { name: '两列展示(横向)', value: '4', width: 70, height: 70 },
    { name: '三列展示', value: '3', width: 116, height: 114 },
    { name: '左右滑动展示', value: '5', width: 0, height: 0 },
]
// 宽度和高度为空的时候，修改默认值
const goods_img_width = computed(() => {
    if (typeof new_style.value.content_img_width == 'number') {
        return new_style.value.content_img_width + 'px';
    } else {
        const list = product_style_list.filter(item => item.value == form.value.theme);
        if (list.length > 0) {
            return list[0].width + 'px';
        } else {
            return 'auto';
        }
    }
});
// 宽度和高度为空的时候，修改默认值
const goods_img_height = computed(() => {
    if (typeof new_style.value.content_img_height == 'number') {
        return new_style.value.content_img_height + 'px';
    } else {
        const list = product_style_list.filter(item => item.value == form.value.theme);
        if (list.length > 0) {
            return list[0].height + 'px';
        } else {
            return 'auto';
        }
    }
});
//#region 轮播设置
// 轮播图key值
const carouselKey = ref('0');
const autoplay = ref<boolean | object>(false);
const slides_per_group = ref(1);
// 内容参数的集合
watchEffect(() => {
    // 是否滚动
    if (new_style.value.is_roll == '1' && list.value.length > 0) {
        autoplay.value = {
            delay: (new_style.value.interval_time || 2) * 1000,
            pauseOnMouseEnter: true,
        };
    } else {
        autoplay.value = false;
    }
    // 判断是平移还是整屏滚动
    slides_per_group.value = new_style.value.rolling_fashion == 'translation' ? 1 : form.value.carousel_col;
    // 更新轮播图的key，确保更换时能重新更新轮播图
    carouselKey.value = get_math();
});
//#endregion
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    background-color: #fff;
    .image-slot img {
        width: 5rem;
        height: 5rem;
    }
}

.identifying {
    font-size: 0.9rem;
}
// .original-price-left {
//     width: 1rem;
// }
.original-price {
    // background-color: #ede2c5;
    border-radius: 0;
    color: #999;
    text-decoration: line-through;
    font-size: 1.2rem;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 0 1rem;
}
.two-columns {
    width: calc((100% - v-bind(two_columns)) / 2);
}
.three-columns {
    width: calc((100% - v-bind(three_columns)) / 3);
}
.multicolumn-columns {
    width: v-bind(multicolumn_columns_width);
    min-width: v-bind(multicolumn_columns_width);
    height: v-bind(content_outer_height);
}
.flex-img0 {
    height: v-bind(goods_img_height);
    width: v-bind(goods_img_width);
}
.flex-img1 {
    width: 100%;
    height: v-bind(goods_img_height);
}
.flex-img2 {
    width: 100%;
    height: v-bind(goods_img_height);
}
.flex-img3 {
    width: 100%;
    height: v-bind(goods_img_height);
}
.flex-img4 {
    height: v-bind(goods_img_height);
    width: v-bind(goods_img_width);
}
.flex-img5 {
    width: 100%;
    height: 100%;
    // min-height: 10.4rem;
}
:deep(.el-carousel) {
    width: 100%;
    .el-carousel__container {
        min-width: v-bind(multicolumn_columns_width);
    }
}
</style>
