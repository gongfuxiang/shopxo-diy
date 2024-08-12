<template>
    <div class="common-style-height">
        <el-form :model="form" label-width="70">
            <card-container class="mb-8">
                <div class="mb-12">搜索框</div>
                <el-form-item label="文字位置">
                    <el-radio-group v-model="form.text_location" is-button>
                        <el-tooltip content="左对齐" placement="top" effect="light">
                            <el-radio-button value="left"><icon name="iconfont icon-left"></icon></el-radio-button>
                        </el-tooltip>
                        <el-tooltip content="居中" placement="top" effect="light">
                            <el-radio-button value="center"><icon name="iconfont icon-center"></icon></el-radio-button>
                        </el-tooltip>
                        <el-tooltip content="右对齐" placement="top" effect="light">
                            <el-radio-button value="right"><icon name="iconfont icon-right"></icon></el-radio-button>
                        </el-tooltip>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="搜索框">
                    <color-picker v-model="form.search_border"></color-picker>
                </el-form-item>
                <el-form-item label="提示文字">
                    <color-picker v-model="form.tips_color"></color-picker>
                </el-form-item>
                <el-form-item label="热词文字">
                    <color-picker v-model="form.hot_words_color"></color-picker>
                </el-form-item>
            </card-container>
            <card-container v-if="text_show()" class="mb-8">
                <div class="mb-12">文字设置</div>
                <el-form-item label="文字样式">
                    <el-radio-group v-model="form.text_style" class="ml-4">
                        <el-radio value="normal">正常</el-radio>
                        <el-radio value="italic">倾斜</el-radio>
                        <el-radio value="500">加粗</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文字颜色">
                    <color-picker v-model="form.text_color"></color-picker>
                </el-form-item>
                <el-form-item label="文字大小">
                    <slider v-model="form.text_size" :max="100"></slider>
                </el-form-item>
            </card-container>
        </el-form>
        <common-styles :value="form.common_style" @update:value="common_styles_update" />
    </div>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash';
interface Props {
    value: search_styles;
    content: search_content;
}
const props = withDefaults(defineProps<Props>(), {
    value: () => ({
        search_border: '#F5F5F5',
        tips_color: '#CCCCCC',
        hot_words_color: '#000',
        text_location: 'left',
        text_style: 'normal',
        text_color: '#000',
        text_size: 15,
        common_style: {},
    }),
});

const state = reactive({
    form: props.value,
    content: props.content,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

// 监听整个form对象,发生变化的时候触发emit
const emit = defineEmits(['update:value']);

const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};

// 是否显示文字设置
const text_show = () => {
    const { content } = toRefs(state);
    if (!isEmpty(content.value)) {
        return (content.value.style_radio == 'search' && content.value.style_type == 'title') || content.value.style_radio == 'title' || (content.value.style_radio == 'search' && content.value.style_type == 'location') || content.value.style_radio == 'location';
    } else {
        return true;
    }
};
</script>
<style lang="scss" scoped>
.auxiliary-line {
    width: 100%;
}
</style>
