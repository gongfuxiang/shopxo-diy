<template>
    <el-form-item :label="`边${ type == 'frame' ? '框' : '线'}`">
        <el-switch v-model="border_show" active-value="1" inactive-value="0" @change="operation_end" />
    </el-form-item>
    <template v-if="border_show == '1'">
        <el-form-item v-if="typeList.includes('color')" :label="`边${ type == 'frame' ? '框' : '线'}颜色`">
            <color-picker v-model="border_color" :default-color="defaultColor" @operation_end="operation_end"></color-picker>
        </el-form-item>
        <el-form-item v-if="typeList.includes('style')" :label="`边${ type == 'frame' ? '框' : '线'}样式`">
            <el-radio-group v-model="border_style" @change="operation_end">
                <template v-if="type == 'frame'">
                    <el-radio value="dashed"><div class="border-style-item" style="border: 1px dashed #979797"></div></el-radio>
                    <el-radio value="solid"><div class="border-style-item" style="border: 1px solid #979797"></div></el-radio>
                    <el-radio value="dotted"><div class="border-style-item" style="border: 1px dotted #979797"></div></el-radio>
                </template>
                <template v-else>
                    <el-radio value="dashed"><icon name="line-point" class="re top-2" size="32"></icon></el-radio>
                    <el-radio value="solid"><icon name="line" class="re top-2" size="32"></icon></el-radio>
                    <el-radio value="dotted"><icon name="line-point" class="re top-2" size="32"></icon></el-radio>
                </template>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="typeList.includes('size')" :label="`边${ type == 'frame' ? '框' : '线'}粗细`">
            <template v-if="type == 'frame'">
                <padding :value="border_size" :max="100" @operation_end="operation_end"></padding>
            </template>
            <template v-else>
                <slider v-model="border_line_size" :max="100" @operation_end="operation_end"></slider>
            </template>
        </el-form-item>
        <!-- 额外的使用内容 -->
        <slot></slot>
    </template>
</template>

<script setup lang="ts">
interface Props {
    defaultColor?: string;
    typeList?: string[]; // 默认显示3个，传递了之后按照传递的显示
    type?: string;
}
const props = withDefaults(defineProps<Props>(), {
    defaultColor: '',
    type: 'frame',
    typeList: () => ['color', 'style', 'size'],
});
const border_show = defineModel('show', {
    type: String,
    default: '0',
});
const border_color = defineModel('color', {
    type: String,
    default: '#FF3F3F',
});
const border_style = defineModel('style', {
    type: String,
    default: 'solid',
});

const border_size = defineModel('size', {
    type: Object,
    default: {
        padding: 0,
        padding_top: 0,
        padding_bottom: 0,
        padding_left: 0,
        padding_right: 0,
    },
});

const border_line_size = defineModel('lineSize', {
    type: Number,
    default: 0,
});
const emit = defineEmits(['operation_end']);
// 失去焦点时触发事件
const operation_end = () => {
    emit('operation_end');
};
</script>

<style lang="scss" scoped>
.border-style-item {
    width: 3rem;
    height: 2rem;
}
</style>
