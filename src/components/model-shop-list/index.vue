<template>
    <div class="oh" :style="style_container">
        <div :class="outer_class" :style="onter_style">
            <template v-if="!['5'].includes(theme)">
                <div v-for="(item, index) in list" :key="index" class="re" :class="layout_type" :style="layout_style">
                    <template v-if="theme == '6'">
                        <div :class="['flex-row align-c jc-sb ptb-15 mlr-10 gap-20', { 'br-b-e': index != list.length - 1 }]">
                            <div v-if="is_show('title')" :class="text_line" :style="trends_config('title')">{{ item.title }}</div>
                            <div v-if="is_show('price')" class="num nowrap" :style="`color: ${new_style.shop_price_color}`">
                                <span class="identifying">{{ item.show_price_symbol }}</span
                                ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="!isEmpty(item)">
                            <template v-if="!isEmpty(item.new_cover)">
                                <image-empty v-model="item.new_cover[0]" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                            </template>
                            <template v-else>
                                <image-empty v-model="item.images" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                            </template>
                        </template>
                        <div class="flex-col flex-1 jc-sb content gap-10" :style="content_style">
                            <div class="flex-col gap-10 top-title">
                                <div v-if="is_show('title')" :class="text_line" :style="trends_config('title')">{{ item.title }}</div>
                                <div v-if="show_content && is_show('plugins_view_icon') && !isEmpty(item.plugins_view_icon_data)" class="flex-row gap-5 align-c">
                                    <div v-for="(icon_data, icon_index) in item.plugins_view_icon_data" :key="icon_index" class="radius-sm size-9 pl-3 pr-3" :style="icon_style(icon_data)">{{ icon_data.name }}</div>
                                </div>
                            </div>
                            <div v-if="!['3', '4', '5'].includes(form.theme)" class="flex-col gap-5 oh">
                                <div :class="[form.is_price_solo ? 'flex-row align-c nowrap' : 'flex-col gap-5']">
                                    <div v-if="is_show('price')" class="num" :style="`color: ${new_style.shop_price_color}`">
                                        <span class="identifying">{{ item.show_price_symbol }}</span
                                        ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                        <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                    </div>
                                    <div v-if="show_content && is_show('original_price')" class="size-10 flex">
                                        <span class="original-price-left"></span
                                        ><span :class="['original-price text-line-1', { 'flex-1': form.is_price_solo }]"
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
                                    <div v-if="form.is_shop_show">
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
                                    <div v-if="is_show('price')" class="num" :style="`color: ${new_style.shop_price_color}`">
                                        <span class="identifying">{{ item.show_price_symbol }}</span
                                        ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                        <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                    </div>
                                    <div v-if="show_content && is_show('original_price')" class="size-10 flex">
                                        <span class="original-price-left"></span
                                        ><span :class="['original-price text-line-1', { 'flex-1': form.is_price_solo }]"
                                            >{{ item.show_original_price_symbol }}{{ item.min_original_price }}
                                            <template v-if="is_show('original_price_unit')">
                                                {{ item.show_original_price_unit }}
                                            </template>
                                        </span>
                                    </div>
                                </div>
                                <div v-if="form.is_shop_show">
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
            </template>
            <template v-else>
                <el-carousel :key="carouselKey" indicator-position="none" :interval="interval_time" arrow="never" :autoplay="is_roll">
                    <el-carousel-item v-for="(item1, index1) in shop_content_list" :key="index1" class="flex-row" :style="onter_style">
                        <div v-for="(item, index) in item1.split_list" :key="index" class="re" :class="layout_type" :style="layout_style">
                            <template v-if="!isEmpty(item)">
                                <template v-if="!isEmpty(item.new_cover)">
                                    <image-empty v-model="item.new_cover[0]" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                </template>
                                <template v-else>
                                    <image-empty v-model="item.images" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                </template>
                            </template>
                            <div class="flex-col flex-1 jc-sb content gap-10" :style="content_style">
                                <div class="flex-col gap-10 top-title">
                                    <div v-if="is_show('title')" :class="text_line" :style="trends_config('title')">{{ item.title }}</div>
                                    <div v-if="show_content && is_show('plugins_view_icon') && !isEmpty(item.plugins_view_icon_data)" class="flex-row gap-5 align-c">
                                        <div v-for="(icon_data, icon_index) in item.plugins_view_icon_data" :key="icon_index" class="radius-sm size-9 pl-3 pr-3" :style="icon_style(icon_data)">{{ icon_data.name }}</div>
                                    </div>
                                </div>
                                <div class="flex-row align-c jc-sb">
                                    <div class="flex-row align-c nowrap">
                                        <div v-if="is_show('price')" class="num" :style="`color: ${new_style.shop_price_color}`">
                                            <span class="identifying">{{ item.show_price_symbol }}</span
                                            ><span :style="trends_config('price')">{{ item.min_price }}</span>
                                            <span v-if="is_show('price_unit')" class="identifying">{{ item.show_price_unit }}</span>
                                        </div>
                                        <div v-if="show_content && is_show('original_price')" class="size-10 flex">
                                            <span class="original-price-left"></span
                                            ><span :class="['original-price text-line-1', { 'flex-1': form.is_price_solo }]"
                                                >{{ item.show_original_price_symbol }}{{ item.min_original_price }}
                                                <template v-if="is_show('original_price_unit')">
                                                    {{ item.show_original_price_unit }}
                                                </template>
                                            </span>
                                        </div>
                                    </div>
                                    <div v-if="form.is_shop_show">
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
                    </el-carousel-item>
                </el-carousel>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, get_math, gradient_handle, padding_computer, radius_computer } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
