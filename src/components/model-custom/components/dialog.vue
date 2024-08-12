<template>
    <el-dialog v-model="dialogVisible" title="编辑自定义" :fullscreen="true" :close-on-press-escape="false" :close-on-click-modal="false" :append-to-body="false" :before-close="handleClose">
        <slot></slot>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" class="plr-28 ptb-10" @click="accomplish">完成</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
const dialogVisible = ref(false);

const handleClose = () => {
    dialogVisible.value = false;
};
const emits = defineEmits(['accomplish']);
const accomplish = () => {
    emits('accomplish');
    dialogVisible.value = false;
};

defineExpose({
    dialogVisible,
});
</script>

<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
