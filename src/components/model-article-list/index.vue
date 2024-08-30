<template>
    <div class="oh" :style="style_container">
        <div class="re oh" :style="style">
            <div class="flex-warp" :class="article_theme_class" :style="article_theme !== '3' ? article_spacing : ''">
                <template v-for="(item, index) in data_list" :key="index">
                    <div class="item bg-f oh" :class="article_theme == '0' ? 'flex-row' : 'flex-col'" :style="article_style">
                        <template v-if="article_theme !== '3'">
                            <template v-if="item.new_cover.length > 0">
                                <image-empty v-model="item.new_cover[0].url" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                            </template>
                            <template v-else> <image-empty v-model="item.data.cover" class="img" :style="img_radius" :error-img-style="error_img"></image-empty> </template>
                        </template>
                        <div class="jc-sb flex-1" :class="article_theme == '3' ? 'flex-row align-c' : 'flex-col'" :style="article_theme !== '0' ? content_padding : ''">
                            <div class="title" :class="article_theme == '3' ? 'text-line-1 flex-1 flex-width' : 'text-line-2'" :style="article_name">{{ !isEmpty(item.new_title) ? item.new_title : item.data.title }}</div>
                            <div class="flex-row jc-sb gap-8" :class="article_theme == '3' ? 'ml-10' : 'align-e mt-10'">
                                <div :style="article_date">{{ field_show.includes('0') ? (!is_obj_empty(item.data) ? item.data.add_time : '2020-06-05 15:20') : '' }}</div>
                                <div class="flex-row align-c gap-3" :style="article_page_view">
                                    <icon v-show="field_show.includes('1')" name="eye"></icon>
                                    <div>
                                        {{ item.data.access_count ? item.data.access_count : '16' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, padding_computer, radius_computer, get_math, is_obj_empty } from '@/utils';
import { isEmpty, cloneDeep } from 'lodash';
import ArticleAPI from '@/api/article';
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
interface dataObj {
    cover?: string;
    add_time?: string;
    access_count?: string;
    title?: string;
}
interface ArticleList {
    id: number | string;
    data: dataObj;
    new_title: string;
    new_cover: uploadList[];
}
const containerRef = ref<HTMLElement | null>(null);
// 数据
const data_list = ref<ArticleList[]>([]);
// 风格
const article_theme = ref('0');
// 是否显示
const field_show = ref(['0', '1']);
// 文章
const article_name = ref('');
// 日期
const article_date = ref('');
// 浏览量
const article_page_view = ref('');
// 内容圆角
const content_radius = ref('');
// 图片圆角
const img_radius = ref('');
// 内间距
const content_padding = ref('');
// 内容间距
const content_spacing = ref('');
// 文章间距
const article_spacing = ref('');
const article_spacing_children = ref('');
const article_item_width = ref('104');
const article_item_height = ref('104');

const article_style = ref({});
const default_data_list: ArticleList = {
    id: 0,
    data: {},
    new_title: '测试文章标题',
    new_cover: [],
};
const get_auto_data_list = async (new_content: any) => {
    const { category, number, sort, sort_rules, is_cover } = new_content;
    const new_data = {
        article_keywords: '',
        article_category_ids: category.join(','),
        article_order_by_type: sort,
        article_order_by_rule: sort_rules,
        article_number: number,
        article_is_cover: is_cover ? 1 : 0,
    };
    const res = await ArticleAPI.getAutoList(new_data);
    if (!isEmpty(res.data)) {
        data_list.value = [];
        res.data.forEach((child: any) => {
            data_list.value.push({
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
watch(
    props.value,
    (newVal, oldValue) => {
        const new_content = newVal?.content;
        const new_style = newVal?.style;
        // 内容
        if (new_content.data_type === '0') {
            if (!isEmpty(new_content.data_list)) {
                data_list.value = new_content.data_list;
                data_list.value = cloneDeep(new_content.data_list);
            } else {
                data_list.value = Array(4).fill(default_data_list);
            }
        } else {
            get_auto_data_list(new_content);
        }

        article_theme.value = new_content.theme;
        field_show.value = new_content.field_show;
        // 样式
        article_name.value = 'font-size:' + new_style.name_size + 'px;' + 'font-weight:' + new_style.name_weight + ';' + 'color:' + new_style.name_color + ';';
        article_date.value = 'font-size:' + new_style.time_size + 'px;' + 'font-weight:' + new_style.time_weight + ';' + 'color:' + new_style.time_color + ';';
        article_page_view.value = 'font-size:' + new_style.page_view_size + 'px;' + 'font-weight:' + new_style.page_view_weight + ';' + 'color:' + new_style.page_view_color + ';';
        content_radius.value = radius_computer(new_style.content_radius);
        img_radius.value = radius_computer(new_style.img_radius);
        // 内间距
        content_padding.value = padding_computer(new_style.padding);
        // 内容间距
        content_spacing.value = `gap: ${new_style.content_spacing}px;`;
        // 文章间距
        article_spacing.value = `gap: ${new_style.article_spacing}px;`;
        // 文章样式
        article_style.value = '';
        style.value = '';
        if (article_theme.value == '0') {
            article_style.value += content_spacing.value + content_padding.value + content_radius.value;
        } else if (article_theme.value == '1') {
            article_spacing_children.value = `width: calc(50% - ${new_style.article_spacing / 2}px);`;
            article_style.value += article_spacing_children.value + content_radius.value;
        } else if (article_theme.value == '2') {
            article_style.value += content_radius.value;
        } else if (article_theme.value == '3') {
            style.value = `padding: 0 ${new_style.content_spacing}px;background:#fff;` + content_radius.value;
        } else if (article_theme.value == '4') {
            article_item_width.value = `${new_style.article_width}px`;
            article_item_height.value = `${new_style.article_height}px`;
            article_style.value += content_radius.value;
        }
        if (new_style.common_style && props.isCommonStyle) {
            style_container.value = common_styles_computer(new_style.common_style);
        }
    },
    { immediate: true, deep: true }
);
const article_theme_class = computed(() => {
    switch (article_theme.value) {
        case '0':
            return 'style1 flex-col';
        case '1':
            return 'style2 flex-row flex-wrap';
        case '2':
            return 'style3 flex-col';
        case '3':
            return 'style4 flex-col';
        case '4':
            return 'style5 flex-row';
    }
    return `style${article_theme.value}`;
});
</script>
<style lang="scss" scoped>
.style1 {
    .item {
        width: 100%;
        .img {
            height: 8.3rem;
            width: 11rem;
        }
    }
}
.style2 {
    .item {
        width: calc(50% - 0.5rem);
        .img {
            height: 18rem;
        }
    }
}
.style3 {
    .item {
        width: 100%;
        .img {
            width: 100%;
            height: 18rem;
        }
    }
}
.style4 {
    .item {
        width: 100%;
        &:not(:last-child) {
            border-bottom: 0.1rem solid #eee;
        }
    }
}
.style5 {
    .item {
        min-width: v-bind(article_item_width);
        width: v-bind(article_item_width);
        .img {
            width: 100%;
            height: v-bind(article_item_height);
        }
    }
}
</style>
