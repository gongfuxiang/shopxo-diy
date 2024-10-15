<template>
    <div class="common-content-height">
        <el-tabs v-model="tabs_name" class="content-tabs">
            <el-tab-pane label="选项卡" name="tabs">
                <model-tabs-content :value="form" :tab-style="styles"></model-tabs-content>
            </el-tab-pane>
            <el-tab-pane label="轮播" name="carousel">
                <model-carousel-content :value="form"></model-carousel-content>
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
    tabCarouselStyle: {
        type: Object,
        default: () => ({}),
    },
    tabsActive: {
        type: String,
        default: 'tabs',
    },
});

const state = reactive({
    form: props.value,
    styles: props.tabCarouselStyle,
});
const { form, styles } = toRefs(state);

const tabs_name = ref(props.tabsActive);
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
