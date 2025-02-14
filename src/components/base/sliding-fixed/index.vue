<template>
    <el-form-item label="滑动固定" class="w mb-10">
        <div class="flex-row w h">
            <el-switch v-model="is_sliding_fixed" class="mr-10" active-value="1" inactive-value="0" @change="sliding_fixed_change" />
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="<span>1. 选项卡背景建议设置单纯色、多色或图片会造成背景不吻合。<br/> 2. 仅支持一个选项卡数据固定、开启后其他项将自动关闭。<br/>3.元素滑动到最左侧的时候固定。</span>" raw-content placement="top">
                <icon name="miaosha-hdgz" size="12" color="#999"></icon>
            </el-tooltip>
        </div>
    </el-form-item>
</template>

<script lang="ts" setup>
const is_sliding_fixed = defineModel({ type: String, default: '0' });
const emit = defineEmits(['sliding_fixed_change']);
const sliding_fixed_change = (val: string | number | boolean) => {
    emit('sliding_fixed_change', val);
};
</script>