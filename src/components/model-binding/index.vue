<template>
    <div class="oh" :style="style_container">
        <div :style="style_img_container">
            <div class="oh flex-col" :style="`gap: ${ new_style.data_content_outer_spacing }px;`">
                <div v-for="(match_item, match_index) in list" :key="match_index">
                    <div :style="match_layout_style">
                        <div class="flex-col" :style="match_layout_img_style">
                            <div :class="['oh w h', host_graph_theme == '0' ? 'flex-row' : 'flex-col' ]" :style="host_graph_theme == '0' ? `margin-bottom: ${ new_style.data_content_bottom_spacing }px;` : ''">
                                <!-- 主图大图模式和主图单列时的显示，并且图片是有值的 -->
                                <template v-if="!isEmpty(match_item) && ((host_graph_theme == '1' && form.is_host_graph_show == '1') || host_graph_theme == '0')">
                                    <div class="oh re" :class="`flex-match-img${host_graph_theme}`">
                                        <template v-if="!isEmpty(match_item.new_cover)">
                                            <image-empty v-model="match_item.new_cover[0]" :class="`flex-match-img${host_graph_theme}`" :style="data_content_img_radius"></image-empty>
                                        </template>
                                        <template v-else>
                                            <image-empty v-model="match_item.images" :class="`flex-match-img${host_graph_theme}`" :style="data_content_img_radius"></image-empty>
                                        </template>
                                    </div>
                                </template>
                                <!-- 主图单列显示时的显示 -->
                                <div v-if="host_graph_theme == '0'" class="flex-1 flex-col jc-sb gap-6" :style="data_content_style">
                                    <div class="flex-col gap-6">
                                        <span class="text-line-1" :style="trends_config('title', 'data')">{{ match_item.title }}</span>
                                        <div class="flex-row align-c jc-sb">
                                            <div class="flex-col gap-6">
                                                <div class="flex-row align-c">
                                                    <span :style="trends_config('price_symbol', 'data')">￥</span>
                                                    <span :style="trends_config('price', 'data')">{{ match_item.estimate_price }}</span>
                                                </div>
                                                <div class="flex-row align-c gap-3">
                                                    <img-or-icon-or-text class="discount-icon" style="background-size: 400%;" :value="props.value" type="data_discounts" />
                                                    <div>
                                                        <span :style="trends_config('save_price_symbol', 'data')">￥</span>
                                                        <span :style="trends_config('save_price', 'data')">{{ match_item.estimate_discount_price || 0 }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-row align-c jc-e">
                                        <img-or-icon-or-text :value="props.value" type="details" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex-col" :style="host_graph_theme !== '0' ? data_content_style : ''">
                                <!-- 主图大图模式时的显示 -->
                                <div v-if="host_graph_theme !== '0'"  class="flex-col gap-6" :style="`margin-bottom: ${ new_style.data_content_bottom_spacing }px;`">
                                    <span class="text-line-1" :style="trends_config('title', 'data')">{{ match_item.title }}</span>
                                    <div class="flex-row align-c jc-sb">
                                        <div class="flex-col gap-6">
                                            <div class="flex-row align-c">
                                                <span :style="trends_config('price_symbol', 'data')">￥</span>
                                                <span :style="trends_config('price', 'data')">{{ match_item.estimate_price }}</span>
                                            </div>
                                            <div class="flex-row align-c gap-3">
                                                <img-or-icon-or-text class="discount-icon" style="background-size: 400%;" :value="props.value" type="data_discounts" />
                                                <div>
                                                    <span :style="trends_config('save_price_symbol', 'data')">￥</span>
                                                    <span :style="trends_config('save_price', 'data')">{{ match_item.estimate_discount_price || 0 }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex-row align-c jc-e">
                                            <img-or-icon-or-text :value="props.value" type="details" />
                                        </div>
                                    </div>
                                </div>
                                <!-- 商品信息区域 -->
                                <div v-if="form.is_default_show_goods == '1'" :style="goods_content_style">
                                    <div :style="goods_content_img_style">
                                        <div :class="outer_class" :style="onter_style">
                                            <template v-if="!['3'].includes(theme)">
                                                <div v-for="(item, index) in match_item.goods" :key="index" class="re oh" :class="layout_type" :style="layout_style">
                                                    <div :class="['oh w h', ['0' , '2'].includes(theme) ? 'flex-row' : 'flex-col' ]" :style="layout_img_style">
                                                        <template v-if="!isEmpty(item) && is_show('goods_img')">
                                                            <div class="oh re" :class="`flex-img${theme}`">
                                                                <image-empty v-model="item.images" :class="`flex-img${theme}`" :style="goods_content_img_radius"></image-empty>
                                                            </div>
                                                        </template>
                                                        <div v-if="is_show('title') || is_show('price') || is_show('save_price')" class="flex-1 flex-row jc-sb" :style="content_style">
                                                            <div class="flex-1 flex-col jc-sb">
                                                                <div v-if="is_show('title')" :class="theme == '0' ? 'text-line-2' : 'text-line-1'" :style="trends_config('title', 'goods')">
                                                                    {{ item.title }}
                                                                </div>
                                                                <div v-if="is_show('price')" class="flex-row align-c text-line-1">
                                                                    <span :style="trends_config('price_symbol', 'goods')">{{ item.show_price_symbol }}</span>
                                                                    <span :style="trends_config('price', 'goods')">{{ item.price }}</span>
                                                                </div>
                                                                <div v-if="is_show('save_price')" class="flex-row align-c gap-3">
                                                                    <img-or-icon-or-text :value="props.value" type="goods_discounts" />
                                                                    <div class="flex-1 text-line-1">
                                                                        <span :style="trends_config('save_price_symbol', 'goods')">{{ item.show_price_symbol }}</span>
                                                                        <span :style="trends_config('save_price', 'goods')">{{ item.discount_price || 0 }}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <swiper :key="carouselKey" class="w flex" direction="horizontal" :loop="true" :autoplay="autoplay" :slides-per-view="form.carousel_col" :slides-per-group="slides_per_group" :allow-touch-move="false" :space-between="goods_content_outer_spacing" :pause-on-mouse-enter="true" :modules="modules">
                                                    <swiper-slide v-for="(item, index) in match_item.goods" :key="index">
                                                        <div :class="layout_type" :style="layout_style">
                                                            <div :class="['oh w h', ['0', '2'].includes(theme) ? 'flex-row' : 'flex-col' ]" :style="layout_img_style">
                                                                <template v-if="!isEmpty(item) && is_show('goods_img')">
                                                                    <div class="oh re" :class="`flex-img${theme}`">
                                                                        <image-empty v-model="item.images" :class="`flex-img${theme}`" :style="goods_content_img_radius"></image-empty>
                                                                    </div>
                                                                </template>
                                                                <div v-if="is_show('title') || is_show('price') || is_show('save_price')" class="flex-1 flex-row jc-sb" :style="content_style">
                                                                    <div class="flex-1 flex-col jc-sb">
                                                                        <div v-if="is_show('title')" :class="theme == '0' ? 'text-line-2' : 'text-line-1'" :style="trends_config('title', 'goods')">
                                                                            {{ item.title }}
                                                                        </div>
                                                                        <div v-if="is_show('price')" class="flex-row align-c text-line-1">
                                                                            <span :style="trends_config('price_symbol', 'goods')">{{ item.show_price_symbol }}</span>
                                                                            <span :style="trends_config('price', 'goods')">{{ item.price }}</span>
                                                                        </div>
                                                                        <div v-if="is_show('save_price')" class="flex-row align-c gap-3">
                                                                            <img-or-icon-or-text :value="props.value" type="goods_discounts" />
                                                                            <div class="flex-1 text-line-1">
                                                                                <span :style="trends_config('save_price_symbol', 'goods')">{{ item.show_price_symbol }}</span>
                                                                                <span :style="trends_config('save_price', 'goods')">{{ item.discount_price || 0 }}</span>
                                                                            </div>
                                                                        </div>
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
                                 <!-- 底部展开收起按钮区域 -->
                                <div :style="bottom_button_style">
                                    <div class="flex-row align-c jc-sb" :style="bottom_button_img_style">
                                        <span :style="trends_config('button', 'bottom')">{{ form.is_default_show_goods == '1' ? '收起' : '展开'}}{{ match_item.type_name }}商品</span>
                                        <icon :name="form.is_default_show_goods == '1' ? 'arrow-top' : 'arrow-bottom'" :color="new_style.bottom_button_icon_color" :size="new_style.bottom_button_icon_size + ''"></icon>
                                    </div>
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
import { common_styles_computer, common_img_computer, get_math, gradient_handle, margin_computer, border_computer, box_shadow_computer, radius_computer, background_computer, padding_computer } from '@/utils';
import { old_margin } from "@/utils/common";
import { isEmpty, cloneDeep } from 'lodash';
import BindingAPI from '@/api/binding';
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
//#region 列表数据
type goods_list = {
    title: string,
    discount_price: string,
    show_original_price_symbol: string,
    price: string,
    show_price_symbol: string,
    images: string,
}
type data_list = {
    title: string,
    estimate_price: string,
    estimate_discount_price: string,
    images: string,
    type_name: string;
    new_cover: string[],
    goods: goods_list[]
}
const default_list = {
    title: '测试组合搭配标题',
    estimate_price: '8970.00-9200.00',
    estimate_discount_price: '8970.00-9200.00',
    type_name: '组合',
    images: '',
    new_cover: [],
    goods: [
        {
            title: '测试商品标题',
            discount_price: '41.2',
            show_original_price_symbol: '￥',
            price: '51',
            show_price_symbol: '￥',
            images: '',
        },
        {
            title: '测试商品标题',
            discount_price: '41.2',
            show_original_price_symbol: '￥',
            price: '51',
            show_price_symbol: '￥',
            images: '',
        },
        {
            title: '测试商品标题',
            discount_price: '41.2',
            show_original_price_symbol: '￥',
            price: '51',
            show_price_symbol: '￥',
            images: '',
        }
    ]
};
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

const get_binding = () => {
    const { keywords, category_ids, number, order_by_type, order_by_rule, is_home_show } = form.value;
    const params = {
        binding_keywords: keywords,
        binding_type: category_ids,
        binding_order_by_type: order_by_type,
        binding_order_by_rule: order_by_rule,
        binding_number: number,
        binding_is_home_show: is_home_show,
    };
    //获取商品列表
    BindingAPI.getAutoList(params).then((res: any) => {
        if (!isEmpty(res.data)) {
            list.value = res.data;
        } else {
            list.value = Array(4).fill(default_list);
        }
    })
};
// 取出监听的数据
const watch_data = computed(() => {
    const { keywords, category_ids, number, order_by_type, order_by_rule, is_home_show, data_type, data_list } = form.value;
    return { keywords, category_ids, number, order_by_type, order_by_rule, is_home_show, data_type, data_list };
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
            get_binding();
        }
    }
}, { deep: true });
//#endregion
//#region 数据样式
// 选择的风格
const host_graph_theme = computed(() => form.value.host_graph_theme);
const data_content_img_radius = computed(() => radius_computer(new_style.value.data_img_radius));
// 内边距设置
const data_content_padding = computed(() => padding_computer(new_style.value.data_padding));
// 容器样式
const match_layout_style = computed(() => { 
    return layout_handle('data') + radius_computer(new_style.value.data_radius);
});
// 容器图片样式
const match_layout_img_style = computed(() => {
    const padding = host_graph_theme.value == '0' ? data_content_padding.value : '';
    return padding + layout_img_handle('data');
});
// 内容区域的样式
const data_content_style = computed(() => {
    const spacing_value = new_style.value.data_content_spacing;
    let spacing = '';
    if (['0'].includes(host_graph_theme.value)) {
        spacing = `margin-left: ${spacing_value}px;`;
    } else {
        spacing = data_content_padding.value;
    }
    return `${spacing}`;
});
const data_style_list = [
    { name: '单列展示', value: '0', width: 128, height: 128 },
    { name: '大图展示', value: '1', width: 0, height: 221 },
]
// 宽度和高度为空的时候，修改默认值
const data_img_width = computed(() => {
    return size_handle('data', 'width');
});
// 宽度和高度为空的时候，修改默认值
const data_img_height = computed(() => {
    return size_handle('data', 'height');
});
// 商品内容样式
const goods_content_style = computed(() => common_styles_computer(new_style.value.goods_content_style));
const goods_content_img_style = computed(() => common_img_computer(new_style.value.goods_content_style));
// 底部展开收起按钮样式
const bottom_button_style = computed(() => common_styles_computer(new_style.value.bottom_button_style));
const bottom_button_img_style = computed(() => common_img_computer(new_style.value.bottom_button_style));
//#endregion
//#region 商品样式
// 选择的风格
const theme = computed(() => form.value.theme);
// 最外层不同风格下的显示
const outer_class = computed(() => {
    const flex = ['0'].includes(theme.value) ? 'flex-col ' : 'flex-row ';
    const wrap = theme.value == '3' ? '' : 'flex-wrap ';
    return flex + wrap + 'oh';
});
const onter_style = computed(() => {
    const radius = `gap: ${ new_style.value.goods_content_outer_spacing + 'px'};`;
    return `${radius}`;
});
// 门店间距
const goods_content_outer_spacing = computed(() => new_style.value.goods_content_outer_spacing);
// 圆角设置
const goods_content_radius = computed(() => radius_computer(new_style.value.goods_radius));
// 图片圆角设置
const goods_content_img_radius = computed(() => radius_computer(new_style.value.goods_img_radius));
// 内边距设置
const goods_content_padding = computed(() => padding_computer(new_style.value.goods_padding));
const goods_left_right_width_margin = computed(() => {
    const { goods_margin = old_margin } = new_style.value;
    return goods_margin.margin_left + goods_margin.margin_right;
});
// 两列风格
const two_columns = computed(() => goods_content_outer_spacing.value + goods_left_right_width_margin.value * 2 + 'px' );
// 根据传递的参数，从对象中取值
const trends_config = (key: string, type: string) => {
    return style_config(new_style.value[`${ type }_${key}_typeface`], new_style.value[`${ type }_${key}_size`], new_style.value[`${ type }_${key}_color`]);
};
// 根据传递的值，显示不同的内容
const style_config = (typeface: string, size: number, color: string | object) => {
    return `font-weight:${typeface}; font-size: ${size}px;color: ${color};`;
};
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
            class_type = `two-columns oh`;
            break;
        case '3':
            class_type = `multicolumn-columns oh`;
            break;
        default:
            break;
    }
    return class_type;
});
// 判断是否显示对应的内容
const is_show = (index: string) => {
    return form.value.is_goods_show.includes(index);
};
// 容器样式
const layout_style = computed(() => {
    const radius = theme.value == '6' ? '' : goods_content_radius.value;
    const width = theme.value == '0' ? `width: calc(100% - ${ goods_left_right_width_margin.value }px);` : '';
    const gradient = layout_handle('goods');
    return `${radius} ${ gradient } ${ width }`;
});
// 容器图片样式
const layout_img_style = computed(() => {
    const padding = [ '0', '2'].includes(theme.value) ? goods_content_padding.value : '';
    return padding + layout_img_handle('goods');
});
const layout_handle = (type: string) => {
    return gradient_handle(new_style.value[`${ type }_color_list`], new_style.value[`${ type }_direction`]) + margin_computer(new_style.value[`${ type }_margin`]) + border_computer(new_style.value[`${ type }_border_box`]) + box_shadow_computer(new_style.value[`${ type }_border_box`]);
};
const layout_img_handle = (type: string) => {
    const data = {
        background_img_style: new_style.value[`${ type }_background_img_style`],
        background_img: new_style.value[`${ type }_background_img`],
    }
    return background_computer(data);
};
// 内容区域的样式
const content_style = computed(() => {
    const spacing_value = new_style.value.goods_content_spacing;
    let spacing = '';
    if (['0', '2'].includes(theme.value)) {
        spacing = `margin-left: ${spacing_value}px;`;
    } else {
        spacing = goods_content_padding.value;
    }
    return `${spacing}`;
});
const goods_style_list = [
    { name: '单列展示', value: '0', width: 50, height: 50 },
    { name: '两列展示（纵向）', value: '1', width:156, height: 156 },
    { name: '两列展示（横向）', value: '2', width:50, height: 50 },
    { name: '左右滑动展示', value: '3', width:0, height: 0 },
]
// 宽度和高度为空的时候，修改默认值
const goods_img_width = computed(() => {
    return size_handle('goods', 'width');
});
// 宽度和高度为空的时候，修改默认值
const goods_img_height = computed(() => {
    return size_handle('goods', 'height');
});
const size_handle = (type: string, location: 'width' | 'height') => {
    if (typeof new_style.value[`${ type }_content_img_${ location }`] == 'number') {
        return new_style.value[`${ type }_content_img_${ location }`] + 'px';
    } else {
        const list = type == 'goods' ? goods_style_list.filter(item => item.value == theme.value) : data_style_list.filter(item => item.value == host_graph_theme.value);
        if (list.length > 0) {
            return list[0][location] + 'px';
        } else {
            return 'auto';
        }
    }
}
const content_outer_height = computed(() => new_style.value.goods_content_outer_height + 'px');
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
//#endregion 
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
.flex-match-img0 {
    height: v-bind(data_img_height);
    width: v-bind(data_img_width);
}
.flex-match-img1 {
    height: v-bind(data_img_height);
    width: 100%;
}
.two-columns {
    width: calc((100% - v-bind(two_columns)) / 2);
}
.multicolumn-columns {
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
    width: v-bind(goods_img_width);
    height: v-bind(goods_img_height);
}
.flex-img3 {
    width: 100%;
    height: 100%;
}
.discount-icon {
    animation: gradient 5s ease infinite;
}
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
