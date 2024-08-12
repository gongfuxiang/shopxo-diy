<template>
    <el-dialog v-model="dialog_visible_category_oprate" class="radius-lg" width="1168" append-to-body>
        <template #header>
            <div class="title center re">
                <div class="tc size-16 fw">添加分类</div>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
const dialog_visible_category_oprate = ref(false);
</script>
<style lang="scss"></style>
