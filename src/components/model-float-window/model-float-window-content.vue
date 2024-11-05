<template>
    <div class="auxiliary-line">
        <el-form :model="form" label-width="70">
            <card-container>
                <div class="mb-12">按钮设置</div>
                <el-form-item label="按钮跳转">
                    <el-radio-group v-model="form.button_jump">
                        <el-radio value="link">页面链接</el-radio>
                        <el-radio value="customer_service">客服入口</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传图片">
                    <upload v-model="form.button_img" :limit="1" size="72"></upload>
                </el-form-item>
                <el-form-item v-if="form.button_jump == 'link'" label="链接">
                    <url-value v-model="form.button_link"></url-value>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => {},
    },
});

const state = reactive({
    form: props.value,
});
const { form } = toRefs(state);
</script>
<style lang="scss" scoped>
.tips {
    color: $cr-info-dark;
}
</style>
