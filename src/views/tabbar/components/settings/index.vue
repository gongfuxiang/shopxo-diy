<template>
    <!-- 顶部导航栏 -->
    <div class="settings">
        <div class="settings-title flex-row jc-c align-c mb-8 w">
            <el-radio-group v-model="radio" class="radio-group" size="large" is-button>
                <el-radio-button class="radio-item" value="1">内容</el-radio-button>
                <el-radio-button class="radio-item" value="2">样式</el-radio-button>
            </el-radio-group>
        </div>
        <div class="box-shadow-sm">
            <div class="setting-content">
                <!-- 底部导航 -->
                <footer-nav-setting :type="radio" :value="value" :config="footer_config" :footer-dialog-position-top="footerDialogPositionTop"></footer-nav-setting>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
    footerDialogPositionTop: {
        type: Number,
        default: 0,
    },
});
const radio = ref('1'); // 创建一个响应式的数字变量，初始值为0
const footer_config = {
    // 是否开启同步
    sync_bool: false,
};
</script>
<style lang="scss" scoped>
.settings {
    width: 46rem;
    display: flex;
    flex-direction: column;
    .settings-title {
        height: 7.8rem;
        padding: 2.1rem 3.8rem;
        .title {
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }
        .radio-group {
            background: #f4f4f4;
            border-radius: 100rem;
            width: 100%;
            .el-radio-button {
                overflow: hidden;
                width: 50%;
                border-radius: 100rem;
                :deep(.el-radio-button__inner) {
                    border: 0;
                    width: 100%;
                    background: #f4f4f4;
                }
                :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
                    background: $cr-primary;
                }
            }
        }
    }
    .setting-content {
        height: calc(100vh - 14.8rem);
        overflow: auto;
        background-color: #fff;
    }
}
@media screen and (max-width: 1560px) {
    .settings {
        width: 40rem;
    }
}
</style>
