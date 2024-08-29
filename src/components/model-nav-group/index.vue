<template>
    <div :style="style_container">
        <el-carousel :key="carouselKey" indicator-position="none" :interval="interval_time" arrow="never" :autoplay="is_roll" @change="carousel_change">
            <el-carousel-item v-for="(item, index) in nav_content_list" :key="index">
                <div ref="bannerImg" class="flex flex-wrap gap-x-10">
                    <div v-for="(item1, index1) in item.split_list" :key="index1" class="item flex-col gap-10 align-c">
                        <div v-if="['image_with_text', 'image'].includes(nav_style)" class="top-img flex align-c jc-c">
                            <image-empty v-model="item1.nav_image[0]" :style="img_style"></image-empty>
                        </div>
                        <p v-if="['image_with_text', 'text'].includes(nav_style)" class="size-12 ma-0" :style="text_style">{{ item1.title }}</p>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <div v-if="form.display_style == 'slide' && new_style.is_show" :style="{ 'justify-content': new_style?.indicator_location || 'center'}" class="dot flex mt-10 mb-4">
            <template v-if="new_style.indicator_style == 'num'">
                <div :style="indicator_style" class="dot-item">
                    <span class="num-active">{{ actived_index + 1 }}</span><span>/{{ nav_content_list.length }}</span>
                </div>
            </template>
            <template v-else>
                <div v-for="(item, index) in nav_content_list" :key="index" :style="indicator_style" :class="{'dot-item': true, 'active': actived_index == index }" />
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { common_styles_computer, radius_computer, get_math } from '@/utils';
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

// 用于样式显示
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
// 图片的设置
const img_style = computed(() => radius_computer(new_style.value));
// 标题的样式
const text_style = computed(() => `font-size: ${new_style.value.title_size || 12}px; color: ${new_style.value.title_color || '#000'};`);
// 指示器的样式
const indicator_style = computed(() => {
    let indicator_styles = '';
    if (!isEmpty(new_style.value.indicator_radius)) {
        indicator_styles += radius_computer(new_style.value.indicator_radius)
    }
    const size = new_style.value?.indicator_size || 5;
    if (new_style.value.indicator_style == 'num') {
        indicator_styles += `color: ${new_style.value?.color || '#DDDDDD'};`;
        indicator_styles += `font-size: ${size}px;`;
    } else if (new_style.value.indicator_style == 'elliptic') {
        indicator_styles += `background: ${new_style.value?.color || '#DDDDDD'};`;
        indicator_styles += `width: ${size * 3}px; height: ${size}px;`;
    } else {
        indicator_styles += `background: ${new_style.value?.color || '#DDDDDD'};`;
        indicator_styles += `width: ${size}px; height: ${size}px;`;
    }
    return indicator_styles;
});
// 获取轮播图片的节点
const bannerImg = ref();
// 轮播图自适应高度 
const newHeight = ref('100px');
// 轮播图定时显示
const interval_time = ref(2000);
// 轮播图是否滚动
const is_roll = ref(false);
// 轮播图key值
const carouselKey = ref('0');
// 轮播图滚动位置
const actived_index = ref(0);
// 轮播图显示样式
const actived_color = computed(() => new_style.value?.actived_color || '#2A94FF');
// 记录当前显示的轮播图的数据
const interval_list = ref({
    time: 2000,
    is_roll: false,
})

//监听屏幕缩放事件
onMounted(() => {
    window.onresize = () => {
        newHeight.value = bannerImg.value[0].clientHeight + 'px';
    }
});
// 每个导航所占位置
const group_width = computed(() => `${100 / (form.value.single_line || 4)}%`); 
// 是否显示文字和图片
const nav_style = computed(() => form.value?.nav_style || 'image_with_text');

const nav_content_list = computed(() => {
    // 深拷贝一下，确保不会出现问题
    const list = cloneDeep(form.value?.nav_content_list || Array(4));
    // 如果是分页滑动情况下，根据选择的行数和每行显示的个数来区分具体是显示多少个
    if (list.length > 0 && form.value?.display_style == 'slide') {
        // 存储数据显示
        let nav_list = [];
        // 每页显示的数量
        const num = (form.value?.single_line || 4) * (form.value?.row || 1);
        // 拆分的数量
        const split_num = Math.ceil(list.length / num);
        for (let i = 0; i < split_num; i++) {
            nav_list.push({ split_list: list.slice(i * num, (i + 1) * num) });
        }
        return nav_list;
    } else {
        // 否则的话，就返回全部的信息
        return [{ split_list: list }];
    }
})

// 内容参数的集合
watch(props.value, (val) => {
    const new_style = val.style;
    const form = val.content;
    //#region 轮播图设置
    const time = (new_style.interval_time || 2) * 1000;
    const display_is_roll = form.display_style == 'slide' ? new_style.is_roll || true : new_style.is_roll || false;
    // 判断跟历史的是否相等，不相等更新组件时间
    if (interval_list.value.time != time || interval_list.value.is_roll != display_is_roll) {
        // 滚动时间
        interval_time.value = time;
        // 是否滚动
        is_roll.value = display_is_roll;
        // 记录历史保存的时间
        interval_list.value = {
            time: time,
            is_roll: display_is_roll,
        };
        // 更新轮播图的key，确保更换时能重新更新轮播图
        carouselKey.value = get_math();
    }
    nextTick(() => {
        if (!isEmpty(bannerImg.value)) {
            newHeight.value = (bannerImg.value[0]?.clientHeight || 100) + 'px';
        }
    });
    //#endregion
}, {immediate: true, deep: true});

const carousel_change = (index: number) => {
    actived_index.value = index;
}
</script>
<style lang="scss" scoped>
.top-img {
    height: 5rem;
    width: 5rem;
    border-radius: 4px;
    :deep(.image-slot) {
        height: 5rem;
        width: 5rem;
        img {
            width: 3.5rem;
            height: 3.5rem
        }
    }
}
.flex-wrap .item {
    width: v-bind(group_width);
}
.dot {
    .dot-item {
        margin: 0 0.3rem;
        &.active {
            background: v-bind(actived_color) !important;
        }
        .num-active {
            color: v-bind(actived_color) !important;
        }
    }
}

:deep(.el-carousel) {
    .el-carousel__container {
        height: v-bind(newHeight);
    }
}
</style>
