<template>
    <card-container class="mb-8">
        <el-form-item label="底部背景">
            <div class="flex-col gap-10 w">
                <div class="size-12">背景色</div>
                <mult-color-picker :value="form.color_list" :type="form.direction" @update:value="mult_color_picker_event"></mult-color-picker>
                <div class="flex-row jc-sb align-c">
                    <div class="size-12">背景图</div>
                    <el-radio-group v-model="form.background_img_style" is-button>
                        <el-tooltip content="单张" placement="top" effect="light">
                            <el-radio-button value="0"><icon name="single-sheet"></icon></el-radio-button>
                        </el-tooltip>
                        <el-tooltip content="平铺" placement="top" effect="light">
                            <el-radio-button value="1"><icon name="tile"></icon></el-radio-button>
                        </el-tooltip>
                        <el-tooltip content="铺满" placement="top" effect="light">
                            <el-radio-button value="2"><icon name="spread-over"></icon></el-radio-button>
                        </el-tooltip>
                    </el-radio-group>
                </div>
                <upload v-model="form.background_img_url" :limit="1"></upload>
            </div>
        </el-form-item>
        <el-form-item label="自动轮播">
            <el-switch v-model="form.is_roll" size="large" />
        </el-form-item>
        <el-form-item label="轮播方向">
            <el-radio-group v-model="form.rotation_direction" class="ml-4">
                <el-radio value="horizontal">横向</el-radio>
                <el-radio value="vertical">纵向</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="间隔时间">
            <slider v-model="form.interval_time" :max="100"></slider>
        </el-form-item>
        <el-form-item label="主标题">
            <div class="flex-col gap-10 w">
                <color-picker v-model="form.heading_color" default-color="#000000"></color-picker>
                <text-size-type v-model:typeface="form.heading_typeface" v-model:size="form.heading_size"></text-size-type>
            </div>
        </el-form-item>
        <el-form-item label="副标题">
            <div class="flex-col gap-10 w">
                <color-picker v-model="form.subtitle_color" default-color="#000000"></color-picker>
                <text-size-type v-model:typeface="form.subtitle_typeface" v-model:size="form.subtitle_size"></text-size-type>
            </div>
        </el-form-item>
    </card-container>
    <card-container class="mb-8">
        <carousel-indicator :value="form"></carousel-indicator>
    </card-container>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    }
});

// 默认值
const state = reactive({
    form: props.value
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const mult_color_picker_event = (arry: string[], type: number) => {
    form.value.user_id_color_list = arry;
    form.value.user_id_direction = type.toString();
};
</script>
<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
