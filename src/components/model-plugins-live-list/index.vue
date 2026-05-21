<template>
    <div class="oh" :style="style_container">
        <div :style="style_img_container">
            <div class="re oh" :style="style">
                <div v-if="!['4'].includes(plugins_live_theme)" class="flex-warp" :class="plugins_live_theme_class" :style="plugins_live_theme != '3' ? plugins_live_spacing : ''">
                    <div v-for="(item, index) in data_list" :key="index" class="item oh" :style="plugins_live_style">
                        <div :class="plugins_live_theme == '0' ? 'flex-row oh' : 'flex-col oh h'" :style="plugins_live_img_style">
                            <template v-if="plugins_live_theme != '3'">
                                <div class="oh re">
                                    <template v-if="item.new_cover.length > 0">
                                        <image-empty v-model="item.new_cover[0].url" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                                    </template>
                                    <template v-else>
                                        <image-empty v-model="item.data.cover" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                                    </template>
                                    <!-- 直播状态角标 field_show=3，样式对齐 UniApp live-status-tag -->
                                    <div
                                        v-if="field_show.includes('3') && should_show_live_status(item.data)"
                                        class="live-status-tag"
                                        :class="'status-' + get_live_room_status(item.data)"
                                    >
                                        <div v-if="get_live_room_status(item.data) === 1" class="live-status-dots">
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                        </div>
                                        {{ get_live_room_status_name(item.data) }}
                                    </div>
                                </div>
                            </template>
                            <div v-if="field_show.includes('0') || field_show.includes('1') || field_show.includes('2') || field_show.includes('3')" class="jc-sb flex-1" :class="plugins_live_theme == '3' ? 'flex-row align-c' : 'flex-col'" :style="plugins_live_theme != '0' ? content_padding : 'width: 0;'">
                                <template v-if="plugins_live_theme == '3'">
                                    <div class="live-noimg-row flex-row align-c flex-1 flex-width">
                                        <div v-if="field_show.includes('0')" class="title text-line-1 live-noimg-title" :style="plugins_live_name">{{ !isEmpty(item.new_title) ? item.new_title : item.data.title }}</div>
                                        <div
                                            v-if="field_show.includes('3') && should_show_live_status(item.data)"
                                            class="live-status-tag live-status-tag--inline"
                                            :class="'status-' + get_live_room_status(item.data)"
                                        >
                                            <div v-if="get_live_room_status(item.data) === 1" class="live-status-dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
                                            {{ get_live_room_status_name(item.data) }}
                                        </div>
                                    </div>
                                </template>
                                <div v-else class="flex-col">
                                    <div v-if="field_show.includes('0')" class="title text-line-2" :style="plugins_live_name">{{ !isEmpty(item.new_title) ? item.new_title : item.data.title }}</div>
                                </div>
                                <div class="flex-row jc-sb gap-8" :class="plugins_live_theme == '3' ? 'ml-10' : 'align-e mt-10'">
                                    <div :style="plugins_live_seller_name">{{ field_show.includes('1') ? live_seller_name(item) : '' }}</div>
                                    <div v-show="field_show.includes('2')" class="flex-row align-c gap-3" :style="plugins_live_page_view">
                                        <icon name="eye"></icon>
                                        <div>{{ live_viewer_count(item) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="oh" :class="plugins_live_theme_class">
                    <swiper :key="carousel_key" class="w flex" direction="horizontal" :loop="true" :autoplay="autoplay" :slides-per-view="Number(carousel_col) + 1" :slides-per-group="slides_per_group" :allow-touch-move="false" :space-between="new_style.plugins_live_spacing" :pause-on-mouse-enter="true" :modules="modules">
                        <swiper-slide v-for="(item, index) in data_list" :key="index">
                            <div class="item oh" :style="plugins_live_style">
                                <div class="h oh flex-col" :style="plugins_live_img_style">
                                    <div class="oh re h">
                                        <template v-if="item.new_cover.length > 0">
                                            <image-empty v-model="item.new_cover[0].url" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                                        </template>
                                        <template v-else>
                                            <image-empty v-model="item.data.cover" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                                        </template>
                                        <template v-if="field_show.includes('0') && new_content.name_float == '1'">
                                            <div class="text-line-1" :style="plugins_live_name + float_name_style">{{ !isEmpty(item.new_title) ? item.new_title : item.data.title }}</div>
                                        </template>
                                        <!-- 轮播模式下的直播状态角标 -->
                                        <div
                                            v-if="field_show.includes('3') && should_show_live_status(item.data)"
                                            class="live-status-tag"
                                            :class="'status-' + get_live_room_status(item.data)"
                                        >
                                            <div v-if="get_live_room_status(item.data) === 1" class="live-status-dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
                                            {{ get_live_room_status_name(item.data) }}
                                        </div>
                                    </div>
                                    <div v-if="field_show.includes('1') || field_show.includes('2') || (field_show.includes('0') && new_content.name_float == '0')" class="jc-sb flex-1 flex-col" :style="plugins_live_theme != '0' ? content_padding : ''">
                                        <div class="flex-col">
                                            <div v-if="field_show.includes('0') && new_content.name_float == '0'" class="title text-line-2" :style="plugins_live_name">{{ !isEmpty(item.new_title) ? item.new_title : item.data.title }}</div>
                                        </div>
                                        <div :class="[ 'flex-row jc-sb gap-8 align-e', { 'mt-10': field_show.includes('0') && new_content.name_float == '0' }] ">
                                            <div :style="plugins_live_seller_name">{{ field_show.includes('1') ? live_seller_name(item) : '' }}</div>
                                            <div v-show="field_show.includes('2')" class="flex-row align-c gap-3" :style="plugins_live_page_view">
                                                <icon name="eye"></icon>
                                                <div>{{ live_viewer_count(item) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, padding_computer, radius_computer, get_math, is_obj_empty, common_img_computer, background_computer, gradient_handle, gradient_computer, margin_computer, box_shadow_computer, border_computer } from '@/utils';
import { old_radius, old_padding, old_margin } from "@/utils/common";
import { isEmpty, cloneDeep } from 'lodash';
import PluginsLiveAPI from '@/api/plugins-live';
// 直播状态展示与 autolivelist 参数转换（见 plugins-live-status.ts）
import {
    get_live_room_status,
    get_live_room_status_name,
    get_live_online_count,
    should_show_live_status,
    type LiveRoomDataLike,
} from '@/config/const/plugins-live-status';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
const modules = [Autoplay];
/**
 * @description: 直播列表（渲染）
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
const error_img = ref('width:50px;padding:10px;');
const style = ref('');
const style_container = ref('');
const style_img_container = ref('');
/** 列表项 data，继承直播间状态/人数字段 */
interface dataObj extends LiveRoomDataLike {
    cover?: string;
    title?: string;
    describe?: string;
}
interface plugins_liveList {
    id: number | string;
    data: dataObj;
    new_title: string;
    new_cover: uploadList[];
}
// 数据
const data_list = ref<plugins_liveList[]>([]);
// 风格
const plugins_live_theme = ref('0');
const LIVE_FIELD_SHOW_DEFAULT = ['0', '1', '2', '3'];
/** 解析 field_show，保证为字符串数组且含默认项 */
const resolve_field_show = (raw: unknown): string[] => {
    if (!Array.isArray(raw) || raw.length === 0) {
        return [...LIVE_FIELD_SHOW_DEFAULT];
    }
    return raw.map((v) => String(v));
};
// 是否显示
const field_show = ref<string[]>([...LIVE_FIELD_SHOW_DEFAULT]);
// 视频
const plugins_live_name = ref('');
// 卖家名称样式（复用 time_* 样式配置项）
const plugins_live_seller_name = ref('');
// 浏览量
const plugins_live_page_view = ref('');
// 内容圆角
const content_radius = ref('');
// 图片圆角
const img_radius = ref('');
// 内间距
const content_padding = ref('');
// 内容间距
const content_spacing = ref('');
// 直播间距
const plugins_live_spacing = ref('');
const plugins_live_item_height = ref('155');

const plugins_live_style = ref({});
const plugins_live_img_style = ref('');
/** 无接口数据时的预览占位（覆盖各直播状态样式） */
const default_data_samples: LiveRoomDataLike[] = [
    { status: 1, status_name: '直播中', online_count: '128', seller_name: '卖家名称' },
    { status: 0, status_name: '离线', online_count: '0', seller_name: '卖家名称' },
    { status: 1, status_name: '直播中', online_count: '56', seller_name: '卖家名称' },
    { status: 2, status_name: '离开', online_count: '12', seller_name: '卖家名称' },
];

/** 生成默认预览列表 */
const get_default_data_list = (): plugins_liveList[] =>
    default_data_samples.map((data, index) => ({
        id: index,
        data,
        new_title: '测试直播标题',
        new_cover: [],
    }));

/** 观看人数：优先 online_count，与 UniApp 列表一致 */
const live_viewer_count = (item: plugins_liveList) => get_live_online_count(item?.data);

/** 卖家名称：有值则展示，接口无值时为空（预览占位数据见 default_data_samples） */
const live_seller_name = (item: plugins_liveList) => {
    const name = item?.data?.seller_name;
    return name != null && String(name).trim() !== '' ? String(name) : '';
};

// 内容
const new_content = computed(() => props.value?.content || {});
// 样式
const new_style = computed(() => props.value?.style || {});
/** 直播状态多选 → autolivelist.live_status（逗号分隔字符串） */
const format_live_status = (status: string[] | string | undefined) => {
    if (Array.isArray(status)) {
        return status.filter((s) => s !== '' && s != null).join(',');
    }
    return status ? String(status) : '';
};

/** 筛选模式：请求 autolivelist 并刷新列表 */
const get_auto_data_list = async () => {
    const { number, order_by_type, order_by_rule, keywords, live_status, is_recommended } = new_content.value;
    const new_data: Parameters<typeof PluginsLiveAPI.getAutoList>[0] = {
        live_keywords: keywords || '',
        live_status: format_live_status(live_status),
        live_order_by_type: order_by_type ?? 0,
        live_order_by_rule: order_by_rule ?? 0,
        live_number: number,
        live_is_recommended: Number(is_recommended ?? 0),
    };
    const res = await PluginsLiveAPI.getAutoList(new_data);
    new_content.value.data_auto_list = [];
    if (!isEmpty(res.data)) {
        data_list.value = [];
        res.data.forEach((child: any) => {
            data_list.value.push({
                id: get_math(),
                new_title: '',
                new_cover: [],
                data: child,
            });
            new_content.value.data_auto_list.push({
                id: get_math(),
                new_title: '',
                new_cover: [],
                data: child,
            });
        });
    } else {
        data_list.value = get_default_data_list();
    }
};
onMounted(() => {
    field_show.value = resolve_field_show(new_content.value.field_show);
    // 判断数据类型是选择直播且数据不为空
    if (new_content.value.data_type == '0' && !isEmpty(new_content.value.data_list)) {
        data_list.value = new_content.value.data_list;
    } else if (new_content.value.data_type == '1' && !isEmpty(new_content.value.data_auto_list)) {
        // 判断数据是筛选直播且数据不为空
        data_list.value = new_content.value.data_auto_list.map((item: any) => ({
            id: get_math(),
            new_title: '',
            new_cover: [],
            data: item,
        }));
    } else {
        // 否则走默认数据
        data_list.value = get_default_data_list();
    }
});
// 监听new_content指定的数据变化
const data_list_computer = computed(() => {
    const { data_type, number, order_by_type, order_by_rule, is_cover, data_list, keywords, live_status, is_recommended } = new_content.value;
    return { data_type, number, order_by_type, order_by_rule, is_cover, data_list, keywords, live_status, is_recommended };
});
// 监听new_content指定的数据的变化，来获取最新数据
watch(
    () => data_list_computer.value,
    (new_value, old_value) => {
        // 使用JSON.stringify()进行判断 新值和旧值是否一样 不一样就重新获取数据
        if (JSON.stringify(new_value) !== JSON.stringify(old_value) || props.isCommonStyle) {
            if (new_value.data_type == '1') {
                get_auto_data_list();
            } else {
                if (!isEmpty(new_content.value.data_list)) {
                    data_list.value = cloneDeep(new_content.value.data_list);
                } else {
                    data_list.value = get_default_data_list();
                }
            }
        }
    },
    { deep: true }
);

// 视频内容高度
const plugins_live_name_height_computer = computed(() => {
    return new_style.value.name_size * 2.4 + 'px';
});
// 视频行高计算
const plugins_live_name_line_height_computer = computed(() => {
    return new_style.value.name_size * 1.2 + 'px';
});
// 轮播高度
const carousel_height_computer = computed(() => {
    return new_style.value.plugins_live_height + 'px';
});

const theme_list = [
    { name: '单列展示', value: '0', width:110, height: 83 },
    { name: '两列展示（纵向）', value: '1', width:180, height: 180 },
    { name: '大图展示', value: '2', width:0, height: 180 },
    { name: '无图模式', value: '3', width:0, height: 0 },
    { name: '左右滑动展示', value: '4', width:0, height: 0 },
]
// 宽度和高度为空的时候，修改默认值
const plugins_live_img_width = computed(() => {
    if (typeof new_style.value.content_img_width == 'number') {
        return new_style.value.content_img_width + 'px';
    } else {
        const list = theme_list.filter(item => item.value == new_content.value.theme);
        if (list.length > 0) {
            return list[0].width + 'px';
        } else {
            return 'auto';
        }
    }
});
// 宽度和高度为空的时候，修改默认值
const plugins_live_img_height = computed(() => {
    if (typeof new_style.value.content_img_height == 'number') {
        return new_style.value.content_img_height + 'px';
    } else {
        const list = theme_list.filter(item => item.value == new_content.value.theme);
        if (list.length > 0) {
            return list[0].height + 'px';
        } else {
            return 'auto';
        }
    }
});
// 轮播图列数
const carousel_col = ref('2');
// 轮播图key值
const carousel_key = ref('0');
const autoplay = ref<boolean | object>(false);
const slides_per_group = ref(1);

// 直播名称浮动样式
const float_name_style = computed(() => {
    const { name_bg_color_list = [], name_bg_direction = '180deg', name_bg_radius = old_radius, name_bg_padding = old_padding, name_bg_margin = old_margin } = new_style.value;
    const data = {
        color_list: name_bg_color_list,
        direction: name_bg_direction,
    }
    let location = 'position:absolute;bottom:0;left:0;right:0;'
    return gradient_computer(data) + radius_computer(name_bg_radius) + padding_computer(name_bg_padding) + margin_computer(name_bg_margin) + location;
});

const plugins_live_left_right_width_margin = computed(() => {
    const { margin = old_margin } = new_style.value;
    return margin.margin_left + margin.margin_right;
});
// 监听value数据变化
watch(
    () => props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content;
        const new_style = newVal?.style;
        plugins_live_theme.value = new_content.theme;
        field_show.value = resolve_field_show(new_content.field_show);
        // 样式
        plugins_live_name.value = 'font-size:' + new_style.name_size + 'px;' + 'font-weight:' + new_style.name_weight + ';' + 'color:' + new_style.name_color + ';';
        plugins_live_seller_name.value = 'font-size:' + new_style.time_size + 'px;' + 'font-weight:' + new_style.time_weight + ';' + 'color:' + new_style.time_color + ';';
        plugins_live_page_view.value = 'font-size:' + new_style.page_view_size + 'px;' + 'font-weight:' + new_style.page_view_weight + ';' + 'color:' + new_style.page_view_color + ';';
        content_radius.value = radius_computer(new_style.content_radius);
        img_radius.value = radius_computer(new_style.img_radius);
        // 内间距
        content_padding.value = padding_computer(new_style.padding);
        // 内容间距
        content_spacing.value = `gap: ${new_style.content_spacing}px;`;
        // 直播间距
        plugins_live_spacing.value = `gap: ${new_style.plugins_live_spacing}px;`;
        // 视频样式
        plugins_live_style.value = '';
        plugins_live_img_style.value = '';
        // 背景图的处理
        const plugins_live_data = {
            background_img_style: new_style.plugins_live_background_img_style,
            background_img: new_style.plugins_live_background_img,
        }
        style.value = '';
        // 样式处理
        const all_style = gradient_handle(new_style.plugins_live_color_list, new_style.plugins_live_direction) + margin_computer(new_style.margin) + box_shadow_computer(new_style) + border_computer(new_style);
        if (plugins_live_theme.value == '0') {
            plugins_live_style.value += content_radius.value + all_style;
            plugins_live_img_style.value = content_spacing.value + content_padding.value + background_computer(plugins_live_data);
        } else if (plugins_live_theme.value == '1') {
            plugins_live_style.value += `width: calc(50% - ${(new_style.plugins_live_spacing + plugins_live_left_right_width_margin.value * 2) / 2}px);` + content_radius.value + all_style;
            plugins_live_img_style.value = background_computer(plugins_live_data);
        } else if (plugins_live_theme.value == '2') {
            plugins_live_style.value += content_radius.value + all_style;
            plugins_live_img_style.value = background_computer(plugins_live_data);
        } else if (plugins_live_theme.value == '3') {
            style.value = `background:#fff;` + content_radius.value;
        } else if (plugins_live_theme.value == '4') {
            // 更新轮播图的key，确保更换时能重新更新轮播图
            carousel_col.value = new_content.carousel_col || '1';
            carousel_key.value = new_style.interval_time + new_style.is_roll + new_style.rolling_fashion;
            // // 滚动时间
            // interval_time.value = (new_style.interval_time || 2) * 1000;
            // // 是否滚动修改
            // is_roll.value = new_style.is_roll;
            // 是否滚动
            if (new_style.is_roll == '1' && data_list.value.length > 0) {
                autoplay.value = {
                    delay: (new_style.interval_time || 2) * 1000,
                    pauseOnMouseEnter: true,
                };
            } else {
                autoplay.value = false;
            }
            // 判断是平移还是整屏滚动
            slides_per_group.value = new_style.rolling_fashion == 'translation' ? 1 : Number(new_content.carousel_col) + 1;
            plugins_live_item_height.value = `${new_style.plugins_live_height}px`;
            plugins_live_style.value += content_radius.value + all_style;
            plugins_live_img_style.value = background_computer(plugins_live_data);
        }
        if (new_style.common_style && props.isCommonStyle) {
            style_container.value = common_styles_computer(new_style.common_style);
            style_img_container.value = common_img_computer(new_style.common_style);
        }
    },
    { deep: true, immediate: true }
);
// 视频主题class计算
const plugins_live_theme_class = computed(() => {
    switch (plugins_live_theme.value) {
        case '0':
            return 'style1 flex-col';
        case '1':
            return 'style2 flex-row flex-wrap';
        case '2':
            return 'style3 flex-col';
        case '3':
            return 'style4 flex-col';
        default:
            return 'style5';
    }
});
</script>
<style lang="scss" scoped>
.style1 {
    .item {
        .img {
            height: v-bind(plugins_live_img_height);
            width: v-bind(plugins_live_img_width);
        }
    }
}
.style2 {
    .item {
        .img {
            height: v-bind(plugins_live_img_height);
        }
    }
}
.style3 {
    .item {
        .img {
            width: 100%;
            height: v-bind(plugins_live_img_height);
        }
    }
}
.style4 {
    .item {
        &:not(:last-child) {
            border-bottom: 0.1rem solid #eee;
        }
    }
}
/* 直播状态标签（与 UniApp pages/plugins/live 一致，有封面时绝对定位） */
.live-status-tag {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.6rem;
    font-size: 1.1rem;
    line-height: 1.4rem;
    color: #fff;
    background-color: #999;
    border-radius: 0.2rem;
}
/* 无图模式：标题左对齐，状态在标题右侧 */
.live-noimg-row {
    gap: 10px;
    min-width: 0;
}
.live-status-tag.live-status-tag--inline {
    position: static;
    top: auto;
    left: auto;
    z-index: auto;
    flex-shrink: 0;
    align-self: center;
}
.style4 .live-noimg-row .live-noimg-title {
    flex: 0 1 auto;
    min-width: 0;
    text-align: left;
}
.style4 .live-noimg-row .live-status-tag--inline {
    flex-shrink: 0;
}
/* status-1 直播中 / status-2 离开 / status-3 封禁，默认灰为离线 */
.live-status-tag.status-1 {
    background-color: #e93633;
}
.live-status-tag.status-2 {
    background-color: #f5c242;
}
.live-status-tag.status-3 {
    background-color: #666;
}
/* 直播中竖条跳动动画 */
.live-status-dots {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 0.8rem;
    gap: 0.2rem;
}
.live-status-dots .dot {
    width: 0.2rem;
    background-color: #fff;
    border-radius: 0.1rem;
    transform-origin: bottom;
}
.live-status-dots .dot:nth-child(1) {
    animation: live-bar1-random 1.1s infinite ease-in-out both;
}
.live-status-dots .dot:nth-child(2) {
    animation: live-bar2-random 1.4s infinite ease-in-out both;
}
.live-status-dots .dot:nth-child(3) {
    animation: live-bar3-random 1.2s infinite ease-in-out both;
}
@keyframes live-bar1-random {
    0% { height: 0.2rem; }
    50% { height: 0.7rem; }
    100% { height: 0.2rem; }
}
@keyframes live-bar2-random {
    0% { height: 0.3rem; }
    50% { height: 0.6rem; }
    100% { height: 0.3rem; }
}
@keyframes live-bar3-random {
    0% { height: 0.25rem; }
    50% { height: 0.65rem; }
    100% { height: 0.25rem; }
}
.style5 {
    .item {
        height: v-bind(carousel_height_computer);
        .img {
            width: 100%;
            height: 100%;
        }
        .title {
            height: v-bind(plugins_live_name_height_computer);
            line-height: v-bind(plugins_live_name_line_height_computer);
        }
    }
}
</style>
