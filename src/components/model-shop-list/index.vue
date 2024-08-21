<template>
    <div class="oh" :style="style_container">
        <div :class="outer_class" :style="onter_style">
            <div v-for="(item, index) in list" :key="index" class="re" :class="layout_type" :style="layout_style">
                <template v-if="product_style == '6'">
                    <div :class="['flex-row jc-sb ptb-15 mlr-10 gap-20', { 'br-b-e': index != list.length -1 }]">
                        <div v-if="is_show('0')" :class="text_line" :style="trends_config('title')">{{ item.title }}</div>
                        <div v-if="is_show('2')" class="num" :style="`color: ${ new_style.shop_price_color }`"><span class="identifying">￥</span><span :style="trends_config('price')">{{ item.min_price }}</span></div>
                    </div>
                </template>
                <template v-else>
                    <template v-if="!isEmpty(item)">
                        <template v-if="!isEmpty(item.new_url)">
                            <image-empty v-model="item.new_url[0]" :class="`flex-img${product_style} flex align-c jc-c`" :style="content_img_radius"></image-empty>
                        </template>
                        <template v-else-if="!isEmpty(item.images)">
                            <el-image :src="item.images" :class="`flex-img${product_style} flex align-c jc-c`" fit="contain" class="img"></el-image>
                        </template>
                        <template v-else>
                            <image-empty :class="`flex-img${product_style} flex align-c jc-c`" :style="content_img_radius"></image-empty>
                        </template>
                    </template>
                    <div class="flex-col flex-1 jc-sb content gap-10" :style="content_style">
                        <div class="flex-col gap-10 top-title">
                            <div v-if="is_show('0')" :class="text_line" :style="trends_config('title')">{{ item.title }}</div>
                            <div v-if="show_content && is_show('1')" class="flex-row gap-5">
                                <div class="one1 radius-sm size-9 pl-3 pr-3">{{ '满减活动' }}</div>
                                <div class="one2 radius-sm size-9 pl-3 pr-3">{{ '包邮' }}</div>
                                <div class="one3 radius-sm size-9 pl-3 pr-3">{{ '领劵' }}</div>
                            </div>
                        </div>
                        <div v-if="!['3','4','5'].includes(form.product_style)" class="flex-col gap-5 oh">
                            <div :class="[form.is_price_solo ? 'flex-row align-c nowrap': 'flex-col gap-5']">
                                <div v-if="is_show('2')" class="num" :style="`color: ${ new_style.shop_price_color }`"><span class="identifying">{{ item.show_price_symbol }}</span><span :style="trends_config('price')">{{ item.min_price }}</span><span class="identifying">{{ item.show_price_unit }}</span></div>
                                <div v-if="show_content && is_show('5')" class="size-10 flex"><span class="original-price-left"></span><span class="original-price flex-1 text-line-1">{{ item.show_original_price_symbol }}{{ item.min_original_price }}{{ item.show_original_price_unit }}</span></div>
                            </div>
                            <div class="flex-row jc-sb align-e">
                                <div>
                                    <div v-if="show_content" class="flex-row align-c size-10">
                                        <div v-if="is_show('3')" :class="['pr-5', {'br-r-e': is_show('3') && is_show('4')}]" :style="trends_config('sold_number')">已售{{ item.sales_count }}件</div>
                                        <div v-if="is_show('4')" class="pl-5" :style="trends_config('score')">评分0</div>
                                    </div>
                                </div>
                                <div v-if="form.is_shop_show">
                                    <template v-if="form.shop_type == '0'">
                                        <div class="pl-13 pr-13 round cr-f shopping_button" :style="trends_config('button','gradient')">购买</div>
                                    </template>
                                    <template v-else-if="form.shop_type == '1'">
                                        <div class="pl-11 pr-11 round cr-f shopping_button" :style="trends_config('button','gradient')">立即购买</div>
                                    </template>
                                    <template v-else-if="form.shop_type == '2'">
                                        <icon :class="['shopping_button round', {'pl-6 pr-6': shop_icon_size != '8', 'pl-5 pr-5' : shop_icon_size == '8' }] " name="add" color="f" :size="shop_icon_size" :styles="button_gradient()"></icon>
                                    </template>
                                    <template v-else>
                                        <icon :class="['shopping_button round', {'pl-6 pr-6': shop_icon_size != '8', 'pl-5 pr-5' : shop_icon_size == '8' }]" name="cart" color="f" :size="shop_icon_size" :styles="button_gradient()"></icon>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex-row align-c jc-sb">
                            <div class="flex-row align-c nowrap">
                                <div v-if="is_show('2')" class="num" :style="`color: ${ new_style.shop_price_color }`"><span class="identifying">{{ item.show_price_symbol }}</span><span :style="trends_config('price')">{{ item.min_price }}</span><span class="identifying">{{ item.show_price_unit }}</span></div>
                                <div v-if="show_content && is_show('5')" class="size-10 flex"><span class="original-price-left"></span><span class="original-price flex-1 text-line-1">{{ item.show_original_price_symbol }}{{ item.min_original_price }}{{ item.show_original_price_unit }}</span></div>
                            </div>
                            <div v-if="form.is_shop_show">
                                <template v-if="form.shop_type == '0'">
                                    <div class="pl-13 pr-13 round cr-f shopping_button" :style="trends_config('button','gradient')">购买</div>
                                </template>
                                <template v-else-if="form.shop_type == '1'">
                                    <div class="pl-11 pr-11 round cr-f shopping_button" :style="trends_config('button','gradient')">立即购买</div>
                                </template>
                                <template v-else-if="form.shop_type == '2'">
                                    <icon :class="['shopping_button round', {'pl-6 pr-6': shop_icon_size != '8', 'pl-5 pr-5' : shop_icon_size == '8' }] " name="add" color="f" :size="shop_icon_size" :styles="button_gradient()"></icon>
                                </template>
                                <template v-else>
                                    <icon :class="['shopping_button round', {'pl-6 pr-6': shop_icon_size != '8', 'pl-5 pr-5' : shop_icon_size == '8' }]" name="cart" color="f" :size="shop_icon_size" :styles="button_gradient()"></icon>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, gradient_handle, padding_computer, radius_computer } from '@/utils';
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
    }
});
// 用于页面判断显示
const state = reactive({
    form: props.value?.content || {},
    new_style: props.value?.style || {},
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);

// 目前显示假数据，日后通过分类或者选择的商品来显示真实数据
interface product_list {
    title: string;
    images: string;
    new_url: string[];
    min_original_price: string;
    show_original_price_symbol: string;
    show_original_price_unit: string;
    min_price: string;
    show_price_symbol: string;
    show_price_unit: string;
    sales_count: string;
}
const default_list = {
    title: '华为荣耀畅享平板换屏服务 屏幕换外屏',
    min_original_price: '41.2',
    show_original_price_symbol: "￥",
    min_price: '51',
    show_price_symbol: "￥",
    show_price_unit: "",
    sales_count: "1000",
    images: '',
    new_url: []
}
const list = ref<product_list[]>([]);
const get_products = () => {
    const { goods_category_ids, goods_brand_ids, number, sort, sort_rules } = form.value;
    const params = {
        goods_keywords: '',
        goods_category_ids: goods_category_ids,
        goods_brand_ids: goods_brand_ids,
        goods_order_by_type: sort,
        goods_order_by_rule: sort_rules,
        goods_number: number
    }
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
    if (form.value.product_check == '0') {
        if (!isEmpty(form.value.product_list)) {
            list.value = cloneDeep(form.value.product_list).map((item: any) => ({
                ...item.link,
                title: item.new_title,
                new_url: item.new_url,
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
const product_style = computed(() => form.value.product_style);
// 商品间距
const content_outer_spacing = computed(() => new_style.value.content_outer_spacing );
// 两列风格
const two_columns = computed(() => (content_outer_spacing.value) + 'px' );
// 三列风格
const three_columns = computed(() => (content_outer_spacing.value * 2) + 'px');
// 不换行显示
const multicolumn_columns = computed(() => new_style.value.content_outer_width + 'px');

// 最外层不同风格下的显示
const outer_class = computed(() => {
    const flex = ['0', '2', '6'].includes(product_style.value) ? 'flex-col ' : 'flex-row ';
    const wrap = product_style.value == '5' ? '' : 'flex-wrap ';
    const background = ['6'].includes(product_style.value) ? 'bg-f ' : '';
    return flex + wrap + background + 'oh';
});
const onter_style = computed(() => {
    const radius = product_style.value == '6' ? content_radius.value : '';
    const gap = `gap: ${ new_style.value.content_outer_spacing + 'px'};`;
    return `${ radius } ${ gap }`;
})

// 不同风格下的样式
const layout_type = computed(() => {
    let class_type = '';
    switch (product_style.value) {
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
})

const layout_style = computed(() => {
    const radius = product_style.value == '6' ? '' : content_radius.value;
    const padding = ['0', '4'].includes(product_style.value) ? content_padding.value : '';
    return `${ radius } ${ padding }`;
})
// 内容区域的样式
const content_style =  computed(() => {
    const spacing_value = new_style.value.content_spacing;
    let spacing =  '';
    if (['0', '4'] .includes(product_style.value)) {
        spacing = `margin-left: ${ spacing_value }px;`
    } else {
        spacing = content_padding.value;
    }
    
    return `${ spacing }`;
})
// 显示除标题外的其他区域
const show_content = computed(() => ['0', '1', '2'].includes(product_style.value));
// 超过多少行隐藏
const text_line = computed(() => {
    let line = '';
    if (['1', '6'].includes(product_style.value)) {
        line = 'text-line-1'
    } else if (['0', '2', '3', '4', '5'].includes(product_style.value)) {
        line = 'text-line-2'
    }
    return line;
})
// 判断是否显示对应的内容
const is_show = (index: string) => {
    return form.value.is_show.includes(index);
}
// 按钮大小设置
const button_size = computed(() => {
    let button_size = '22px';
    if (form.value.shop_button_size == '0') {
        button_size = '27px';
    } else if (form.value.shop_button_size == '2') {
        button_size = '18px';
    }
    return button_size;
})
// 不同大小下的icon显示
const shop_icon_size = computed(() => {
    let size = '8';
    if (form.value.shop_button_size == '0') {
       size = '15';
    } else if (form.value.shop_button_size == '1') {
        size = '10';
    }
    return size;
})
// 根据传递的参数，从对象中取值
const trends_config = (key: string, type?: string) => {
    return style_config(new_style.value[`shop_${key}_typeface`], new_style.value[`shop_${key}_size`], new_style.value[`shop_${key}_color`], type);
}
// 根据传递的值，显示不同的内容
const style_config = (typeface: string, size: number, color: string | object, type?: string) => {
    let style = `font-weight:${ typeface }; font-size: ${ size }px;`;
    if (type == 'gradient') {
        style += button_gradient();
    } else {
        style += `color: ${ color };`;
    }
    return style;
} 
// 按钮渐变色处理
const button_gradient = () => {
    return gradient_handle(new_style.value.shop_button_color, '90deg');
}
// 公共样式
const style_container = computed(() => {
    if (props.isCommonStyle) {
        return common_styles_computer(new_style.value.common_style);
    } else {
        return '';
    }
});
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    background-color: #fff;
    .image-slot img {
        width: 5rem;
        height: 5rem
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
    background-color: #EDE2C5;
    border-radius: 0;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 0 1rem 0 0;
}
.shopping_button {
    height: v-bind(button_size);
    line-height: v-bind(button_size);
}
.one1 {
    border: 1px solid #EA3323;
    background: #EA3323;
    color: #fff;
}
.one2 {
    border: 1px solid #EA3323;
    color: #EA3323;
}
.one3 {
    border: 1px solid #FFC300;
    color: #FFC300;
}

.two-columns {
    width: calc((100% - v-bind(two_columns)) / 2);
}
.three-columns {
    width: calc((100% - v-bind(three_columns)) / 3);
}
.multicolumn-columns {
    min-width: v-bind(multicolumn_columns);
}
.flex-img0 {
    height: auto;
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
    height: 10.4rem;
}
</style>
