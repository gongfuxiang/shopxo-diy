<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="80">
            <card-container>
                <div class="mb-12">图片样式</div>
                <el-form-item label="圆角">
                    <radius :value="form" @update:value="radius_change"></radius>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <template v-if="display_style_show">
                <card-container>
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="自动轮播">
                        <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                    </el-form-item>
                    <el-form-item v-if="form.is_roll == '1'" label="间隔时间">
                        <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                    </el-form-item>
                </card-container>
                <div class="divider-line"></div>
                <card-container>
                    <carousel-indicator :value="form"></carousel-indicator>
                </card-container>
                <div class="divider-line"></div>
            </template>
            <card-container>
                <div class="mb-12">标题样式</div>
                <el-form-item label="标题颜色">
                    <color-picker v-model="form.title_color" default-color="#000000"></color-picker>
                </el-form-item>
                <el-form-item label="标题字号">
                    <slider v-model="form.title_size" :max="100"></slider>
                </el-form-item>
            </card-container>
        </el-form>
        <div class="divider-line"></div>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { omit, isEmpty, pick } from 'lodash';
interface Props {
    value: nav_group_styles;
    content: nav_group_content;
}
const props = withDefaults(defineProps<Props>(), {
    value: () => ({
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        is_show: '1',
        is_roll: '1',
        interval_time: 2,
        indicator_style: 'dot',
        indicator_location: 'center',
        indicator_size: 5,
        indicator_radius: {
            radius: 0,
            radius_top_left: 0,
            radius_top_right: 0,
            radius_bottom_left: 0,
            radius_bottom_right: 0,
        },
        actived_color: '#2A94FF',
        color: '#DDDDDD',
        title_color: '#000',
        title_size: 12,
        common_style: {},
    }),
});

const state = reactive({
    form: props.value,
    content: props.content,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

// 图片圆角
const radius_change = (radius: nav_group_styles) => {
    form.value = Object.assign(form.value, pick(radius, ['radius', 'radius_top_left', 'radius_top_right', 'radius_bottom_left', 'radius_bottom_right']));
};
// 通用样式处理
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};

// 是否显示指示器设置
const display_style_show = computed(() => {
    const { content } = toRefs(state);
    if (!isEmpty(content.value)) {
        return content.value.display_style == 'slide';
    } else {
        return false;
    }
});
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
