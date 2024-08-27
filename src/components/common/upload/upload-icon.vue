<template>
    <div class="container">
        <div class="flex jc-e">
            <el-input v-model="searchText" placeholder="请输入图标名称" class="search-text" clearable>
                <template #prefix>
                    <icon name="search" size="18" class="c-pointer"></icon>
                </template>
            </el-input>
        </div>
        <el-scrollbar height="440px">
            <el-row v-if="icon_list.length > 0" class="icon-row mt-20" :gutter="20">
                <el-col v-for="item in icon_list" :key="item.unicode" :span="3">
                    <div class="icon-item" @click="search_icon_click(item.font_class)">
                        <i :class="`iconfont icon-${item.font_class}`"></i>
                        <div class="text-line-1 size-14">{{ item.name }}</div>
                    </div>
                </el-col>
            </el-row>
            <div v-else>
                <no-data height="500"></no-data>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import searchIcons from '@/assets/search-icons/iconfont.json';
// 搜索
const searchText = ref('');
const icon_list = computed(() => searchIcons.glyphs.filter((item) => item.name.includes(searchText.value)));
const icon_class = defineModel('icon_class', { type: String, default: '' });
const search_icon_click = (item: any) => {
    icon_class.value = item;
};
</script>

<style lang="scss" scoped></style>
