<template>
    <div class="oh" :style="style_container">
        <div :style="style_img_container">
            <div class="re oh" :style="style">
                <div v-if="!['4'].includes(blog_theme)" class="flex-warp" :class="blog_theme_class" :style="blog_theme != '3' ? blog_spacing : ''">
                    <div v-for="(item, index) in data_list" :key="index" class="item oh" :style="blog_style">
                        <div :class="blog_theme == '0' ? 'flex-row oh' : 'flex-col oh h'" :style="blog_img_style">
                            <template v-if="blog_theme != '3'">
                                <div class="oh re">
                                    <template v-if="item.new_cover.length > 0">
                                        <image-empty v-model="item.new_cover[0].url" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                                    </template>
                                    <template v-else>
                                        <image-empty v-model="item.data.cover" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                                    </template>
                                    <!-- 角标设置 -->
                                    <subscript-index :value="props.value"></subscript-index>
                                </div>
                            </template>
                            <div v-if="field_show.includes('0') || field_show.includes('1') || field_show.includes('2') || field_show.includes('3')" class="jc-sb flex-1" :class="blog_theme == '3' ? 'flex-row align-c' : 'flex-col'" :style="blog_theme != '0' ? content_padding : 'width: 0;'">
                                <div class="flex-col" :class="blog_theme == '3' ? 'flex-1 flex-width' : ''" :style="'gap:' + new_style.name_desc_space + 'px;'">
                                    <div v-if="field_show.includes('3')" class="title" :class="blog_theme == '3' ? 'text-line-1' : 'text-line-2'" :style="blog_name">{{ !isEmpty(item.new_title) ? item.new_title : item.data.title }}</div>
                                    <div v-if="field_show.includes('2')" :class="'desc ' + field_desc_row == '2' ? 'text-line-2' : 'text-line-1'" :style="blog_desc">{{ item.data.describe || '' }}</div>
                                </div>
                                <div class="flex-row jc-sb gap-8" :class="blog_theme == '3' ? 'ml-10' : 'align-e mt-10'">
                                    <div :style="blog_date">{{ field_show.includes('0') ? (!is_obj_empty(item.data) ? item.data.add_time : '2020-06-05 15:20') : '' }}</div>
                                    <div v-show="field_show.includes('1')" class="flex-row align-c gap-3" :style="blog_page_view">
                                        <icon name="eye"></icon>
                                        <div>
                                            {{ item.data.access_count ? item.data.access_count : '16' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="oh" :class="blog_theme_class">
                    <swiper :key="carousel_key" class="w flex" direction="horizontal" :loop="true" :autoplay="autoplay" :slides-per-view="Number(carousel_col) + 1" :slides-per-group="slides_per_group" :allow-touch-move="false" :space-between="new_style.blog_spacing" :pause-on-mouse-enter="true" :modules="modules">
                        <swiper-slide v-for="(item, index) in data_list" :key="index">
                            <div class="item oh" :style="blog_style">
                                <div class="h oh flex-col" :style="blog_img_style">
                                    <div class="oh re h">
                                        <template v-if="item.new_cover.length > 0">
                                            <image-empty v-model="item.new_cover[0].url" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                                        </template>
                                        <template v-else>
                                            <image-empty v-model="item.data.cover" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                                        </template>
                                        <template v-if="field_show.includes('3') && new_content.name_float == '1'">
                                            <div class="text-line-1" :style="blog_name + float_name_style">{{ !isEmpty(item.new_title) ? item.new_title : item.data.title }}</div>
                                        </template>
                                        <!-- 角标设置 -->
                                        <subscript-index :value="props.value"></subscript-index>
                                    </div>
                                    <div v-if="field_show.includes('0') || field_show.includes('1') || field_show.includes('2') || (field_show.includes('3') && new_content.name_float == '0')" class="jc-sb flex-1 flex-col" :style="blog_theme != '0' ? content_padding : ''">
                                        <div class="flex-col" :style="'gap:' + new_style.name_desc_space + 'px;'">
                                            <div v-if="field_show.includes('3') && new_content.name_float == '0'" class="title text-line-2" :style="blog_name">{{ !isEmpty(item.new_title) ? item.new_title : item.data.title }}</div>
                                            <div v-if="field_show.includes('2')" :class="'desc ' + field_desc_row == '2' ? 'text-line-2' : 'text-line-1'" :style="blog_desc">{{ item.data.describe || '' }}</div>
                                        </div>
                                        <div :class="[ 'flex-row jc-sb gap-8 align-e', { 'mt-10': (field_show.includes('3') && new_content.name_float == '0') || field_show.includes('2') }] ">
                                            <div :style="blog_date">{{ field_show.includes('0') ? (!is_obj_empty(item.data) ? item.data.add_time : '2020-06-05 15:20') : '' }}</div>
                                            <div v-show="field_show.includes('1')" class="flex-row align-c gap-3" :style="blog_page_view">
                                                <icon name="eye"></icon>
                                                <div>
                                                    {{ item.data.access_count ? item.data.access_count : '16' }}
                                                </div>
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
import blogAPI from '@/api/blog';
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
const error_img = ref('width:50px;padding:10px;');
const style = ref('');
const style_container = ref('');
const style_img_container = ref('');
interface dataObj {
    cover?: string;
    add_time?: string;
    access_count?: string;
    title?: string;
    describe?: string;
}
interface blogList {
    id: number | string;
    data: dataObj;
    new_title: string;
    new_cover: uploadList[];
}
// 数据
const data_list = ref<blogList[]>([]);
// 风格
const blog_theme = ref('0');
// 是否显示
const field_show = ref(['0', '1']);
// 文章
const blog_name = ref('');
// 文章描述
const blog_desc = ref('');
// 日期
const blog_date = ref('');
// 浏览量
const blog_page_view = ref('');
// 内容圆角
const content_radius = ref('');
// 图片圆角
const img_radius = ref('');
// 内间距
const content_padding = ref('');
// 内容间距
const content_spacing = ref('');
// 文章间距
const blog_spacing = ref('');
const blog_item_height = ref('155');

const blog_style = ref({});
const blog_img_style = ref('');
const default_data_list: blogList = {
    id: 0,
    data: {},
    new_title: '测试博客标题',
    new_cover: [],
};
// 内容
const new_content = computed(() => props.value?.content || {});
// 样式
const new_style = computed(() => props.value?.style || {});
// 获取自动数据
const get_auto_data_list = async () => {
    const { category_ids, number, order_by_type, order_by_rule, is_cover, keywords, is_recommended, is_hot } = new_content.value;
    const new_data = {
        blog_keywords: keywords,
        blog_category_ids: category_ids.join(','),
        blog_order_by_type: order_by_type,
        blog_order_by_rule: order_by_rule,
        blog_number: number,
        blog_is_cover: is_cover,
        blog_is_recommended: is_recommended,
        blog_is_hot: is_hot,
    };
    const res = await blogAPI.getAutoList(new_data);
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
        data_list.value = Array(4).fill(default_data_list);
    }
};
onMounted(() => {
    // 判断数据类型是选择文章且数据不为空
    if (new_content.value.data_type == '0' && !isEmpty(new_content.value.data_list)) {
        data_list.value = new_content.value.data_list;
    } else if (new_content.value.data_type == '1' && !isEmpty(new_content.value.data_auto_list)) {
        // 判断数据是筛选文章且数据不为空
        data_list.value = new_content.value.data_auto_list.map((item: any) => ({
            id: get_math(),
            new_title: '',
            new_cover: [],
            data: item,
        }));
    } else {
        // 否则走默认数据
        data_list.value = Array(4).fill(default_data_list);
    }
});
// 监听new_content指定的数据变化
const data_list_computer = computed(() => {
    const { data_type, category_ids, number, order_by_type, order_by_rule, is_cover, data_list, keywords, is_recommended, is_hot } = new_content.value;
    return { data_type, category_ids, number, order_by_type, order_by_rule, is_cover, data_list, keywords, is_recommended, is_hot };
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
                    data_list.value = Array(4).fill(default_data_list);
                }
            }
        }
    },
    { deep: true }
);

