<template>
    <!-- 顶部导航栏 -->
    <div class="settings">
        <card-container class="settings-title flex-row jc-sb align-c mb-8" padding="2.1rem 3.8rem">
            <div class="title">底部导航</div>
            <el-radio-group v-model="radio" class="radio-group" size="large" is-button>
                <el-radio-button class="radio-item" value="1">内容</el-radio-button>
                <el-radio-button class="radio-item" value="2">样式</el-radio-button>
            </el-radio-group>
        </card-container>
        <div class="setting-content">
            <!-- 底部导航 -->
            <footer-nav-setting :type="radio" :value="value"></footer-nav-setting>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
console.log(props.value);
const radio = ref('1'); // 创建一个响应式的数字变量，初始值为0
</script>
<style lang="scss" scoped>
.settings {
    width: 46rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .settings-title {
        height: 7.8rem;
        .title {
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }
        .radio-group {
            background: #f4f4f4;
            border-radius: 100rem;
            .el-radio-button {
                overflow: hidden;
                border-radius: 100rem;
                :deep(.el-radio-button__inner) {
                    border: 0;
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
