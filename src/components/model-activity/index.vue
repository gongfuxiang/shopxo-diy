<template>
    <div class="oh" :style="style_container">
        <div :style="style_img_container">
            <div class="oh flex-col" :style="`gap: ${ new_style.activity_outer_spacing }px;`">
                <div v-for="(activity_item, match_index) in list" :key="match_index">
                    <div class="oh" :style="style_activity_content_container">
                        <div class="oh flex-col" :style="style_activity_content_img_container + `gap: ${ new_style.shop_content_spacing }px;`">
                            <div class="oh" :style="style_activity_container">
                                <div :class="theme == '0' ? 'flex-row ' : 'oh flex-col '" :style="style_activity_img_container">
                                    <template v-if="!isEmpty(activity_item) && (is_show('img') || (theme == '2' && is_show('title')))">
                                        <div class="oh re" :class="`flex-img${theme}`">
                                            <template v-if="!isEmpty(activity_item.new_cover)">
                                                <image-empty v-model="activity_item.new_cover[0]" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                            </template>
                                            <template v-else>
                                                <image-empty v-model="activity_item.cover" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                            </template>
                                            <template v-if="theme == '2'">
                                                <div class="w h abs top-0 left-0 z-i" :style="(form.is_img_mask == '1' ? 'background: rgb(0 0 0 / 35%);' : '') + content_img_radius"></div>
                                                <div v-if="is_show('title')" class="theme-2-title z-deep" :style="trends_config('title')">{{ activity_item.title }}</div>
                                            </template>
                                        </div>
                                    </template>
                                    <div v-if="is_show('keywords') || is_show('desc') || (['0', '1'].includes(theme) && is_show('title'))" class="flex-1 flex-col gap-10" :style="content_style">
                                        <div class="flex-col" :style="`gap: ${ new_style.activity_main.desc_spacing }px;`">
                                            <div v-if="['0', '1'].includes(theme) && is_show('title')" :style="trends_config('title')">{{ activity_item.title }}</div>
                                            <div v-if="is_show('desc')" :style="trends_config('desc')">{{ activity_item.describe }}</div>
                                        </div>
                                        <div v-if="is_show('keywords')" class="flex-row gap-10 align-c flex-wrap">
                                            <div v-for="(item, index) in activity_item.keywords_arr" :key="index" :style="keyword_style">
                                                <div class="nowrap" :style="keyword_img_style">{{ item }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!isEmpty(activity_item.goods_list)" class="oh" :style="shop_container">
                                <div class="oh" :style="shop_img_container">
                                    <model-goods-list :value="props.value" :new-list="activity_item.goods_list" :is-use-auto="false" :is-common-style="false"></model-goods-list>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_img_computer, common_styles_computer, gradient_computer, padding_computer, radius_computer, background_computer, border_computer } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
import ActivityAPI from '@/api/activity';

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

