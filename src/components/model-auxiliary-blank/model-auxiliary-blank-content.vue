<template>
    <div class="auxiliary-line">
        <el-form :model="form" label-width="70" @submit.prevent>
            <common-content-top :value="form.content_top"></common-content-top>
            <div class="divider-line"></div>
            <card-container>
                <div class="mb-12">高度设置</div>
                <el-form-item label-width="0">
                    <slider v-model="form.height" :max="200"></slider>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Object,
        default: () => ({ height: 50 }),
    },
});
const form = ref(props.value);
</script>
<style lang="scss" scoped>
.auxiliary-line {
    width: 100%;
}
</style>
