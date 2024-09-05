<template>
    <div class="auxiliary-line">
        <el-form :model="state" label-width="70" @submit.prevent>
            <card-container>
                <div class="mb-12">高度设置</div>
                <el-form-item label-width="0">
                    <slider v-model="state.height" :max="1000"></slider>
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
const state = ref(props.value);
</script>
<style lang="scss" scoped>
.auxiliary-line {
    width: 100%;
}
</style>
