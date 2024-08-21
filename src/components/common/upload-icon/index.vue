<template>
    <el-dialog v-model="dialogVisible" title="添加icon" :fullscreen="true" :close-on-press-escape="false" :close-on-click-modal="false" :append-to-body="false" :before-close="handleClose">
        <!-- <el-row :gutter="20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"></path></svg>
            <i v-for='item in icons' :key='item' :class="'fa fa-'+item"></i>
        </el-row> -->
    </el-dialog>
</template>
<script setup lang="ts">

interface Props {
    dialogVisible: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    dialogVisible: false,
});

const dialogVisible = ref(props.dialogVisible);

const handleClose = () => {
    dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.card.mb-8 {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>
