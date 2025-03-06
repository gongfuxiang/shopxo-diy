<template>
    <card-container class="card-container">
        <el-form-item label="背景">
            <mult-color-picker :value="form.color_list" :type="form.direction" @update:value="mult_color_picker_event"></mult-color-picker>
        </el-form-item>
        <el-form-item label="大小">
            <template v-if="type == 'text' || (type == 'img-icon' && isIcon)">
                <color-text-size-group v-model:color="form.color" v-model:size="form.size" :default-color="form.color" :slider-name="type == 'text' ? '字号' : '大小'" :type-list="['color', 'size']"></color-text-size-group>
            </template>
            <template v-else>
                <div class="flex-col w gap-10">
                    <el-form-item label="宽度" label-width="40" class="form-item-child-label">
                        <slider v-model="form.img_width" :max="1000"></slider>
                    </el-form-item>
                    <el-form-item label="高度" label-width="40" class="form-item-child-label">
                        <slider v-model="form.img_height" :max="1000"></slider>
                    </el-form-item>
                </div>
            </template>
        </el-form-item>
        <el-form-item label="内间距">
            <padding :value="form"></padding>
        </el-form-item>
        <el-form-item label="内容圆角">
            <radius :value="form"></radius>
        </el-form-item>
    </card-container>
</template>

<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    type: {
        type: String,
        default: '',
    },
    isIcon: {
        type: Boolean,
        default: false,
    }
});
const form = ref(props.value);
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.value.color_list = arry;
    form.value.direction = type;
};
// 监听数据变化
watch(() => props.value, (new_value) => {
    form.value = new_value;
}, { deep: true, immediate: true });
</script>

<style scoped lang="scss">
.card-container {
    padding: 0 !important;
}
</style>