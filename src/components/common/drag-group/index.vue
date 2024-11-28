<template>
    <drag :data="drag_list" :space-col="20" :is-show-edit="true" @remove="remove" @on-sort="on_sort" @edit="edit" @replace="replace">
        <template #default="{ row, index }">
            <!-- 自定义模式，并且没有传递图片参数，就不显示图片，否则的话，显示图片 -->
            <template v-if="(type == 'custom' && !isEmpty(imgParams)) || type == 'other'">
                <upload v-model="row.new_cover" :limit="1" size="40" styles="2"></upload>
                <el-image :src="row.data[imgParams]" fit="contain" class="img radius-xs">
                    <template #error>
                        <div class="bg-f5 flex-row jc-c align-c radius-xs h w">
                            <icon name="error-img" size="16" color="9"></icon>
                        </div>
                    </template>
                </el-image>
            </template>
            <template v-if="index === edit_index">
                <el-input v-model="row.new_title" placeholder="请输入链接" type="textarea" class="flex-1 do-not-trigger" clearable :rows="2"></el-input>
            </template>
            <template v-else>
                <div class="flex-1 flex-width text-line-2 size-12 self-s do-not-trigger" @dblclick="double_click(index)">{{ !isEmpty(row.new_title) ? row.new_title : row.data[props.titleParams] }}</div>
            </template>
        </template>
    </drag>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash';

interface Props {
    list: any[];
    imgParams: string;
    titleParams?: string;
    type?: string;
}

const props = withDefaults(defineProps<Props>(), {
    imgParams: 'cover',
    titleParams: 'title',
    type: 'other'
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
    if ((!isEmpty(e.target.className) && !e.target.className.includes('do-not-trigger')) && (!isEmpty(e.target.parentNode.className) && !e.target.parentNode.className.includes('do-not-trigger'))) {
        edit_close_processing(edit_index.value);
        edit_index.value = -1;
    }
};
const emits = defineEmits(['remove', 'onsort', 'replace']);
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
        list.new_title = list.data[props.titleParams];
    }
};
//编辑关闭前的处理
const edit_close_processing = (index: number) => {
    const list = drag_list.value[index];
    if (!isEmpty(list) && !isEmpty(list.new_title) && list.new_title === list.data[props.titleParams]) {
        list.new_title = '';
    }
};

// 替换
const replace = (index: number) => {
    emits('replace', index);
};
</script>
<style lang="scss" scoped>
.img {
    width: 4rem;
    height: 4rem;
}
</style>
