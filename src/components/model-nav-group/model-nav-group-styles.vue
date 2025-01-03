<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="80">
            <card-container>
                <div class="mb-12">导航组</div>
                <el-form-item label="数据间距">
                    <slider v-model="form.space"></slider>
                </el-form-item>
                <el-form-item label="图文间距">
                    <slider v-model="form.title_space" :max="100"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">图片样式</div>
                <el-form-item label="图片圆角">
                    <radius :value="form"></radius>
                </el-form-item>
                <el-form-item label="图片大小">
                    <slider v-model="form.img_size" :max="100" :min="10"></slider>
                </el-form-item>
            </card-container>
            <div class="divider-line"></div>
            <template v-if="display_style_show">
                <card-container>
                    <div class="mb-12">轮播设置</div>
                    <el-form-item label="自动轮播">
                        <el-switch v-model="form.is_roll" active-value="1" inactive-value="0" />
                    </el-form-item>
                    <template v-if="form.is_roll == '1'">
                        <el-form-item label="间隔时间">
                            <slider v-model="form.interval_time" :min="1" :max="100"></slider>
                        </el-form-item>
                        <el-form-item v-if="data_content.row === 1" label="滚动方式">
                            <el-radio-group v-model="form.rolling_fashion">
                                <el-radio value="translation">平移</el-radio>
                                <el-radio value="cut-screen">切屏</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </template>
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
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">数据样式</div>
                <el-form-item label="内边距">
                    <padding :value="form.data_padding"></padding>
                </el-form-item>
            </card-container>
            <!-- 角标 -->
            <!-- <template v-if="is_show_subscript">
                <div class="divider-line"></div>
                <subscript-styles :value="form.subscript_style" :data="data_content" type="nav-group"></subscript-styles>
            </template> -->
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
        space: 0,
        img_size: 0,
        radius: 0,
        radius_top_left: 0,
        radius_top_right: 0,
        radius_bottom_left: 0,
        radius_bottom_right: 0,
        is_show: '1',
        is_roll: '1',
        rolling_fashion: 'translation',
        interval_time: 3,
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
        data_padding: {
            padding: 0,
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
        },
        actived_color: '#2A94FF',
        color: '#DDDDDD',
        title_color: '#000',
        title_size: 12,
        title_space: 10,
        subscript_style: {},
        common_style: {},
    }),
});

const state = reactive({
    form: props.value,
    data_content: props.content,
});
// 如果需要解构，确保使用toRefs
const { form, data_content } = toRefs(state);

// 通用样式处理
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};

// 是否显示指示器设置
const display_style_show = computed(() => {
    if (!isEmpty(data_content.value)) {
        return data_content.value.display_style == 'slide';
    } else {
        return false;
    }
});
</script>
<style lang="scss" scoped></style>
