<template>
    <div v-if="typeof index === 'number' && !isNaN(index)" class="acticons">
        <div class="plug-in-right" chosenClass="close">
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="删除组件" placement="right">
                <el-icon class="iconfont icon-del" @click.stop="del(index)" />
            </el-tooltip>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="复制组件" placement="right">
                <el-icon class="iconfont icon-copy" @click.stop="copy(index)" />
            </el-tooltip>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="前置一层" placement="right">
                <el-icon class="iconfont icon-arrow-top" @click.stop="previous_layer(index)" />
            </el-tooltip>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="后置一层" placement="right">
                <el-icon class="iconfont icon-arrow-bottom" @click.stop="underlying_layer(index)" />
            </el-tooltip>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="组件置顶" placement="right">
                <el-icon class="iconfont icon-top-up" @click.stop="top_up(index)" />
            </el-tooltip>
            <el-tooltip effect="dark" :show-after="200" :hide-after="200" content="组件置底" placement="right">
                <el-icon class="iconfont icon-bottom-up" @click.stop="bottom_up(index)" />
            </el-tooltip>
        </div>
    </div>
</template>
<script setup lang="ts">
const index = defineModel({ type: Number , default: null });
const emits = defineEmits(['del', 'copy', 'previous_layer', 'underlying_layer', 'top_up', 'bottom_up']);
// 删除
const del = (index: number) => {
    emits('del', index)
}
//复制组件
const copy = (index: number) => {
    emits('copy', index)
}
//前置一层
const previous_layer = (index: number) => {
    emits('previous_layer', index)
}
//后置一层
const underlying_layer = (index: number) => {
    emits('underlying_layer', index)
}
//组件置顶
const top_up = (index: number) => {
    emits('top_up', index)
}
//组件置底
const bottom_up = (index: number) => {
    emits('bottom_up', index)
}
</script>

<style scoped lang="scss">
.acticons {
    position: absolute;
    left: 50%;
    margin-left: 23rem;
    top: 50%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    z-index: 1;
    transform: translate(-50%, -50%);
}
.plug-in-right {
    cursor: default;
    background: $cr-main;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.2rem;
    color: #fff;
    border-radius: 0.4rem;
    z-index: 2;
    & > i {
        cursor: pointer;
    }
    & > i.disabled {
        color: #5db2ff;
        cursor: not-allowed;
    }
    & .icon-arrow-top,
    & .icon-arrow-bottom {
        height: 0.9rem;
    }
}
</style>