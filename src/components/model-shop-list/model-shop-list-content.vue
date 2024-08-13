<template>
    <div class="content">
        <el-form :model="form" label-width="70" class="m-h">
            <card-container class="mb-8">
                <div class="mb-12">列表设置</div>
                <el-form-item label="选择风格">
                    <el-radio-group v-model="form.product_style">
                        <el-radio v-for="item in base_list.product_style_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </card-container>
            <div class="content-height bg-f">
                <card-container class="card-container-br">
                    <div class="mb-12">商品设置</div>
                    <el-form-item label="添加商品">
                        <el-radio-group v-model="form.product_check">
                            <el-radio v-for="item in base_list.product_list" :key="item.value" :value="item.value">{{ item.name }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="form.product_check === '0'">
                        <div class="nav-list">
                            <drag :data="form.product_list" :space-col="20" @remove="product_list_remove" @on-sort="product_list_sort">
                                <template #default="{ row }">
                                    <upload v-model="row.new_src" :limit="1" size="40" styles="2"></upload>
                                    <el-image :src="row.url" fit="contain" class="img">
                                        <template #error>
                                            <div class="bg-f5 flex-row jc-c align-c radius h w">
                                                <icon name="error-img" size="16" color="9"></icon>
                                            </div>
                                        </template>
                                    </el-image>
                                    <div class="flex-1 flex-width">
                                        <url-value v-model="row.href"></url-value>
                                    </div>
                                </template>
                            </drag>
                            <el-button class="mtb-20 w" @click="add">+添加</el-button>
                        </div>
                    </template>
                    <template v-else>
                        <el-form-item label="商品分类">
                            <el-select v-model="form.product_type" multiple collapse-tags placeholder="请选择文章分类">
                                <el-option v-for="item in base_list.product_type_list" :key="item.value" :label="item.name" :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="指定品牌">
                            <el-select v-model="form.product_type" multiple collapse-tags placeholder="请选择文章分类">
                                <el-option v-for="item in base_list.product_type_list" :key="item.value" :label="item.name" :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="显示数量">
                            <el-input v-model="form.number" placeholder="Please input" clearable />
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
                    </template>
                </card-container>
                <!-- 商品显示的配置信息 -->
                <product-show-config :value="form"></product-show-config>
            </div>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { get_math } from '@/utils';
import { ElButton } from 'element-plus';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({}),
    },
});
const state = reactive({
    form: props.value,
});
// 如果需要解构，确保使用toRefs
const { form } = toRefs(state);

const base_list = {
    product_style_list: [
        { name: '单列展示', value: '0' },
        { name: '大图展示', value: '2' },
        { name: '两列展示(纵向)', value: '1' },
        { name: '两列展示(横向)', value: '4' },
        { name: '三列展示', value: '3' },
        { name: '左右滑动展示', value: '5' },
    ],
    product_list: [
        { name: '指定商品', value: '0' },
        { name: '筛选商品', value: '1' },
    ],
    product_type_list: [
        { name: '样式一', value: '0' },
        { name: '样式二', value: '1' },
        { name: '样式三', value: '2' },
    ],
    sort_list: [
        { name: '综合', value: '0' },
        { name: '销量', value: '1' },
        { name: '热度', value: '2' },
        { name: '价格', value: '3' },
        { name: '最新', value: '4' },
    ],
    sort_rules_list: [
        { name: '降序(desc)', value: '0' },
        { name: '升序(asc)', value: '1' },
    ]
};

const product_list_remove = (index: number) => {
    form.value.product_list.splice(index, 1);
};
const add = () => {
    form.value.product_list.push({
        id: get_math(),
        src: 'carousel',
        new_src: [],
        href: {},
    });
};
// 拖拽更新之后，更新数据
const product_list_sort = (new_list: any) => {
    form.value.product_list = new_list;
}
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
.card {
    .el-form-item:last-child {
        margin-bottom: 0;
    }
}
.img {
    width: 4rem;
    height: 4rem;
}
</style>
