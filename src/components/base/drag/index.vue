<template>
    <VueDraggable v-model="from" :animation="500" target=".sort-target" handle=".icon-drag" :scroll="true" :on-sort="on_sort">
        <TransitionGroup type="transition" tag="ul" name="fade" class="sort-target flex-col gap-x-20">
            <li v-for="(item, index) in from" :key="item.id" :class="className" class="flex gap-y-16 re" @click="on_click(item, index)">
                <el-icon class="iconfont icon-drag size-16 cursor-move" />
                <slot :row="item" :index="index" />
                <el-icon v-if="isShowEdit" class="iconfont icon-commodity-edit size-16 cr-primary do-not-trigger two-click" @click="edit(index)" />
                <el-icon v-if="type == 'line'" class="iconfont icon-del-o size-16 do-not-trigger" @click="remove(index)" />
                <el-icon v-if="type == 'card'" class="iconfont icon-close-o size-16 abs cr-c top-de-5 right-de-5" @click="remove(index)" />
            </li>
        </TransitionGroup>
    </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
const emits = defineEmits(['click', 'remove', 'edit', 'onSort']);

interface Props {
    data: any; // 拖拽列表数据
    type?: string; // card: 卡片区域  line: 一行
    spaceCol?: number; // 上下间距
    iconPosition?: string; // top/bottom/center
    isShowEdit?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    type: () => 'line',
    isShowEdit: false,
    spaceCol: () => 5,
    iconPosition: 'center',
});
const className = ref('');
if (props.type == 'card') {
    className.value += `card-background box-shadow-sm pt-${props.spaceCol} pb-${props.spaceCol}`;
    if (props.iconPosition == 'top') {
        className.value += '';
    } else if (props.iconPosition == 'bottom') {
        className.value += ' align-e';
    } else {
        className.value += ' align-c';
    }
} else {
    // 不是卡片类型的设置居中显示
    className.value = 'align-c';
}
watch(
    () => props.data,
    () => {
        from.value = props.data;
    }
);
const from = ref(props.data);

const on_click = (item: any, index: number) => {
    emits('click', item, index);
};

const remove = (index: number) => {
    emits('remove', index);
};
const edit = (index: number) => {
    emits('edit', index);
};
// 拖拽更新之后用户更新数据
const on_sort = () => {
    emits('onSort', from.value);
};
</script>
<style scoped>
.card-background {
    background: #fff;
    padding-left: 1.6rem;
    padding-right: 2rem;
}
.size-16 {
    font-size: 1.6rem !important;
}
.icon-del-o,
.icon-commodity-edit {
    cursor: pointer;
}
.cursor-move {
    color: #ddd;
    cursor: move;
}
</style>