import ShopAPI from '@/api/shop';

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
    min_price: string;
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
const list = ref<data_list[]>([]);

const get_products = () => {
    const { category, data_ids, number, sort, sort_rules } = form.value;
    const params = {
        goods_keywords: '',
        goods_category_ids: category,
        goods_brand_ids: data_ids,
        goods_order_by_type: sort,
        goods_order_by_rule: sort_rules,
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

watchEffect(() => {
    if (form.value.data_type == '0') {
        if (!isEmpty(form.value.data_list)) {
            list.value = cloneDeep(form.value.data_list).map((item: any) => ({
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
});

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
            class_type = `flex-row bg-f oh`;
            break;
        case '1':
            class_type = `flex-col two-columns bg-f oh`;
            break;
        case '2':
            class_type = `flex-col bg-f oh`;
            break;
        case '3':
            class_type = `flex-col three-columns bg-f oh`;
            break;
        case '4':
            class_type = `flex-row two-columns bg-f oh`;
            break;
        case '5':
            class_type = `flex-col multicolumn-columns bg-f oh`;
            break;
        default:
            break;
    }
    return class_type;
});

const layout_style = computed(() => {
    const radius = theme.value == '6' ? '' : content_radius.value;
    const padding = ['0', '4'].includes(theme.value) ? content_padding.value : '';
    return `${radius} ${padding}`;
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

//#region 轮播设置
// 记录当前显示的轮播图的数据
// 不换行显示
const multicolumn_columns_width = computed(() => {
    const { carousel_col } = toRefs(form.value);
    // 计算间隔的空间。(gap * gap数量) / 模块数量
    let gap = (new_style.value.content_outer_spacing * (carousel_col.value - 1)) / carousel_col.value;
    return `calc(${100 / carousel_col.value}% - ${gap}px)`;
});
const multicolumn_columns_height = computed(() => new_style.value.content_outer_height + 'px');
const interval_list = ref({
    time: 2000,
    is_roll: true,
    notice_length: 1,
});
interface nav_list {
    split_list: data_list[];
}
const shop_content_list = computed(() => {
    // 深拷贝一下，确保不会出现问题
    const cloneList = cloneDeep(list.value);
    // 如果是分页滑动情况下，根据选择的行数和每行显示的个数来区分具体是显示多少个
    if (cloneList.length > 0) {
        // 每页显示的数量
        const num = form.value.carousel_col;
        // 存储数据显示
        let nav_list: nav_list[] = [];
        // 拆分的数量
        const split_num = Math.ceil(cloneList.length / num);
        for (let i = 0; i < split_num; i++) {
            nav_list.push({ split_list: cloneList.slice(i * num, (i + 1) * num) });
        }
        return nav_list;
    } else {
        // 否则的话，就返回全部的信息
        return [{ split_list: cloneList }];
    }
});
// 轮播图定时显示
const interval_time = ref(2000);
// 轮播图是否滚动
const is_roll = ref(true);
// 轮播图key值
const carouselKey = ref('0');
// 内容参数的集合
watchEffect(() => {
    const time = (new_style.value.interval_time || 2) * 1000;
    const display_is_roll = new_style.value.is_roll;
    // 判断长度是否相等
    const notice_length = shop_content_list.value.length;
    // 判断跟历史的是否相等，不相等更新组件时间
    if (interval_list.value.time != time || interval_list.value.is_roll != display_is_roll || notice_length != interval_list.value.notice_length) {
        // 滚动时间
        interval_time.value = time;
        // 是否滚动修改
        is_roll.value = display_is_roll;
        // 记录历史保存的时间
        interval_list.value = {
            time: time,
            is_roll: display_is_roll,
            notice_length: notice_length,
        };
        // 更新轮播图的key，确保更换时能重新更新轮播图
        carouselKey.value = get_math();
    }
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
.original-price-left {
    width: 1rem;
    background-image: url('/src/assets/images/components/model-shop-list/price.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.original-price {
    background-color: #ede2c5;
    border-radius: 0;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 0 1rem 0 0;
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
    height: v-bind(multicolumn_columns_height);
}
.flex-img0 {
    height: auto;
    min-height: 11rem;
    max-height: 12rem;
    width: 11rem;
}
.flex-img1 {
    width: 100%;
    height: 18rem;
}
.flex-img2 {
    width: 100%;
    height: 16.6rem;
}
.flex-img3 {
    width: 100%;
    height: 11.4rem;
}
.flex-img4 {
    width: 7rem;
    height: 7rem;
}
.flex-img5 {
    width: 100%;
    min-height: 10.4rem;
}
:deep(.el-carousel) {
    width: 100%;
    .el-carousel__container {
        height: v-bind(multicolumn_columns_height);
    }
}
</style>
