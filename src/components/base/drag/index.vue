<template>
    <VueDraggable v-model="from" :animation="500" target=".sort-target" handle=".icon-drag" :scroll="true" :on-sort="on_sort">
        <TransitionGroup type="transition" tag="ul" name="fade" class="sort-target flex-col gap-x-20">
            <li v-for="(item, index) in from" :key="index" :class="[`flex-row re gap-16 ${ className }`,  ['nav-group', 'tabs-magic', 'tabs'].includes(props.modelType) && modelIndex === index ? 'model-type-index-select' : '']" @click="on_click(item, index)">
                <div class="flex-1 flex-row gap-16">
                    <icon name="drag" size="16" class="cursor-move" />
                    <slot :row="item" :index="index" />
                </div>
                <!-- 底部第一个不显示删除按钮 -->
                <template v-if="!multipleIcons">
                    <div v-if="!(props.modelType === 'footer' && index === 0)" class="abs c-pointer top-de-6 right-de-6 remove-icon" @click.stop="remove(index)">
                        <icon v-if="type == 'card'" name="close-fillup" size="18" color="c" />
                    </div>
                </template>
                <template v-else>
                    <div class="abs top-0 right-0">
                        <div class="w h multiple-icon-class">
                            <div class="c-pointer multiple-icon" @click.stop="copy(index)">
                                <icon v-if="type == 'card'" name="copy" size="18" color="c" />
                            </div>
                            <div v-if="!(props.modelType === 'footer' && index === 0)" class="c-pointer multiple-icon" @click.stop="remove(index)">
                                <icon v-if="type == 'card'" name="close-fillup" size="18" color="c" />
                            </div>
                        </div>
                    </div>
                </template>
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
const emits = defineEmits(['click', 'remove', 'edit', 'onSort', 'replace', 'copy']);

interface Props {
    data: any; // 拖拽列表数据
    type?: string; // card: 卡片区域  line: 一行
    spaceCol?: number; // 上下间距
    iconPosition?: string; // top/bottom/center
    isShowEdit?: boolean;
    modelType?: string;
    modelIndex?: number;
    multipleIcons?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    type: () => 'line',
    isShowEdit: false,
    spaceCol: () => 5,
    iconPosition: 'center',
    modelType: 'outer',
    modelIndex: 0,
    multipleIcons: false,
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
// 复制
const copy = (index: number) => {
    emits('copy', index);
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
.multiple-icon-class {
    padding: 0.5rem 1rem;
    background: #f7f7f7;
    border-bottom-left-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
.multiple-icon {
    display: flex;
    border-radius: 100%;
    line-height: 1.8rem;
}
</style>
