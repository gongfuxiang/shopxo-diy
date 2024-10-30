<template>
    <div ref="container" :style="style_container">
        <div class="img-magic" :style="style_img_container">
            <div class="w h re outer-style">
                <!-- 风格9 -->
                <template v-if="form.style_actived == 7">
                    <div class="flex-row align-c jc-c style-size flex-wrap">
                        <div v-for="(item, index) in data_magic_list" :key="index" :style="`${ item.data_style.background_style } ${ content_radius }`" :class="['img-spacing-border', { 'style9-top': [0, 1].includes(index), 'style9-bottom': ![0, 1].includes(index) }]">
                            <div class="w h" :style="`${ item.data_style.background_img_style }`">
                                <template v-if="item.data_content.data_type == 'goods'">
                                    <div :class="`w h flex-col ${ 'gap-' + item.title_text_gap }`" :style="`${ [0, 1].includes(index) ? padding_computer(item.data_style.chunk_padding) : '' }`">
                                        <div v-if="(!isEmpty(item.data_content.heading_title) || !isEmpty(item.data_content.subtitle)) && [0, 1].includes(index)" :class="'tl' + (item.data_style.title_line == '1' ? ' flex-row align-c gap-10' : ' flex-col gap-5')">
                                            <template v-if="item.data_content.heading_title_type == 'text'">
                                                <p class="ma-0 w text-word-break text-line-1 flex-basis-shrink" :style="trends_config(item.data_style, 'heading')">{{ item.data_content.heading_title || '' }}</p>
                                            </template>
                                            <template v-else-if="item.data_content.heading_title_img.length > 0">
                                                <div class="re" :style="`height: ${ item.data_style?.heading_img_height || 0 }px`">
                                                    <img :style="`height: ${ item.data_style?.heading_img_height || 0 }px`" :src="item.data_content.heading_title_img[0].url" fit="contain" />
                                                </div>
                                            </template>
                                            <p class="ma-0 w text-word-break text-line-1 flex-basis-shrink" :style="trends_config(item.data_style, 'subtitle')">{{ item.data_content.subtitle || '' }}</p>
                                        </div>
                                        <div class="w h">
                                            <magic-carousel :value="item" :good-style="item.data_style" :actived="form.style_actived" type="product" @carousel_change="carousel_change($event, index)"></magic-carousel>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <magic-carousel :value="item" type="img" :actived="form.style_actived" @carousel_change="carousel_change($event, index)"></magic-carousel>
                                </template>
                                <div v-if="item.data_style.is_show == '1' && item.data_content.list.length > 1" :class="{'dot-center': item.data_style?.indicator_location == 'center', 'dot-right': item.data_style?.indicator_location == 'flex-end' }" class="dot flex abs" :style="`bottom: ${item.data_style?.indicator_bottom}px;`">
                                    <template v-if="item.data_style.indicator_style == 'num'">
                                        <div :style="item.data_style.indicator_styles" class="dot-item">
                                            <span class="num-active" :style="`color: ${ item.data_style.actived_color }`">{{ item.actived_index + 1 }}</span><span>/{{ item.data_content.list.length }}</span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div v-for="(item3, index3) in item.data_content.list" :key="index3" :style="`${ item.data_style.indicator_styles }; ${ style_actived_color(item, index3)}`" class="dot-item" />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div v-for="(item, index) in data_magic_list" :key="index" class="cube-selected img-spacing-border" :style="`${ selected_style(item) } ${ item.data_style.background_style } ${ content_radius }`">
                        <div class="w h" :style="`${ item.data_style.background_img_style }`">
                            <template v-if="item.data_content.data_type == 'goods'">
                                <div :class="`w h flex-col ${ 'gap-' + item.title_text_gap }`" :style="`${ padding_computer(item.data_style.chunk_padding) }`">
                                    <div v-if="!isEmpty(item.data_content.heading_title) || !isEmpty(item.data_content.subtitle)" :class="'gap-5 tl' + (item.data_style.title_line == '1' ? ' flex-row align-c gap-10' : ' flex-col gap-5')">
                                        <template v-if="item.data_content.heading_title_type == 'text'">
                                            <p class="ma-0 w text-word-break text-line-1 flex-basis-shrink" :style="trends_config(item.data_style, 'heading')">{{ item.data_content.heading_title || '' }}</p>
                                        </template>
                                        <template v-else-if="item.data_content.heading_title_img.length > 0">
                                            <div class="re" :style="`height: ${ item.data_style?.heading_img_height || 0 }px`">
                                                <img :style="`height: ${ item.data_style?.heading_img_height || 0 }px`" :src="item.data_content.heading_title_img[0].url" fit="contain" />
                                            </div>
                                        </template>
                                        <p class="ma-0 w text-word-break text-line-1 flex-basis-shrink" :style="trends_config(item.data_style, 'subtitle')">{{ item.data_content.subtitle || '' }}</p>
                                    </div>
                                    <div class="w h">
                                        <magic-carousel :value="item" :good-style="item.data_style" type="product" :actived="form.style_actived" @carousel_change="carousel_change($event, index)"></magic-carousel>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <magic-carousel :value="item" type="img" :actived="form.style_actived" @carousel_change="carousel_change($event, index)"></magic-carousel>
                            </template>
                            <div v-if="item.data_style.is_show == '1' && item.data_content.list.length > 1" :class="{'dot-center': item.data_style?.indicator_location == 'center', 'dot-right': item.data_style?.indicator_location == 'flex-end' }" class="dot flex abs" :style="`bottom: ${item.data_style?.indicator_bottom}px;`">
                                <template v-if="item.data_style.indicator_style == 'num'">
                                    <div :style="item.data_style.indicator_styles" class="dot-item">
                                        <span class="num-active" :style="`color: ${ item.data_style.actived_color }`">{{ item.actived_index + 1 }}</span><span>/{{ item.data_content.list.length }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div v-for="(item3, index3) in item.data_content.list" :key="index3" :style="`${ item.data_style.indicator_styles }; ${ style_actived_color(item, index3)}`" class="dot-item" />
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
import { background_computer, common_styles_computer, get_math, gradient_computer, radius_computer, padding_computer, common_img_computer, is_number } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
// 用于页面判断显示
const state = reactive({
    form: props.value.content,
    new_style: props.value.style,
});
// 如果需要解构，确保使用toRefs
const { form, new_style } = toRefs(state);
const outer_spacing = computed(() => (new_style.value?.image_spacing || 0) + 'px');
const outer_sx = computed(() => -((new_style.value?.image_spacing || 0) / 2) + 'px');
// 图片间距设置
const spacing = computed(() => (new_style.value?.image_spacing || 0) / 2 + 'px');
// 内容圆角设置
const content_radius = computed(() => radius_computer(new_style.value.data_radius));
//#region 容器大小计算
const div_width = ref(0);
// 如果容器高度为空，则取容器宽度
const container_height = computed(() => is_number(form.value.container_height) ? form.value.container_height : div_width.value);

const container_size = computed(() => container_height.value + 'px');
const container = ref<HTMLElement | null>(null);
onMounted(() => {
    if (container.value) {
        div_width.value = container.value.clientWidth;
    }
});
//#endregion
//#region 图片位置计算
//计算选中层的宽度。
interface data_magic {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
    num: number;
    flex: string;
    title_text_gap: number;
    outerflex: string;
    heading_title?: string;
    subtitle?: string;
    actived_index: number;
    data_content: any;
    data_style: any;
}
// 屏幕分块
const density = ref('4');
//单元魔方宽度。
const cubeCellWidth = computed(() => div_width.value / parseInt(density.value));
//单元魔方高度。
const cubeCellHeight = computed(() => container_height.value / parseInt(density.value));
const getSelectedWidth = (item: data_magic) => {
    return (item.end.x - item.start.x + 1) * cubeCellWidth.value;
};
//计算选中层的高度。
const getSelectedHeight = (item: data_magic) => {
    return (item.end.y - item.start.y + 1) * cubeCellHeight.value;
};
//计算选中层的右边距离。
const getSelectedTop = (item: data_magic) => {
    return (item.start.y - 1) * cubeCellHeight.value;
};
//计算选中层的左边距离。
const getSelectedLeft = (item: data_magic) => {
    return (item.start.x - 1) * cubeCellWidth.value;
};
// 根据当前页面大小计算成百分比
const selected_style = (item: data_magic) => {
    return `overflow: hidden;width: calc(${getSelectedWidth(item)}px - ${ outer_spacing.value } ); height: calc(${getSelectedHeight(item)}px - ${ outer_spacing.value } ); top: ${getSelectedTop(item)}px;left: ${getSelectedLeft(item)}px;`;
};
//#endregion
//#region 组装页面显示的数据
// 指示器的样式
const indicator_style = (item: any) => {
    let styles = '';
    if (!isEmpty(item.indicator_radius)) {
        styles += radius_computer(item.indicator_radius)
    }
    const size = item?.indicator_size || 5;
    if (item.indicator_style == 'num') {
        styles += `color: ${item?.color || '#DDDDDD'};`;
        styles += `font-size: ${size}px;`;
    } else if (item.indicator_style == 'elliptic') {
        styles += `background: ${item?.color || '#DDDDDD'};`;
        styles += `width: ${size * 3}px; height: ${size}px;`;
    } else {
        styles += `background: ${item?.color || '#DDDDDD'};`;
        styles += `width: ${size}px; height: ${size}px;`;
    }
    return styles;
};
const style_actived_color = (item: any, index: number) => {
   return item.actived_index == index ? `background: ${ item.data_style.actived_color };` : ''
}
// 根据传递的参数，从对象中取值
const goods_trends_config = (style: any, key: string) => {
    return text_style(style[`goods_${key}_typeface`], style[`goods_${key}_size`], style[`goods_${key}_color`]);
}
const trends_config = (style: any, key: string) => {
    return text_style(style[`${key}_typeface`], style[`${key}_size`], style[`${key}_color`]);
}
const text_style = (typeface: string, size: number, color: string) => {
    return `font-weight:${ typeface }; font-size: ${ size }px; color: ${ color };`;
} 
// 设置默认值
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
/*
** 组装产品的数据
** @param {Array} list 商品列表
** @param {Number} num 显示数量
** @return {Array}
*/
const commodity_list = (list: any[], num: number) => {
    if (list.length > 0) {
        // 深拷贝一下，确保不会出现问题
        const goods_list = cloneDeep(list).map((item: any) => ({
            ...item.data,
            title: !isEmpty(item.new_title) ? item.new_title : item.data.title,
            new_cover: item.new_cover,
        }));
        // 存储数据显示
        let nav_list = [];
        // 拆分的数量
        const split_num = Math.ceil(goods_list.length / num);
        for (let i = 0; i < split_num; i++) {
            nav_list.push({ split_list: goods_list.slice(i * num, (i + 1) * num) });
        }
        return nav_list;
    } else {
        return [{ split_list: Array(num).fill(default_list)}];
    }
}

const old_list = ref<any>({});
const data_magic_list = ref<data_magic[]>([]);
watch(props.value.content, (val) => {
    const data = cloneDeep(val.data_magic_list);
    data.forEach((item: data_magic) => {
        const data_content = item.data_content;
        const data_style = item.data_style;
        const key = data_style.carouselKey;
        // 指示器设置为0
        item.actived_index = 0;
        // 指示器样式
        data_style.indicator_styles = indicator_style(data_style);
        data_style.background_style = gradient_computer(data_style);
        data_style.background_img_style = background_computer(data_style);
        const radius = !isEmpty(data_style.img_radius) ? data_style.img_radius : { radius: 4, radius_top_left: 4, radius_top_right: 4, radius_bottom_left: 4, radius_bottom_right: 4 };
        data_style.get_img_radius = radius_computer(radius);
        
        // 商品名称和价格样式
        data_style.goods_title_style = goods_trends_config(item.data_style, 'title');
        data_style.goods_price_style = goods_trends_config(item.data_style, 'price');

        const { is_roll, rotation_direction, interval_time } = data_style;
        const { goods_list, images_list } = data_content;
        if (data_content.data_type == 'goods') {
            data_content.list = commodity_list(data_content.goods_list, item.num);
        } else {
            data_content.list = data_content.images_list;
        }
        const new_data = {
            data_type: data_content.data_type,
            interval_time: interval_time,
            is_roll: is_roll,
            rotation_direction: rotation_direction,
            goods_list: [...goods_list], // 确保深拷贝
            images_list: [...images_list] // 确保深拷贝
        };
        // let old_data = old_list.value[key];
        // 获取旧数据
        if (!isEmpty(old_list.value[key])) {
            // 旧数据
            const oldDataStringified = JSON.stringify(old_list.value[key]);
            // 新数据
            const newDataStringified = JSON.stringify(new_data);
            if (oldDataStringified != newDataStringified) {
                // 更新旧数据
                old_list.value[key] = JSON.parse(newDataStringified);
                // 更新轮播图的key，确保更换时能重新更新轮播图
                data_style.carouselKey = get_math();
            }
        } else {
            old_list.value[key] = new_data;
        }
    });
    data_magic_list.value = data;
}, {immediate: true, deep: true})
//#endregion
const carousel_change = (index: number, key: number) => {
    if (data_magic_list.value[key]) {
        data_magic_list.value[key].actived_index = index;
    }
}
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
const style_img_container = computed(() => common_img_computer(new_style.value.common_style));
</script>
<style lang="scss" scoped>
// 图片魔方是一个正方形，根据宽度计算高度
.img-magic {
    height: v-bind(container_size);
    width: 100%;
    overflow: hidden;
}
.cube-selected {
    position: absolute;
    text-align: center;
    color: $cr-main;
    box-sizing: border-box;
}
.outer-style {
    width: calc(100% + v-bind(outer_spacing));
    height: calc(100% + v-bind(outer_spacing));
    margin: v-bind(outer_sx);
}
.img-spacing-border {
    margin: v-bind(spacing);
}
.style-size {
    height: 100%;
    width: 100%;
    .style9-top {
        width: calc(50% - v-bind(outer_spacing));
        height: calc(50% - v-bind(outer_spacing));
        position: relative;
        overflow: hidden;
    }
    .style9-bottom {
        width: calc((100% / 3) - v-bind(outer_spacing));
        height: calc(50% - v-bind(outer_spacing));
        position: relative;
        overflow: hidden;
    }
}
.dot-center {
    left: 50%;
    transform: translateX(-50%);
}
.dot-right {
    right: 0;
}
.dot {
    padding-right: 10px;
    padding-left: 10px;
    z-index: 3;
    .dot-item {
        margin: 0 0.3rem;
    }
}
// 轮播高度自适应
:deep(.el-carousel) {
    height: 100%;
    .el-carousel__container {
        height: 100%;
    }
}

:deep(.el-image) {
    height: 100%;
    width: 100%;
    .el-image__inner {
        object-fit: cover;
    }
    .image-slot img {
        width: 6rem;
    }
}

.flex-basis-shrink {
    flex-basis: content;
    flex-shrink: 1;
}
</style>
