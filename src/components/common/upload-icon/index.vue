<template>
    <el-dialog v-model="dialogVisible" title="icon选择" :close-on-press-escape="false" width="70%" :close-on-click-modal="false" :append-to-body="false" :before-close="handleClose">
        <div class="mt-20 icon-dialog">
            <div class="flex jc-e"><el-input v-model="searchText" placeholder="请输入图标名称" class="search-text" clearable></el-input></div>
            <el-row v-if="icon_list.length > 0" class="icon-row mt-20" :gutter="20">
                <el-col v-for="item in icon_list" :key="item.unicode" :span="3">
                    <div class="icon-item" @click="search_icon_click(item.font_class)">
                        <i :class="`iconfont icon-${ item.font_class }`"></i>
                        <div class="text-line-1 size-14">{{ item.name }}</div>
                    </div>
                </el-col>
            </el-row>
            <div v-else>
                <no-data height="500px"></no-data>
            </div>
        </div>
    </el-dialog>
    <div class="search-icon re" :style="'height:' + upload_size + ';width:' + upload_size + ';'" @click="icon_click">
        <icon :name="!isEmpty(icon_class) ? icon_class : 'add'" :size="Number(size) / 2 + ''" color="c"></icon>
        <el-icon v-if="!isEmpty(icon_class)" class="iconfont icon-close-o size-16 abs cr-c top-de-5 right-de-5" @click.stop="remove_icon" />
    </div>
</template>
<script setup lang="ts">
import searchIcons from '@/assets/icons/iconfont.json';
import { isEmpty } from 'lodash';
interface Props {
    size: number;
}
const props = withDefaults(defineProps<Props>(), {
    size: 50,
});
const upload_size = computed(() => {
    const size = props.size.toString();
    return size.includes('%') ? size : size + 'px';
});
// 搜索
const searchText = ref('');
const icon_list = computed(() => searchIcons.glyphs.filter(item => item.name.includes(searchText.value)));
// 弹出框操作
const dialogVisible = ref(false);
const handleClose = () => {
    dialogVisible.value = false;
};
const icon_click = () => {
    dialogVisible.value = true;
};
const icon_class = defineModel('icon_class', { type: String, default: '' });
const search_icon_click = (item: any) => {
    icon_class.value = item;
    handleClose();
};
const remove_icon = () => {
    icon_class.value = '';
}
</script>

<style lang="scss" scoped>
.icon-dialog {
    height: 57rem;
    .search-text {
        width: 15rem;
    }
    .icon-row {
        max-height: 50rem;
        overflow: auto;
        .icon-item {
            border: 1px solid #ccc;
            text-align: center;
            border-radius: 4px;
            padding: 1rem;
            margin-bottom: 2rem; 
            cursor: pointer;
            .iconfont {
                font-size: 3.6rem;
                height: 3.6rem;
            }
        }
        .icon-item:hover {
            border: 1px solid $cr-main;
        }
        .text-line-1 {
            line-height: 2rem;
        }
    }
}
.search-icon{
    position: relative;
    background: #fafcff;
    border-radius: 0.2rem;
    border: 0.1rem dashed #d7eeff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
