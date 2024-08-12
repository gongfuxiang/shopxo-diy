<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container class="common-content-height">
                <div class="mb-12">内容设置</div>
                <el-form-item label="上传照片">
                    <upload v-model="form.img" :limit="1" is-tips tips-text="请先选择照片，图片宽度750px，高度不限" @update:model-value="update_upload_data"></upload>
                </el-form-item>
                <hot v-model="form.hot"></hot>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({
            img: [],
            hot: {},
        }),
    },
});
const form = ref(props.value);

const update_upload_data = (val: any) => {
    if (val.length > 0) {
        form.value.hot.img = val[0].url;
    } else {
        form.value.hot.img = '';
    }
    form.value.hot.data = [];
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
}
</style>
