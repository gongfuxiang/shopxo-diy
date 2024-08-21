<template>
    <div class="oh" :style="style_container">
        <div class="re" :style="style">
            <div class="flex-warp" :class="article_type_class" :style="article_spacing">
                <template v-for="(item, index) in article_list" :key="index">
                    <div class="item gap-10 bg-f oh" :class="article_type == '0' ? 'flex-row' : 'flex-col'" :style="article_style">
                        <template v-if="item.new_url.length > 0">
                            <image-empty v-model="item.new_url[0].url" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                        </template>
                        <template v-else>
                            <image-empty v-model="item.link.cover" class="img" :style="img_radius" :error-img-style="error_img"></image-empty>
                        </template>
                        <div class="flex-col jc-sb" :style="article_type !== '0' ? content_padding : ''">
                            <div class="title text-line-2" :style="article_name">{{ item.new_title }}</div>
                            <div class="flex-row jc-sb gap-8 align-c mt-10">
                                <div :style="article_date">{{ is_show.includes('0') ? '2020-06-05 15:20' : '' }}</div>
                                <icon v-show="is_show.includes('1')" name="eye" :style="article_page_view">16</icon>
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
interface ArticleList {
    id: number | string;
    link: object;
    new_title: string;
    new_url: uploadList[];
}
const containerRef = ref<HTMLElement | null>(null);
// 数据
const article_list = ref<ArticleList[]>([]);
// 风格
const article_type = ref('0');
// 是否显示
const is_show = ref(['0', '1']);
// 是否显示封面图片
const is_img_show = ref(true);
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
const article_item_width = ref('50%');

const article_style = ref({});
watch(
    props.value,
    (newVal, oldValue) => {
        console.log(newVal);
        const new_content = newVal?.content;
        const new_style = newVal?.style;
        // 内容
        article_list.value = new_content.article_list;
        article_type.value = new_content.article_style;
        is_show.value = new_content.is_show;
        is_img_show.value = new_content.is_img_show;
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
        article_style.value = content_radius.value + content_spacing.value;
        if (article_type.value == '0') {
            article_style.value += content_padding.value;
        }
        if (article_type.value == '1') {
            article_spacing_children.value = `width: calc(50% - ${new_style.article_spacing / 2}px);`;
            article_style.value += article_spacing_children.value;
        }
        if (article_type.value == '3') {
            article_item_width.value = `${new_style.article_width}px`;
        }
        if (new_style.common_style && props.isCommonStyle) {
            style_container.value = common_styles_computer(new_style.common_style);
        }
    },
    { immediate: true, deep: true }
);
const article_type_class = computed(() => {
    // article_type == '1' ? '' : article_type == '0' ? '' : ''
    switch (article_type.value) {
        case '0':
            return 'style2 flex-col';
        case '1':
            return 'style1 flex-row flex-wrap';
        case '2':
            return 'style3 flex-col';
        case '3':
            return 'style4 flex-row';
    }
    return `style${article_type.value}`;
});
</script>
<style lang="scss" scoped>
.style1 {
    .item {
        width: calc(50% - 0.5rem);
    }
}
.style2 {
    .item {
        width: 100%;
        .img {
            width: 11rem;
            height: 8.3rem;
        }
    }
}
.style3 {
    .item {
        width: 100%;
    }
}
.style4 {
    .item {
        min-width: v-bind(article_item_width);
    }
}
</style>