// // 轮播宽度
// const multicolumn_columns_width = computed(() => {
//     const { carousel_col } = toRefs(new_content.value);
//     const new_num = Number(carousel_col.value);
//     // 计算间隔的空间。(gap * gap数量) / 模块数量
//     let gap = (new_style.value.blog_spacing * (new_num - 1)) + (blog_left_right_width_margin.value * new_num) / new_num;
//     return `calc(${100 / new_num}% - ${gap}px)`;
// });
// 文章内容高度
const blog_name_height_computer = computed(() => {
    return new_style.value.name_size * 2.4 + 'px';
});
// 文章行高计算
const blog_name_line_height_computer = computed(() => {
    return new_style.value.name_size * 1.2 + 'px';
});
// 轮播高度
const carousel_height_computer = computed(() => {
    return new_style.value.blog_height + 'px';
});

const theme_list = [
    { name: '单列展示', value: '0', width:110, height: 83 },
    { name: '两列展示（纵向）', value: '1', width:180, height: 180 },
    { name: '大图展示', value: '2', width:0, height: 180 },
    { name: '无图模式', value: '3', width:0, height: 0 },
    { name: '左右滑动展示', value: '4', width:0, height: 0 },
]
// 宽度和高度为空的时候，修改默认值
const blog_img_width = computed(() => {
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
const blog_img_height = computed(() => {
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

// 文章名称浮动样式
const float_name_style = computed(() => {
    const { name_bg_color_list = [], name_bg_direction = '180deg', name_bg_radius = old_radius, name_bg_padding = old_padding, name_bg_margin = old_margin } = new_style.value;
    const data = {
        color_list: name_bg_color_list,
        direction: name_bg_direction,
    }
    let location = 'position:absolute;bottom:0;left:0;right:0;'
    return gradient_computer(data) + radius_computer(name_bg_radius) + padding_computer(name_bg_padding) + margin_computer(name_bg_margin) + location;
});
const field_desc_row = ref('1');
const blog_left_right_width_margin = computed(() => {
    const { margin = old_margin } = new_style.value;
    return margin.margin_left + margin.margin_right;
});
// 监听value数据变化
watch(
    () => props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content;
        const new_style = newVal?.style;
        blog_theme.value = new_content.theme;
        field_show.value = new_content.field_show;
        // 样式
        blog_name.value = 'font-size:' + new_style.name_size + 'px;' + 'font-weight:' + new_style.name_weight + ';' + 'color:' + new_style.name_color + ';';
        // 文章描述
        const desc_size = new_style.desc_size;
        field_desc_row.value = new_content.field_desc_row;
        if (new_content.field_desc_row == '2') {
            blog_desc.value = 'font-size:' + desc_size + 'px;line-height:' + (desc_size > 0 ? desc_size + 3 : 0 ) + 'px;height:'+ (desc_size > 0 ? (desc_size + 3) * 2 : 0) + 'px;color:' + new_style.desc_color + ';';
        } else {
            blog_desc.value = 'font-size:' + desc_size + 'px;line-height:' + desc_size + 'px;height:'+ desc_size + 'px;color:' + new_style.desc_color + ';';
        }
        blog_date.value = 'font-size:' + new_style.time_size + 'px;' + 'font-weight:' + new_style.time_weight + ';' + 'color:' + new_style.time_color + ';';
        blog_page_view.value = 'font-size:' + new_style.page_view_size + 'px;' + 'font-weight:' + new_style.page_view_weight + ';' + 'color:' + new_style.page_view_color + ';';
        content_radius.value = radius_computer(new_style.content_radius);
        img_radius.value = radius_computer(new_style.img_radius);
        // 内间距
        content_padding.value = padding_computer(new_style.padding);
        // 内容间距
        content_spacing.value = `gap: ${new_style.content_spacing}px;`;
        // 文章间距
        blog_spacing.value = `gap: ${new_style.blog_spacing}px;`;
        // 文章样式
        blog_style.value = '';
        blog_img_style.value = '';
        // 背景图的处理
        const blog_data = {
            background_img_style: new_style.blog_background_img_style,
            background_img: new_style.blog_background_img,
        }
        style.value = '';
        // 样式处理
        const all_style = gradient_handle(new_style.blog_color_list, new_style.blog_direction) + margin_computer(new_style.margin) + box_shadow_computer(new_style) + border_computer(new_style);
        if (blog_theme.value == '0') {
            blog_style.value += content_radius.value + all_style;
            blog_img_style.value = content_spacing.value + content_padding.value + background_computer(blog_data);
        } else if (blog_theme.value == '1') {
            blog_style.value += `width: calc(50% - ${(new_style.blog_spacing + blog_left_right_width_margin.value * 2) / 2}px);` + content_radius.value + all_style;
            blog_img_style.value = background_computer(blog_data);
        } else if (blog_theme.value == '2') {
            blog_style.value += content_radius.value + all_style;
            blog_img_style.value = background_computer(blog_data);
        } else if (blog_theme.value == '3') {
            style.value = `padding: 0 ${new_style.content_spacing}px;background:#fff;` + content_radius.value;
        } else if (blog_theme.value == '4') {
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
            blog_item_height.value = `${new_style.blog_height}px`;
            blog_style.value += content_radius.value + all_style;
            blog_img_style.value = background_computer(blog_data);
        }
        if (new_style.common_style && props.isCommonStyle) {
            style_container.value = common_styles_computer(new_style.common_style);
            style_img_container.value = common_img_computer(new_style.common_style);
        }
    },
    { deep: true, immediate: true }
);
// 文章主题class计算
const blog_theme_class = computed(() => {
    switch (blog_theme.value) {
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
            height: v-bind(blog_img_height);
            width: v-bind(blog_img_width);
        }
    }
}
.style2 {
    .item {
        .img {
            height: v-bind(blog_img_height);
        }
    }
}
.style3 {
    .item {
        .img {
            width: 100%;
            height: v-bind(blog_img_height);
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
.style5 {
    .item {
        height: v-bind(carousel_height_computer);
        .img {
            width: 100%;
            height: 100%;
        }
        .title {
            height: v-bind(blog_name_height_computer);
            line-height: v-bind(blog_name_line_height_computer);
        }
    }
}
</style>
