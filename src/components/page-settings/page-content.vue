<template>
    <div class="auxiliary-line">
        <el-form :model="form" label-width="70">
            <card-container class="common-content-height">
                <el-form-item label="页面标题">
                    <el-input v-model="form.title" placeholder="选填不超过30个字" />
                </el-form-item>
                <el-form-item label="背景设置">
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
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
interface Props {
    value: page_content
}
const props = defineProps<Props>();

const form = reactive(props.value);
const mult_color_picker_event = (arry: color_list[], type: number) => {
    form.color_list = arry;
    form.direction = type.toString();
};
</script>
<style lang="scss" scoped>
.auxiliary-line {
    width: 100%;
    height: 100%;
}
</style>
