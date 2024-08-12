<template>
    <div class="model-top">
        <div class="roll">
            <div class="pt-15 pb-10 pl-25 pr-25 w">
                <img class="img" src="@/assets/images/layout/main/main-top.png" />
            </div>
            <div :class="['model-head', ' tc', { 'page-settings-border': showPage }]" @click="page_settings">
                {{ props.pageData.com_data?.content?.title || '新建页面' }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
interface Props {
    pageData: any;
    showPage: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    pageData: () => ({}),
    showPage: true,
});
const emits = defineEmits(['page_settings']);
const page_settings = () => {
    emits('page_settings');
};
</script>
<style lang="scss" scoped>
.model-top {
    .roll {
        width: 39rem;
        background: #fff;
        margin: 0 auto;
        // border-bottom: 0.1rem solid #f5f5f5;
    }
    .img {
        width: 34rem;
    }
}
.model-head {
    height: 4.3rem;
    padding: 1.1rem 0;
    cursor: pointer;
}
.page-settings-border {
    // border: 0.2rem solid $cr-main;
    position: relative;
    box-shadow: 0px 0 0px 0.2rem $cr-main;
    z-index: 1;
    box-sizing: border-box;
}
</style>
