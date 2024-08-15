<template>
    <div :style="style_container">
        <div :class="outer_class" :style="onter_style">
            <div v-for="(item, index) in list" :key="index" class="re" :class="layout_type" :style="layout_style">
                <template v-if="product_style == '6'">
                    <div :class="['flex-row jc-sb ptb-15 mlr-10 gap-20', { 'br-b-e': index != list.length -1 }]">
                        <div v-if="is_show('0')" :class="text_line" :style="trends_config('title')">{{ item?.title || '华为荣耀畅享平板换屏服务 屏幕换外屏主板维修' }}</div>
                        <div v-if="is_show('2')" class="num" :style="`color: ${ new_style.shop_price_color }`"><span class="identifying">￥</span><span :style="trends_config('price')">{{ item?.price || '41' }}</span></div>
                    </div>
                </template>
                <template v-else>
                    <template v-if="!isEmpty(item)">
                        <image-empty v-model="item.new_src[0]" :class="`flex-img${product_style} flex align-c jc-c`" :style="content_img_radius"></image-empty>
                    </template>
                    <template v-else>
                        <image-empty :class="`flex-img${product_style} flex align-c jc-c`" :style="content_img_radius"></image-empty>
                    </template>
                    <div class="flex-col flex-1 jc-sb content" :style="content_style">
                        <div class="flex-col gap-10 top-title">
                            <div v-if="is_show('0')" :class="text_line" :style="trends_config('title')">{{ item?.title || '华为荣耀畅享平板换屏服务 屏幕换外屏主板维修' }}</div>
                            <div v-if="show_content && is_show('1')" class="flex-row gap-5">
                                <div class="one1 radius-sm size-9 pl-3 pr-3">{{ item?.price || '满减活动' }}</div>
                                <div class="one2 radius-sm size-9 pl-3 pr-3">{{ item?.price || '包邮' }}</div>
                                <div class="one3 radius-sm size-9 pl-3 pr-3">{{ item?.price || '领劵' }}</div>
                            </div>
                        </div>
                        <div class="flex-row jc-sb align-e">
                            <div class="flex-col gap-10">
                                <div class="flex-row align-c">
                                    <div v-if="is_show('2')" class="num" :style="`color: ${ new_style.shop_price_color }`"><span class="identifying">￥</span><span :style="trends_config('price')">{{ item?.price || '41' }}</span></div>
                                    <div v-if="show_content && is_show('5')" class="original-price size-10">{{ item?.price || '￥51' }}</div>
                                </div>
                                <div v-if="show_content" class="flex-row align-c size-10">
                                    <div v-if="is_show('3')" :class="['pr-5', {'br-r-e': is_show('3') && is_show('4')}]" :style="trends_config('sold_number')">已售0件</div>
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
                                    <icon class="shopping_button round pl-6 pr-6" name="add" color="f" :size="shop_icon_size" :styles="button_gradient()"></icon>
                                </template>
                                <template v-else>
                                    <icon class="shopping_button round pl-6 pr-6" name="cart" color="f" :size="shop_icon_size" :styles="button_gradient()"></icon>
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
import { isEmpty } from 'lodash';

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
const list = computed(() => {
    if (!isEmpty(form.value.product_list)) {
        return form.value.product_list;
    } else {
        return Array(4);
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
// 左右间距数量
const content_outer_about_spacing = computed(() => new_style.value.content_outer_about_spacing );
// 上下间距
const flex_down_spacing = computed(() => new_style.value.content_outer_down_spacing + 'px');
// 左右间距
const flex_about_spacing = computed(() => content_outer_about_spacing.value + 'px');
// 两列风格
const two_columns = computed(() => (content_outer_about_spacing.value) + 'px' );
// 三列风格
const three_columns = computed(() => (content_outer_about_spacing.value * 2) + 'px');
// 不换行显示
const multicolumn_columns = computed(() => new_style.value.content_outer_width + 'px');

// 最外层不同风格下的显示
const outer_class = computed(() => {
    const flex = ['0', '2', '6'].includes(product_style.value) ? 'flex-col ' : 'flex-row ';
    const wrap = product_style.value == '5' ? '' : 'flex-wrap ';
    const background = ['4', '6'].includes(product_style.value) ? 'bg-f ' : '';
    return flex + wrap + background;
});
const onter_style = computed(() => {
    const radius = product_style.value == '4' ? content_radius.value : '';
    const padding = product_style.value == '4' ? content_padding.value : '';
    const gap = `column-gap: ${ flex_about_spacing.value }; row-gap: ${ flex_down_spacing.value };`;
    return `${ radius }  ${ padding } ${ gap }`;
})

// 不同风格下的样式
const layout_type = computed(() => {
    let class_type = '';
    switch (product_style.value) {
        case '0':
            class_type = `flex-row bg-f`;
            break;
        case '1':
            class_type = `flex-col two-columns bg-f`;
            break;
        case '2':
            class_type = `flex-col bg-f`;
            break;
        case '3':
            class_type = `flex-col three-columns bg-f`;
            break;
        case '4':
            class_type = `flex-row two-columns bg-f`;
            break;
        case '5':
            class_type = `flex-col multicolumn-columns bg-f`;
            break;
        default:
            break;
    }
    return class_type;
})

const layout_style = computed(() => {
    const radius = product_style.value == '4' ? '' : content_radius.value;
    const padding = product_style.value == '0' ? content_padding.value : '';
    return `${ radius }  ${ padding } `;
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
    let button_size = '27px';
    if (form.value.shop_button_size == '0') {
        button_size = '32px';
    } else if (form.value.shop_button_size == '2') {
        button_size = '22px';
    }
    return button_size;
})
// 不同大小下的icon显示
const shop_icon_size = computed(() => {
    let size = '10';
    if (form.value.shop_button_size == '0') {
       size = '20';
    } else if (form.value.shop_button_size == '1') {
        size = '15';
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
.original-price {
    background-image: url('/src/assets/images/components/model-shop-list/price.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 0 1.5rem;
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
    height: 11rem;
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
