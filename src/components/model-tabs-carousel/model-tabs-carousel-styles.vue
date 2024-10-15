<template>
    <div class="w">
        {{ tabs_name }}
        <el-tabs v-model="tabs_name" class="content-tabs">
            <el-tab-pane label="选项卡" name="tabs">
                <model-tabs-styles :value="form" :tabs-style="tabsStyle" :is-common="false"></model-tabs-styles>
            </el-tab-pane>
            <el-tab-pane label="轮播" name="carousel">
                <model-carousel-styles :value="form" :content="new_content" :is-common="false"></model-carousel-styles>
            </el-tab-pane>
            <el-tab-pane label="公共" name="common">
                <card-container>
                    <div class="mb-12">基础样式</div>
                    <el-form :model="form" label-width="74">
                        <el-form-item label="数据间距">
                            <slider v-model="form.data_spacing" :max="100"></slider>
                        </el-form-item>
                    </el-form>
                </card-container>
                <div class="divider-line"></div>
                <common-styles :value="form.common_style" :is-floating-up="false" @update:value="common_styles_update" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
    content: {
        type: Object,
        default: () => {},
    },
    tabsStyle: {
        type: String,
        default: () => {},
    },
    tabsActive: {
        type: String,
        default: 'tabs',
    },
});

const state = reactive({
    form: props.value,
    new_content: props.content,
});

const tabs_name = ref(props.tabsActive);
// 如果需要解构，确保使用toRefs
const { form, new_content } = toRefs(state);
const common_styles_update = (val: Object) => {
    form.value.common_style = val;
};
</script>
<style lang="scss" scoped>
:deep(.el-tabs.content-tabs) {
    .el-tabs__header.is-top {
        background: #fff;
        margin: 0;
        padding-top: 2rem;
    }
    .el-tabs__item.is-top {
        padding: 0;
        align-items: center;
        width: 10rem;
        font-size: 1.4rem;
    }
    .el-tabs__active-bar {
        width: 100%;
    }
}
</style>