type data_list = {
    title: string;
    cover: string;
    new_cover: string[];
    keywords_arr: string[],
    describe: string,
    goods_list: any[]
}
const default_list = {
    cover: '',
    title: '测试商品标题',
    new_cover: [],
    keywords_arr: ["小米", "手机", "iphone"],
    describe: '测试描述',
    goods_list: [
        {
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
            is_error: 0,
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
        },
        {
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
            is_error: 0,
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
        }
    ]
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
    const { category_ids, number, order_by_type, order_by_rule, keywords, is_home } = form.value;
    const params = {
        activity_keywords: keywords,
        activity_category_ids: category_ids,
        activity_order_by_type: order_by_type,
        activity_order_by_rule: order_by_rule,
        activity_number: number,
        activity_is_home: is_home,
    };
    // 获取商品列表
    ActivityAPI.getAutoList(params).then((res: any) => {
        if (!isEmpty(res.data)) {
            list.value = res.data;
        } else {
            list.value = Array(4).fill(default_list);
        }
    })
};
// 取出监听的数据
const watch_data = computed(() => {
    const { category_ids, number, order_by_type, order_by_rule, data_type, data_list, keywords, is_home } = form.value;
    return { category_ids, number, order_by_type, order_by_rule, data_type, data_list, keywords, is_home };
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
//#region 活动内容样式设置
const theme = computed(() => form.value.main_theme);
// 判断是否显示对应的内容
const is_show = (index: string) => {
    return form.value.is_main_show.includes(index);
};
// 根据传递的参数，从对象中取值
const trends_config = (key: string) => {
    return style_config(new_style.value.activity_main[`${key}_typeface`], new_style.value.activity_main[`${key}_size`], new_style.value.activity_main[`${key}_color`]);
};
// 根据传递的值，显示不同的内容
const style_config = (typeface: string, size: number, color: string | object) => {
    return `font-weight:${typeface}; font-size: ${size}px;color: ${color};word-break: break-all;`;
};
// 活动的图片圆角
const content_img_radius = computed(() => radius_computer(new_style.value.activity_main.img_radius));
// 关键字的显示
const keyword_style = computed(() => {
    const style = new_style.value.activity_main?.keywords_style || {};
    return `${ gradient_computer(style)}; ${ border_computer(style) } ${ radius_computer(style.font_radius)}`;
})
const keyword_img_style = computed(() => {
    const style = new_style.value.activity_main?.keywords_style || {};
    return `${ padding_computer(style.font_padding) } ${ background_computer(style) }font-weight:${style.font_typeface}; font-size: ${style.font_size}px;line-height: 1.5;color: ${style.font_color};`;
})
// 内容区域的样式
const content_style = computed(() => padding_computer(new_style.value.activity_main.activity_main_right_content));
// 活动图片的高度和宽度
const activity_style_list = [
    { name: '左图右文', value: '0', width: 143, height: 143 },
    { name: '上图下文', value: '1', width: 0, height: 126 },
    { name: '大图显示', value: '2', width: 0, height: 126 },
]
// 宽度和高度为空的时候，修改默认值
const activity_img_width = computed(() => {
    if (typeof new_style.value.activity_main.img_width == 'number') {
        return new_style.value.activity_main.img_width + 'px';
    } else {
        const list = activity_style_list.filter(item => item.value == form.value.main_theme);
        if (list.length > 0) {
            return list[0].width + 'px';
        } else {
            return 'auto';
        }
    }
});
// 宽度和高度为空的时候，修改默认值
const activity_img_height = computed(() => {
    if (typeof new_style.value.activity_main.img_height == 'number') {
        return new_style.value.activity_main.img_height + 'px';
    } else {
        const list = activity_style_list.filter(item => item.value == form.value.main_theme);
        if (list.length > 0) {
            return list[0].height + 'px';
        } else {
            return 'auto';
        }
    }
});
// 商品区域样式设置
const shop_container = computed(() => common_styles_computer(new_style.value.shop_content));
const shop_img_container = computed(() => common_img_computer(new_style.value.shop_content));
// 活动区域的公共样式
const style_activity_container = computed(() => common_styles_computer(new_style.value.activity_main));
const style_activity_img_container = computed(() => common_img_computer(new_style.value.activity_main));
// 活动内容区域的背景样式
const style_activity_content_container = computed(() => common_styles_computer(new_style.value.activity_content));
const style_activity_content_img_container = computed(() => common_img_computer(new_style.value.activity_content));
//#endregion
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    background-color: #fff;
    .image-slot img {
        width: 5rem;
        height: 5rem;
    }
}
.flex-img0 {
    height: v-bind(activity_img_height);
    width: v-bind(activity_img_width);
}
.flex-img1 {
    width: 100%;
    height: v-bind(activity_img_height);
}
.flex-img2 {
    width: 100%;
    height: v-bind(activity_img_height);
}
.theme-2-title {
    position: absolute;
    top: 50%;
    left: 50%;
    // margin-left: 1.7rem;
    transform: translate(-50%, -50%);
}
</style>
