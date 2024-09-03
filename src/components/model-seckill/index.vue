<template>
    <div :style="style">
        <div class="flex-col gap-10">
            <div v-if="form.head_state == '1'" class="seckill-head flex-row align-c jc-sb oh" :style="seckill_head_style">
                <div :class="['flex-row align-c', {'gap-10': form.theme != '1', 'jc-sb w': form.theme == '2'}]">
                    <div class="seckill-title">
                        <image-empty v-if="form.topic_type == 'image'" v-model="form.topic_src[0]" error-img-style="width:2.1rem; height: 1rem;"></image-empty>
                        <span v-else :style="`color: ${ new_style.topic_color };font-size: ${ new_style.topic_size }px;line-height:21px;font-weight:600;`">{{ form.topic_text }}</span>
                    </div>
                    <div v-if="form.theme == '1'" class="pl-6 pr-6 cr-f">|</div>
                    <div class="flex-row align-c gap-4">
                        <span class="size-10" :style="`color: ${ new_style.end_text_color }`">距离结束</span>
                        <div class="flex-row gap-3 jc-c align-c" :style="[form.theme == '4'? `${ time_bg };padding: 0.3rem 0.4rem;border-radius: 1.1rem;` : '']">
                        <img v-if="form.theme == '4'" class="seckill-head-icon radius-xs" :src="url_computer('time')" />
                        <template v-for="(item, index) in time_config" :key="item.key">
                            <template v-if="form.theme == '4'">
                                <div class="size-12" :style="`color: ${ new_style.countdown_color }`">{{ item.value }}</div>
                                <span v-if="[0, 1].includes(index)" class="colon" :style="`color: ${ new_style.countdown_color }`">:</span>
                            </template>
                            <template v-else>
                                <div class="time-config size-12" :style="`${ time_bg };color: ${ new_style.countdown_color }`">{{ item.value }}</div>
                                <span v-if="[0, 1].includes(index)" class="colon" :style="icon_time_check()">:</span>
                            </template>
                        </template>
                        </div>
                    </div>
                </div>
                <div v-if="form.button_status == '1'" class="flex-row align-c" :style="`color: ${ new_style.head_button_color }`">
                    <span :style="`font-size: ${ new_style.head_button_size }px;`">{{ form.button_text }}</span>
                    <el-icon class="iconfont icon-arrow-right" :color="new_style.head_button_color"></el-icon>
                </div>
            </div>
            <div class="flex flex-wrap" :style="`gap: ${ content_outer_spacing }px;`">
                <div v-for="(item, index) in list" :key="index" :class="layout_type" :style="`${ content_radius }; ${ content_padding }`">
                    <template v-if="!isEmpty(item)">
                        <template v-if="!isEmpty(item.new_cover)">
                            <image-empty v-model="item.new_cover[0]" :class="`flex-img${shop_style_type}`" :style="content_img_radius"></image-empty>
                        </template>
                        <template v-else>
                            <image-empty v-model="item.images" :class="`flex-img${shop_style_type}`" :style="content_img_radius"></image-empty>
                        </template>
                    </template>
                    <div class="flex-col gap-10">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, common_styles_computer, gradient_computer, padding_computer, radius_computer } from '@/utils';
import { isEmpty } from 'lodash';

const props = defineProps({
    value: {
        type: Object,
        default: () => {
            return {};
        },
    },
});
const form = computed(() => props.value?.content || {});
const new_style = computed(() => props.value?.style || {});
const time_config = [
    { key: 'hour', value: 12 },
    { key: 'minute', value: 30 },
    { key: 'second', value: 52 },
]
const time_bg = computed(() => {
    const { countdown_bg_color_list, countdown_direction } = new_style.value;
    // 渐变
    const gradient = { color_list: countdown_bg_color_list, direction: countdown_direction };
    return gradient_computer(gradient);
});
// icon的渐变色处理
const icon_time_check = () => {
    return `${ time_bg.value };line-height: 1;background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;
}

const seckill_head_style = computed(() => {
    let style = ``;
    const { header_background_img_url, header_background_img_style, header_background_color_list, header_background_direction } = new_style.value;
    // 渐变
    const gradient = { color_list: header_background_color_list, direction: header_background_direction };
    // 背景图
    const back = { background_img_url: header_background_img_url, background_img_style: header_background_img_style };
    style += gradient_computer(gradient) + background_computer(back);
    return style;
});

const style = computed(() => common_styles_computer(props.value.style.common_style));
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
onBeforeMount(() => {
    list.value = Array(4).fill(default_list);
})
// 商品间距
const content_outer_spacing = computed(() => new_style.value.content_outer_spacing);
// 圆角设置
const content_radius = computed(() => radius_computer(new_style.value.shop_radius));
// 选择的风格
const shop_style_type = computed(() => form.value.shop_style_type);
// 内边距设置
const content_padding = computed(() => padding_computer(new_style.value.shop_padding));
// 不同风格下的样式
const layout_type = computed(() => {
    let class_type = '';
    switch (shop_style_type.value) {
        case '1':
            class_type = `flex-row bg-f oh multicolumn-columns`;
            break;
        case '2':
            class_type = `flex-col bg-f oh multicolumn-columns`;
            break;
        case '3':
            class_type = `flex-col bg-f oh multicolumn-columns`;
            break;
        default:
            break;
    }
    return class_type;
});
// 不换行显示
const multicolumn_columns_width = computed(() => {
    const { single_line_number } = toRefs(form.value);
    let model_number = single_line_number.value;
    if (shop_style_type.value == '1') {
        model_number = 1;
    } else if (shop_style_type.value == '2') {
        model_number = 2;
    }
    // 计算间隔的空间。(gap * gap数量) / 模块数量
    let gap = (new_style.value.content_outer_spacing * (model_number - 1)) / model_number;
    return `calc(${100 / model_number}% - ${gap}px)`;
});
// 图片圆角设置
const content_img_radius = computed(() => radius_computer(new_style.value.shop_img_radius));

const url_computer = (name: string) => {
    const new_url = ref(new URL(`../../assets/images/components/model-seckill/${name}.png`, import.meta.url).href).value;
    return new_url;
};
</script>
<style lang="scss" scoped>
:deep(.el-image) {
    .image-slot img {
        width: 5rem;
        height: 5rem;
    }
}
.seckill-head {
    padding: 1.5rem 1.3rem;
    width: 100%;
    height: 5.1rem;
    border-radius: 0.8rem 0.8rem 0 0;
    .seckill-title {
        height: 2.1rem;
    }
    .time-config {
        padding: 0.1rem 0.5rem;
        line-height: 1.7rem;
        border-radius: 0.4rem;
    }
}
.seckill-head-icon {
    width: 1.6rem;
    height: 1.6rem;
}
.colon {
    position: relative;
    top: -0.1rem;
}
.multicolumn-columns {
    height: 100%;
    width: v-bind(multicolumn_columns_width);
    min-width: v-bind(multicolumn_columns_width);
}
.flex-img1 {
    height: auto;
    min-height: 11rem;
    max-height: 12rem;
    width: 11rem;
}
.flex-img2 {
    width: 100%;
    height: 18rem;
}
.flex-img3 {
    width: 100%;
    min-height: 10.4rem;
}
</style>
