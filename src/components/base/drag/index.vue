<template>
    <VueDraggable v-model="from" :animation="500" target=".sort-target" handle=".icon-drag" :scroll="true" :on-sort="on_sort">
        <TransitionGroup type="transition" tag="ul" name="fade" class="sort-target flex-col gap-x-20">
            <li v-for="(item, index) in from" :key="index" :class="[`flex gap-y-16 re ${ className }`,  props.modelType == 'nav-group' && modelIndex === index ? 'nav-index-select' : '']" @click="on_click(item, index)">
                <icon name="drag" size="16" class="cursor-move" />
                <slot :row="item" :index="index" />
                <div class="abs c-pointer top-de-6 right-de-6 remove-icon" @click.stop="remove(index)">
                    <icon v-if="type == 'card'" name="close-fillup" size="18" color="c" />
                </div>
                <div class="c-pointer do-not-trigger" @click.stop="remove(index)">
                    <icon v-if="type == 'line'" name="delete-o" size="18" color="6" />
                </div>
                <el-dropdown v-if="isShowEdit" placement="bottom">
                    <icon name="more-o" size="18" color="primary"></icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click.stop="edit(index)">编辑</el-dropdown-item>
                            <el-dropdown-item @click.stop="replace(index)">替换</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </li>
        </TransitionGroup>
    </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
const emits = defineEmits(['click', 'remove', 'edit', 'onSort', 'replace']);

interface Props {
    data: any; // 拖拽列表数据
    type?: string; // card: 卡片区域  line: 一行
    spaceCol?: number; // 上下间距
    iconPosition?: string; // top/bottom/center
    isShowEdit?: boolean;
    modelType?: string;
    modelIndex?: number;
}
const props = withDefaults(defineProps<Props>(), {
    type: () => 'line',
    isShowEdit: false,
    spaceCol: () => 5,
    iconPosition: 'center',
    modelType: 'outer',
    modelIndex: 0,
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

// 删除
const remove = (index: number) => {
    emits('remove', index);
};
// 编辑
const edit = (index: number) => {
    emits('edit', index);
};
// 替换
const replace = (index: number) => {
    emits('replace', index);
};
// 拖拽更新之后用户更新数据
const on_sort = () => {
    emits('onSort', from.value);
};
</script>
<style lang="scss" scoped>
.card-background {
    background: #fff;
    padding-left: 1.6rem;
    padding-right: 2rem;
    border-radius: 4px;
}

.cursor-move {
    color: #ddd;
    cursor: move;
}
.remove-icon {
    display: flex;
    background: #fff;
    border-radius: 100%;
    line-height: 1.8rem;
}
.nav-index-select {
    box-shadow: 0rem 0 0rem 0.1rem #409eff;
    /* border: 1px solid #409eff; */
}
</style>
