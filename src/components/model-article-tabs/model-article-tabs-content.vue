<template>
    <div class="content">
        <el-form :model="form" label-width="74" class="m-h">
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label="选项卡风格">
                    <el-radio-group v-model="form.tabs_style">
                        <el-radio v-for="item in base_list.tabs_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选项卡置顶">
                    <el-switch v-model="form.tabs_top_up" />
                </el-form-item>
                <el-form-item label="文章风格">
                    <el-radio-group v-model="form.article_style">
                        <el-radio v-for="item in base_list.article_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <card-container class="content-height">
                <div class="mb-12">选项卡设置</div>
                <div class="nav-list">
                    <drag :data="form.tabs_list" type="card" icon-position="top" :space-col="20" @click="tabs_list_click" @remove="tabs_list_remove" @on-sort="tabs_list_sort">
                        <template #default="{ row, index }">
                            <div class="flex-col w">
                                <el-form-item label="显示标题">
                                    <el-input v-model="row.title" placeholder="请输入标题文字" clearable />
                                </el-form-item>
                                <template v-if="active_index == index">
                                    <el-form-item label="简介配置">
                                        <el-input v-model="row.desc" placeholder="请输入简介" clearable />
                                    </el-form-item>
                                    <el-form-item label="读取方式">
                                        <el-radio-group v-model="row.article_check">
                                            <el-radio v-for="item in base_list.article_list" :key="item.value + get_math()" :value="item.value">{{ item.name }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <template v-if="row.article_check === '0'">
                                        <div class="nav-list">
                                            <drag :data="row.article_list" :space-col="20" @remove="article_list_remove" @on-sort="article_list_sort">
                                                <template #default="scoped">
                                                    <upload v-model="scoped.row.new_url" :limit="1" size="40" styles="2"></upload>
                                                    <el-image :src="scoped.row.link.cover" fit="contain" class="img">
                                                        <template #error>
                                                            <div class="bg-f5 flex-row jc-c align-c radius h w">
                                                                <icon name="error-img" size="16" color="9"></icon>
                                                            </div>
                                                        </template>
                                                    </el-image>
                                                    <div class="flex-1 flex-width text-line-2 size-12 self-s">{{ scoped.row.link.title }}</div>
                                                </template>
                                            </drag>
                                            <el-button class="mtb-20 w" @click="article_add(index)">+添加</el-button>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <el-form-item label="文章分类">
                                            <el-select v-model="row.article_type" multiple collapse-tags placeholder="请选择文章分类">
                                                <el-option v-for="item in base_list.article_type_list" :key="item.value" :label="item.name" :value="item.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="显示数量">
                                            <el-input v-model="row.number" type="number" placeholder="请输入显示数量" clearable />
                                        </el-form-item>
                                        <el-form-item label="排序类型">
                                            <el-radio-group v-model="row.sort">
                                                <el-radio v-for="item in base_list.sort_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="排序规则">
                                            <el-radio-group v-model="row.sort_rules">
                                                <el-radio v-for="item in base_list.sort_rules_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="封面图片">
                                            <el-switch v-model="row.is_img_show" />
                                        </el-form-item>
                                    </template>
                                </template>
                            </div>
                        </template>
                    </drag>
                    <el-button class="mtb-20 w" @click="tabs_add">+添加</el-button>
                </div>
            </card-container>
            <card-container>
                <div class="mb-12">列表设置</div>
                <el-form-item label="是否显示">
                    <el-checkbox-group v-model="form.is_show">
                        <el-checkbox v-for="item in base_list.list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </card-container>
        </el-form>
        <url-value-dialog v-model:dialog-visible="urlValueDialogVisible" :type="['article']" multiple @update:model-value="url_value_dialog_call_back"></url-value-dialog>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const form = reactive(props.value);
const base_list = reactive({
    tabs_style_list: [
        { name: '样式一', value: '0' },
        { name: '样式二', value: '1' },
        { name: '样式三', value: '2' },
        { name: '样式四', value: '3' },
    ],
    article_style_list: [
        { name: '单列展示', value: '0' },
        { name: '两列展示（纵向）', value: '1' },
        { name: '大图展示', value: '2' },
        { name: '左右滑动展示', value: '3' },
    ],
    article_list: [
        { name: '选择文章', value: '0' },
        { name: '筛选文章', value: '1' },
    ],
    article_type_list: [
        { name: '样式一', value: '0' },
        { name: '样式二', value: '1' },
        { name: '样式三', value: '2' },
    ],
    sort_list: [
        { name: '综合', value: '0' },
        { name: '时间', value: '1' },
        { name: '浏览量', value: '2' },
    ],
    sort_rules_list: [
        { name: '降序（desc）', value: '0' },
        { name: '升序（asc）', value: '1' },
    ],
    list_show_list: [
        { name: '日期时间', value: '0' },
        { name: '浏览量', value: '1' },
    ],
});
// 开启关闭链接
const urlValueDialogVisible = ref(false);
const active_index = ref(0);
const tabs_list_click = (item: any, index: number) => {
    active_index.value = index;
};
// 选项卡设置
const tabs_list_remove = (index: number) => {
    form.tabs_list.splice(index, 1);
};
const tabs_list_sort = (item: any) => {
    // 拖拽完成后更新数组
    form.tabs_list = item.value;
};
const tabs_add = () => {
    form.tabs_list.push({
        id: get_math(),
        title: '',
        desc: '',
        article_check: '0',
        article_type: [],
        number: 4,
        sort: '0',
        sort_rules: '0',
        is_img_show: true,
        article_list: [],
    });
    // emit('update:value', form);
};

// 指定文章
const article_list_remove = (index: number) => {
    form.tabs_list[active_index.value].article_list.splice(index, 1);
};
const article_list_sort = (item: any) => {
    // emit('update:value', item);
};

const article_index = ref(0);
const article_add = (index: number) => {
    urlValueDialogVisible.value = true;
    article_index.value = index;
};
const url_value_dialog_call_back = (item: any[]) => {
    // console.log(item);
    item.forEach((child: any) => {
        form.tabs_list[article_index.value].article_list.push({
            id: get_math(),
            src: 'carousel',
            new_url: [],
            link: child,
        });
    });
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    .content-height {
        min-height: calc(100vh - 38.2rem);
    }
}
.img {
    width: 4rem;
    height: 4rem;
}
</style>
