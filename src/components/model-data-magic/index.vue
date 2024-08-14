<template>
    <div ref="container" class="img-magic" :style="style_container">
        <div class="w h re outer-style">
            <!-- 风格9 -->
            <template v-if="form.style_actived == 8">
                <div class="flex-row align-c jc-c style-size flex-wrap">
                    <div v-for="(item, index) in form.data_magic_list" :key="index" :class="['img-spacing-border', { 'style9-top': [0, 1].includes(index), 'style9-bottom': ![0, 1].includes(index) }]">
                        <!-- <image-empty v-model="item.img[0]" :style="content_img_radius"></image-empty> -->
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="(item, index) in form.data_magic_list" :key="index" class="cube-selected img-spacing-border" :style="`${selected_style(item)} ${ item.data_style.background_style }`">
                    <el-carousel :key="item.data_style.carouselKey" indicator-position="none" :height="`${ getSelectedHeight(item) }px`" :interval="item.data_style.interval_time * 1000" arrow="never" :autoplay="item.data_style.is_roll" @change="carousel_change($event, index)">
                        <el-carousel-item v-for="(item2, index) in item.data_content.product_list" :key="index">
                            {{ item2 }}
                            {{ item.actived_index }}
                        </el-carousel-item>
                    </el-carousel>
                    <div v-if="item.data_style.is_show" :class="{'dot-center': item.data_style?.indicator_location == 'center', 'dot-right': item.data_style?.indicator_location == 'flex-end' }" class="dot flex abs">
                        <template v-if="item.data_style.indicator_style == 'num'">
                            <div :style="item.data_style.indicator_styles" class="dot-item">
                                <span class="num-active" :style="`color: ${ item.data_style.actived_color }`">{{ item.actived_index + 1 }}</span><span>/{{ item.data_content.product_list.length }}</span>
                            </div>
                        </template>
                        <template v-else>
                            <div v-for="(item3, index2) in item.data_content.product_list" :key="index2" :style="`${ item.data_style.indicator_styles }; ${ style_actived_color(item, index2)}`" class="dot-item" />
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { background_computer, common_styles_computer, get_math, gradient_computer, percentage_count, radius_computer } from '@/utils';
import { isEmpty } from 'lodash';
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
// const data_list = computed(() => form.value.data_magic_list);
const outer_spacing = computed(() => new_style.value.image_spacing + 'px');
const outer_sx = computed(() => -(new_style.value.image_spacing / 2) + 'px');
// 图片间距设置
const spacing = computed(() => new_style.value.image_spacing / 2 + 'px');
// 图片圆角设置
const content_img_radius = computed(() => radius_computer(new_style.value));
//#region 容器大小计算
const div_width = ref(0);
const container_size = computed(() => div_width.value + 'px');
const container = ref<HTMLElement | null>(null);
onMounted(() => {
    if (container.value) {
        div_width.value = container.value.clientWidth;
    }
});
//#endregion
//#region 图片位置计算
//计算选中层的宽度。
interface CubeItem {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
}
const density = ref('4');
//单元魔方宽度。
const cubeCellWidth = computed(() => div_width.value / parseInt(density.value));
//单元魔方高度。
const cubeCellHeight = computed(() => div_width.value / parseInt(density.value));
const getSelectedWidth = (item: CubeItem) => {
    return (item.end.x - item.start.x + 1) * cubeCellWidth.value;
};
//计算选中层的高度。
const getSelectedHeight = (item: CubeItem) => {
    return (item.end.y - item.start.y + 1) * cubeCellHeight.value;
};
//计算选中层的右边距离。
const getSelectedTop = (item: CubeItem) => {
    return (item.start.y - 1) * cubeCellHeight.value;
};
//计算选中层的左边距离。
const getSelectedLeft = (item: CubeItem) => {
    return (item.start.x - 1) * cubeCellWidth.value;
};
// 根据当前页面大小计算成百分比
const selected_style = (item: CubeItem) => {
    return `width: ${percentage(getSelectedWidth(item))}; height: ${percentage(getSelectedHeight(item))}; top: ${percentage(getSelectedTop(item))}; left: ${percentage(getSelectedLeft(item))};`;
};
// 计算成百分比
const percentage = (num: number) => {
    return percentage_count(num, div_width.value);
};
//#endregion
//#region 组装页面显示的数据
interface data_magic {
    start: object;
    end: object;
    actived_index: number;
    data_content: any;
    data_style: any;
}
const old_list = ref<any>({});
const data_magic_list = ref<data_magic[]>([]);
watch(props.value.content, (val) => {
    const data = val.data_magic_list;
    data.actived_index = 0;
    data.forEach((item: data_magic) => {
        const data_content = item.data_content;
        const data_style = item.data_style;
        const key = data_style.carouselKey;
        // 指示器样式
        data_style.indicator_styles = indicator_style(data_style);
        data_style.background_style = background_style(data_style);
        // 获取旧数据
        if (!isEmpty(old_list.value[key])) {
            let old_data = old_list.value[key];
            const { is_roll, rotation_direction, interval_time } = data_style;
            // 判断跟历史的是否相等，不相等更新组件时间
            if (old_data.interval_time != interval_time || old_data.is_roll != is_roll || old_data.rotation_direction != rotation_direction) {
                // 记录历史保存的时间
                old_data = {
                    interval_time: interval_time,
                    is_roll: is_roll,
                    rotation_direction: rotation_direction
                };
                // 更新轮播图的key，确保更换时能重新更新轮播图
                data_style.carouselKey = get_math();
            }
        }
    });
    data_magic_list.value = data;
})

const background_style = (item: any) => {
    return gradient_computer(item) + background_computer(item);
};
// 指示器的样式
const indicator_style = (item: any) => {
    let indicator_styles = '';
    if (!isEmpty(item.indicator_radius)) {
        indicator_styles += radius_computer(item.indicator_radius)
    }
    const size = item?.indicator_size || 5;
    if (item.indicator_style == 'num') {
        indicator_styles += `color: ${item?.color || '#DDDDDD'};`;
        indicator_styles += `font-size: ${size}px;`;
    } else if (item.indicator_style == 'elliptic') {
        indicator_styles += `background: ${item?.color || '#DDDDDD'};`;
        indicator_styles += `width: ${size * 3}px; height: ${size}px;`;
    } else {
        indicator_styles += `background: ${item?.color || '#DDDDDD'};`;
        indicator_styles += `width: ${size}px; height: ${size}px;`;
    }
    return indicator_styles;
};
const style_actived_color = (item: any, index: number) => {
   return item.actived_index == index ? `background: ${ item.data_style.actived_color };` : ''
}
//#endregion
const carousel_change = (index: number, key: number) => {
    if (data_magic_list.value[key]) {
        data_magic_list.value[key].actived_index = index;
    }
}
// 公共样式
const style_container = computed(() => common_styles_computer(new_style.value.common_style));
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
    padding: v-bind(spacing);
}

.style-size {
    height: 100%;
    width: 100%;
    .three {
        width: 33%;
        height: 100%;
        position: relative;
    }
    .style9-top {
        width: calc(50% - 0.2rem);
        height: 50%;
        position: relative;
    }
    .style9-bottom {
        width: calc(33% - 0.1rem);
        height: 50%;
        position: relative;
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
    z-index: 3;
    bottom: 6px;
    .dot-item {
        margin: 0 0.3rem;
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
</style>
