<template>
    <div class="auxiliary-line-content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container>
                <div class="mb-12">展示设置</div>
                <el-form-item label="线条样式">
                    <el-radio-group v-model="form.styles" @change="line_change">
                        <el-radio value="dashed">
                            <icon name="line-point" class="re top-2" size="32"></icon>
                        </el-radio>
                        <el-radio value="solid">
                            <icon name="line" class="re top-2" size="32"></icon>
                        </el-radio>
                        <el-radio value="dotted">
                            <icon name="line-point" class="re top-2" size="32"></icon>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
        </el-form>
    </div>
</template>
<script setup lang="ts">
/**
 * @description: 辅助线（内容）
 * @param value{Object} 内容数据
 */
const props = defineProps({
    value: {
        type: Object,
        default: () => ({ styles: 'solid' }),
    },
});
const form = reactive(props.value);
// 线条样式切换
const line_change = (val: any) => {
    form.styles = val;
};
</script>
<style lang="scss" scoped>
.auxiliary-line-content {
    width: 100%;
}
</style>
