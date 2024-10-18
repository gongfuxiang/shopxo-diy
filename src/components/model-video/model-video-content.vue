<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container>
                <div class="mb-12">内容设置</div>
                <el-form-item label="上传视频">
                    <upload v-model="form.video" :limit="1" type="video"></upload>
                </el-form-item>
                <el-form-item label="视频封面">
                    <upload v-model="form.video_img" :limit="1"></upload>
                </el-form-item>
                <el-form-item label="视频比例">
                    <el-radio-group v-model="form.video_ratio">
                        <el-radio value="16:9">16:9</el-radio>
                        <el-radio value="4:3">4:3</el-radio>
                        <el-radio value="1:1">1:1</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 视频 （内容）
 * @param value{Object} 内容数据
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({
            video: [],
            video_img: [],
            video_ratio: '16:9',
        }),
    },
});
const form = reactive(props.value);
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
}
</style>
