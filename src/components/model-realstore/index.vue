<template>
    <div class="oh" :style="style_container">
        <div :style="style_img_container">
            <div :class="outer_class" :style="onter_style">
                <template v-if="!['3'].includes(theme)">
                    <div v-for="(item, index) in list" :key="index" class="re oh" :class="layout_type" :style="layout_style">
                        <div class="flex-col" :style="layout_img_style">
                            <div :class="['oh w h', ['0'].includes(theme) ? 'flex-row' : 'flex-col' ]">
                                <template v-if="!isEmpty(item)">
                                    <div class="oh re" :class="`flex-img${theme}`">
                                        <template v-if="!isEmpty(item.new_cover)">
                                            <image-empty v-model="item.new_cover[0]" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                        </template>
                                        <template v-else>
                                            <image-empty v-model="item.logo" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                        </template>
                                    </div>
                                </template>
                                <div class="flex-1 flex-col" :style="content_style">
                                    <div class="flex-col jc-sb gap-10">
                                        <div class="flex-row jc-sb align-c gap-10">
                                            <div class="text-line-2" :style="trends_config('title')">{{ item.name }}</div>
                                            <div v-if="['0', '2'].includes(theme)" class="flex-row align-c" :style="`gap: ${ new_style.phone_navigation_spacing }px;`">
                                                <img-or-icon-or-text :value="props.value" type="phone" />
                                                <img-or-icon-or-text :value="props.value" type="navigation" />
                                            </div>
                                        </div>
                                        <div class="flex-row gap-2 align-c">
                                            <img-or-icon-or-text :value="props.value" type="time" />
                                            <div class="flex-1 flex-row align-c">
                                                <span class="text-line-1" :style="trends_config('state') + `color: ${ item.status_info.status == 1 ? new_style.realstore_state_color : new_style.realstore_default_state_color }`">{{ item.status_info.msg }}</span>
                                                <span v-if="!isEmpty(item.status_info.msg) || !isEmpty(item.status_info.time)" :style="'color: #ccc;' + margin_computer(new_style.realstore_business_distance)">|</span>
                                                <span class="text-line-1" :style="trends_config('business_hours')">{{ item.status_info.time }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <template v-if="theme !== '0' && form.is_location_show == '1'">
                                        <div :style="border_style"></div>
                                        <div class="flex-row jc-sb align-c gap-10">
                                            <div class="flex-row align-c jc-sb">
                                                <div class="flex-1 flex-row align-b gap-2">
                                                    <img-or-icon-or-text :value="props.value" type="location" />
                                                    <span class="text-line-2 flex-1" :style="trends_config('location')">{{ item.province_name }}{{ item.city_name }}{{ item.county_name }}{{ item.address }}</span>
                                                </div>
                                                <span v-if="!isEmpty(item.distance) && theme != '1'" :style="trends_config('location')">距您{{ item.distance }}</span>
                                            </div>
                                            <template v-if="!['0', '2'].includes(theme)">
                                                <img-or-icon-or-text :value="props.value" type="navigation" />
                                            </template>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <template v-if="theme == '0' && form.is_location_show == '1'">
                                <div :style="border_style"></div>
                                <div class="flex-row align-c jc-sb">
                                    <div class="flex-1 flex-row align-b gap-2">
                                        <img-or-icon-or-text :value="props.value" type="location" />
                                        <span class="text-line-2 flex-1" :style="trends_config('location')">{{ item.province_name }}{{ item.city_name }}{{ item.county_name }}{{ item.address }}</span>
                                    </div>
                                    <span v-if="!isEmpty(item.distance)" :style="trends_config('location')">距您{{ item.distance }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <swiper :key="carouselKey" class="w flex" direction="horizontal" :loop="true" :autoplay="autoplay" :slides-per-view="form.carousel_col" :slides-per-group="slides_per_group" :allow-touch-move="false" :space-between="content_outer_spacing" :pause-on-mouse-enter="true" :modules="modules">
                        <swiper-slide v-for="(item, index) in list" :key="index">
                            <div :class="layout_type" :style="layout_style">
                                <div :class="['oh w h', ['0', '4'].includes(theme) ? 'flex-row' : 'flex-col' ]" :style="layout_img_style">
                                    <template v-if="!isEmpty(item)">
                                        <div class="oh re" :class="`flex-img${theme}`">
                                            <template v-if="!isEmpty(item.new_cover)">
                                                <image-empty v-model="item.new_cover[0]" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                            </template>
                                            <template v-else>
                                                <image-empty v-model="item.logo" :class="`flex-img${theme}`" :style="content_img_radius"></image-empty>
                                            </template>
                                        </div>
                                    </template>
                                    <div class="flex-1 flex-col jc-sb gap-10" :style="content_style">
                                        <div class="text-line-2" :style="trends_config('title')">{{ item.name }}</div>
                                        <div class="flex-row jc-sb align-c">
                                            <div class="flex-1 flex-row gap-2 align-c">
                                                <img-or-icon-or-text :value="props.value" type="time" />
                                                <span class="text-line-1" :style="trends_config('state') + `color: ${ item.status_info.status == 1 ? new_style.realstore_state_color : new_style.realstore_default_state_color }`">{{ item.status_info.msg }}</span>
                                            </div>
                                            <img-or-icon-or-text :value="props.value" type="navigation" />
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
import { common_styles_computer, common_img_computer, get_math, gradient_handle, margin_computer, border_computer, box_shadow_computer, radius_computer, background_computer, padding_computer } from '@/utils';
import { old_margin } from "@/utils/common";
import { isEmpty, cloneDeep } from 'lodash';
import RealstoreAPI from '@/api/realstore';
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
// 选择的风格
const theme = computed(() => form.value.theme);
// 最外层不同风格下的显示
const outer_class = computed(() => {
    const flex = ['0', '2' ].includes(theme.value) ? 'flex-col ' : 'flex-row ';
    const wrap = theme.value == '3' ? '' : 'flex-wrap ';
    return flex + wrap + 'oh';
});
const onter_style = computed(() => {
    const radius = `gap: ${new_style.value.content_outer_spacing + 'px'};`;
    return `${radius}`;
});

// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
const border_style = computed(() => {
    const { content_border_margin, content_border_size, content_border_is_show, content_border_color, content_border_style } = new_style.value;
    let border = ``;
    if (content_border_is_show == '1') {
        border += `${ margin_computer(content_border_margin) };border-width: ${content_border_size.padding_top}px ${content_border_size.padding_right}px ${content_border_size.padding_bottom}px ${content_border_size.padding_left}px;border-style: ${ content_border_style };border-color: ${content_border_color};`
    }
    return border;
});
//#region 列表数据
type info = {
    msg: string;
    time: string;
    status: number;
    type: number;
}
type data_list = {
    name: string;
    logo: string;
    new_cover: string[];
    msg: string;
    province_name: string;
    city_name: string;
    county_name: string;
    address: string;
    distance: string,
    time: string;
    status_info: info;
}
const default_list = {
    name: '测试门店标题',
    province_name: '测试地址',
    city_name: '',
    county_name: '',
    address: '',
    logo: '',
    new_cover: [],
    distance: '12km',
    status_info: {
        msg: '营业中',
        time: '7:00-22:00',
        status: 1,
        type: 0,
    },
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

const get_products = () => {
    const { category_ids, is_goods_list, number, order_by_type, order_by_rule, keywords } = form.value;
    const params = {
        realstore_keywords: keywords,
        realstore_category_ids: category_ids,
        realstore_order_by_type: order_by_type,
        realstore_order_by_rule: order_by_rule,
        realstore_number: number,
        realstore_is_goods_list: is_goods_list,
    };
    // 获取商户列表
    RealstoreAPI.getAutoList(params).then((res: any) => {
        if (!isEmpty(res.data)) {
            list.value = res.data;
        } else {
            list.value = Array(4).fill(default_list);
        }
    }).catch(() => {
        list.value = Array(4).fill(default_list);
    });
};
// 取出监听的数据
const watch_data = computed(() => {
    const { category_ids, number, order_by_type, order_by_rule, data_type, data_list, keywords, is_goods_list } = form.value;
    return { category_ids, number, order_by_type, order_by_rule, data_type, data_list, keywords, is_goods_list };
})
// 初始化的时候不执行, 监听数据变化
watch(() => watch_data.value, (val, oldVal) => {
    // 使用JSON.stringify()进行判断 新值和旧值是否一样 不一样就重新获取数据
    if ((JSON.stringify(val) !== JSON.stringify(oldVal)) || props.isCommonStyle) {
        if (val.data_type == '0') {
            if (!isEmpty(val.data_list)) {
                list.value = cloneDeep(val.data_list).map((item: any) => ({
                    ...item.data,
                    name: !isEmpty(item.new_title) ? item.new_title : item.data.name,
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
// 门店间距
const content_outer_spacing = computed(() => new_style.value.content_outer_spacing);
// 圆角设置
const content_radius = computed(() => radius_computer(new_style.value.realstore_radius));
// 图片圆角设置
const content_img_radius = computed(() => radius_computer(new_style.value.realstore_img_radius));
// 内边距设置
const content_padding = computed(() => padding_computer(new_style.value.realstore_padding));
const realstore_left_right_width_margin = computed(() => {
    const { realstore_margin = old_margin } = new_style.value;
    return realstore_margin.margin_left + realstore_margin.margin_right;
});
// 两列风格
const two_columns = computed(() => content_outer_spacing.value + realstore_left_right_width_margin.value * 2 + 'px' );
// 根据传递的参数，从对象中取值
const trends_config = (key: string, type?: string) => {
    return style_config(new_style.value[`realstore_${key}_typeface`], new_style.value[`realstore_${key}_size`], new_style.value[`realstore_${key}_color`], type);
};
// 根据传递的值，显示不同的内容
const style_config = (typeface: string, size: number, color: string | object, type?: string) => {
    let style = `font-weight:${typeface}; font-size: ${size}px;`;
    if (type == 'title') {
        style += `line-height: ${size > 0 ? size + 3 : 0}px;height: ${size > 0 ? (size + 3) * 2 : 0}px;color: ${color};`;
    } else {
        style += `color: ${color};`;
    }
    return style;
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
            class_type = `oh`;
            break;
        case '3':
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
    const width = theme.value == '0' ? `width: calc(100% - ${ realstore_left_right_width_margin.value }px);` : '';
    const gradient = gradient_handle(new_style.value.realstore_color_list, new_style.value.realstore_direction) + margin_computer(new_style.value.realstore_margin) + border_computer(new_style.value) + box_shadow_computer(new_style.value);
    return `${radius} ${ gradient } ${ width }`;
});
// 容器图片样式
const layout_img_style = computed(() => {
    const padding = theme.value == '0' ? content_padding.value : '';
    const data = {
        background_img_style: new_style.value.realstore_background_img_style,
        background_img: new_style.value.realstore_background_img,
    }
    return padding + background_computer(data);
});
// 内容区域的样式
const content_style = computed(() => {
    const spacing_value = new_style.value.content_spacing;
    let spacing = '';
    if (['0'].includes(theme.value)) {
        spacing = `margin-left: ${spacing_value}px;`;
    } else {
        spacing = content_padding.value;
    }
    return `${spacing}`;
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
const realstore_style_list = [
    { name: '单列展示', value: '0', width: 50, height: 50 },
    { name: '两列展示（纵向）', value: '1', width:180, height: 180 },
    { name: '大图展示', value: '2', width:0, height: 180 },
    { name: '左右滑动展示', value: '3', width:0, height: 0 },
]
// 宽度和高度为空的时候，修改默认值
const realstore_img_width = computed(() => {
    if (typeof new_style.value.content_img_width == 'number') {
        return new_style.value.content_img_width + 'px';
    } else {
        const list = realstore_style_list.filter(item => item.value == theme.value);
        if (list.length > 0) {
            return list[0].width + 'px';
        } else {
            return 'auto';
        }
    }
});
// 宽度和高度为空的时候，修改默认值
const realstore_img_height = computed(() => {
    if (typeof new_style.value.content_img_height == 'number') {
        return new_style.value.content_img_height + 'px';
    } else {
        const list = realstore_style_list.filter(item => item.value == theme.value);
        if (list.length > 0) {
            return list[0].height + 'px';
        } else {
            return 'auto';
        }
    }
});
const content_outer_height = computed(() => new_style.value.content_outer_height + 'px');
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    background-color: #fff;
    .image-slot img {
        width: 5rem;
        height: 5rem;
    }
}
.title-img {
    object-fit: contain;
}
.two-columns {
    width: calc((100% - v-bind(two_columns)) / 2);
}
.multicolumn-columns {
    height: v-bind(content_outer_height);
}
.flex-img0 {
    height: v-bind(realstore_img_height);
    width: v-bind(realstore_img_width);
}
.flex-img1 {
    width: 100%;
    height: v-bind(realstore_img_height);
}
.flex-img2 {
    width: 100%;
    height: v-bind(realstore_img_height);
}
.flex-img3 {
    width: 100%;
    height: 100%;
}
</style>
