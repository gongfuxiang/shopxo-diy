<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container class="mb-8">
                <div class="mb-12">展示设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.article_style">
                        <el-radio v-for="item in base_list.article_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="content-height bg-f">
                <card-container class="card-container-br">
                    <div class="mb-12">文章设置</div>
                    <el-form-item label="读取方式">
                        <el-radio-group v-model="form.article_check">
                            <el-radio v-for="item in base_list.article_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="form.article_check === '0'">
                        <div class="nav-list">
                            <drag :data="form.article_list" :space-col="20" @remove="article_list_remove" @on-sort="article_list_sort">
                                <template #default="{ row }">
                                    <upload v-model="row.new_url" :limit="1" size="40" styles="2"></upload>
                                    <el-image :src="row.url" fit="contain" class="img">
                                        <template #error>
                                            <div class="bg-f5 flex-row jc-c align-c radius h w">
                                                <icon name="error-img" size="16" color="9"></icon>
                                            </div>
                                        </template>
                                    </el-image>
                                    <div class="flex-1 flex-width">
                                        <url-value v-model="row.link"></url-value>
                                    </div>
                                </template>
                            </drag>
                            <el-button class="mtb-20 w" @click="add">+添加</el-button>
                        </div>
                    </template>
                    <template v-else>
                        <el-form-item label="文章分类">
                            <el-select v-model="form.article_type" multiple collapse-tags placeholder="请选择文章分类">
                                <el-option v-for="item in base_list.article_type_list" :key="item.value" :label="item.name" :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="显示数量">
                            <el-input v-model="form.number" type="number" placeholder="请输入显示数量" clearable />
                        </el-form-item>
                        <el-form-item label="排序类型">
                            <el-radio-group v-model="form.sort">
                                <el-radio v-for="item in base_list.sort_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="排序规则">
                            <el-radio-group v-model="form.sort_rules">
                                <el-radio v-for="item in base_list.sort_rules_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="封面图片">
                            <el-switch v-model="form.is_img_show" />
                        </el-form-item>
                    </template>
                </card-container>
                <card-container>
                    <div class="mb-12">列表设置</div>
                    <el-form-item label="是否显示">
                        <el-checkbox-group v-model="form.is_show">
                            <el-checkbox v-for="item in base_list.list_show_list" :key="item.value" :value="item.value">{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </card-container>
            </div>
        </el-form>
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

const article_list_remove = (index: number) => {
    form.article_list.splice(index, 1);
};
const article_list_sort = (item: any) => {
    form.article_list = item;
};
const add = () => {
    form.article_list.push({
        id: get_math(),
        src: '',
        new_url: [],
        href: {},
    });
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    .content-height {
        min-height: calc(100vh - 31.8rem);
        .card-container-br {
            border-bottom: 0.8rem solid #f0f2f5;
        }
    }
}
.img {
    width: 4rem;
    height: 4rem;
}
</style>
