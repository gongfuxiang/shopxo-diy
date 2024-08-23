<template>
    <el-config-provider :locale="zhCn">
        <router-view />
    </el-config-provider>
</template>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
// 中文
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// 英文
import en from 'element-plus/es/locale/lang/en';
</script>
<style scoped lang="scss"></style>
