<template>
    <drag :data="drag_list" :space-col="20" :is-show-edit="true" @remove="remove" @on-sort="on_sort" @edit="edit">
        <template #default="{ row, index }">
            <upload v-model="row.new_cover" :limit="1" size="40" styles="2"></upload>
            <el-image :src="row.data[imgParams]" fit="contain" class="img">
                <template #error>
                    <div class="bg-f5 flex-row jc-c align-c radius h w">
                        <icon name="error-img" size="16" color="9"></icon>
                    </div>
                </template>
            </el-image>
            <template v-if="index === edit_index">
                <el-input v-model="row.new_title" placeholder="请输入链接" type="textarea" class="flex-1 do-not-trigger" clearable :rows="2"></el-input>
            </template>
            <template v-else>
                <div class="flex-1 flex-width text-line-2 size-12 self-s do-not-trigger" @dblclick="double_click(index)">{{ !isEmpty(row.new_title) ? row.new_title : row.data.title }}</div>
            </template>
        </template>
    </drag>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash';

interface Props {
    list: any[];
    imgParams: string;
}

const props = withDefaults(defineProps<Props>(), {
    imgParams: 'cover',
});

const drag_list = ref(props.list);
watchEffect(() => {
    drag_list.value = props.list;
});

onMounted(() => {
    // 监听点击事件
    document.addEventListener('click', outerClick);
});
onUnmounted(() => {
    // 移除监听事件
    document.removeEventListener('click', outerClick);
});
const edit_index = ref(-1);
// 判断点击的是否是可以点击的区域，其他区域隐藏掉编辑属性
const outerClick = (e: any) => {
    if (!e.target.className.includes('do-not-trigger') && !e.target.parentNode.className.includes('do-not-trigger')) {
        edit_close_processing(edit_index.value);
        edit_index.value = -1;
    }
};
const emits = defineEmits(['remove', 'onsort']);
const remove = (index: number) => {
    if (edit_index.value === index) {
        edit_close_processing(index);
        edit_index.value = -1;
    }
    emits('remove', index);
};
const on_sort = (item: any) => {
    emits('onsort', item);
};
const edit = (index: number) => {
    if (edit_index.value === index) {
        edit_close_processing(index);
        edit_index.value = -1;
    } else {
        edit_index.value = index;
        edit_processing(index);
    }
};

const double_click = (index: number) => {
    edit_index.value = index;
    edit_processing(index);
};
// 编辑时的数据处理
const edit_processing = (index: number) => {
    const list = drag_list.value[index];
    if (!isEmpty(list) && isEmpty(list.new_title)) {
        list.new_title = list.data.title;
    }
};
//编辑关闭前的处理
const edit_close_processing = (index: number) => {
    const list = drag_list.value[index];
    if (!isEmpty(list) && !isEmpty(list.new_title) && list.new_title === list.data.title) {
        list.new_title = '';
    }
};
</script>
<style lang="scss" scoped>
.img {
    width: 4rem;
    height: 4rem;
}
</style>
