<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <template v-if="!isNest">
                <common-content-top :value="form.content_top"></common-content-top>
                <div class="divider-line"></div>
            </template>
            <card-container class="card-container">
                <div class="mb-12">内容设置</div>
                <el-form-item label="上传照片">
                    <upload v-model="form.img" :limit="1" is-tips tips-text="请先选择照片，图片宽度750px，高度不限" @update:model-value="update_upload_data"></upload>
                </el-form-item>
                <hot v-model="form.hot" v-model:img="form.img"></hot>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 热曲（内容）
 * @param value{Object} 内容数据
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({
            img: [],
            hot: {},
        }),
    },
    isNest: {
        type: Boolean,
        default: false,
    },
});
const form = ref(props.value);
// 监听图片上传
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
