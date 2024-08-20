<template>
    <!-- 商城 -->
    <div class="container">
        <div class="flex-row jc-e mb-20">
            <div class="search">
                <el-input v-model="search_value" placeholder="请输入搜索内容" class="" @change="handle_search">
                    <template #suffix>
                        <icon name="search" size="16" color="9" class="c-pointer" @click="handle_search"></icon>
                    </template>
                </el-input>
            </div>
        </div>
        <div class="content">
            <el-scrollbar height="480px">
                <div class="flex-col gap-30">
                    <template v-if="new_base_data.length > 0">
                        <div v-for="item in new_base_data" :key="item.type">
                            <div class="fw mb-15">{{ item.name }}</div>
                            <div class="flex-row flex-wrap gap-15">
                                <div v-for="(child, index) in item.data" :key="index" class="item" :class="menu_active == child.page ? 'active' : ''" @click="menu_link_event(child)">
                                    {{ child.name }}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <no-data height="480"></no-data>
                    </template>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { urlValueStore, urlValue, pageLinkList } from '@/store';
const url_value_store = urlValueStore();
const props = defineProps({
    // 类型
    type: {
        type: String,
        default: () => '',
    },
    // 重置
    reset: {
        type: Boolean,
        default: () => false,
    },
});
watch(
    () => props.reset,
    () => {
        init();
    }
);
const modelValue = defineModel({ type: Array, default: [] });
const search_value = ref('');
const base_data = ref<pageLinkList[]>([]);
const new_base_data = ref<pageLinkList[]>([]);
onMounted(() => {
    init();
});
const init = () => {
    menu_active.value = '';
    search_value.value = '';
    // 过滤url_value_store.url_value.page_link_list中的type为shop的data的数据，只保留data数组
    base_data.value = url_value_store.url_value.page_link_list.filter((item: any) => {
        if (item.type == props.type) {
            return item.data;
        }
    });
    new_base_data.value = base_data.value[0].data || [];
};

const handle_search = () => {
    // 根据关键词过滤new_base_data数据,如果==父级 显示父级和父级下的所有子级数据，
    if (search_value.value) {
        new_base_data.value = filterData(search_value.value, base_data.value[0].data || []);
    } else {
        new_base_data.value = base_data.value[0].data || [];
    }
};
const filterData = (input: string, data: pageLinkList[]) => {
    let result = [];
    // 遍历数组
    for (let item of data) {
        // 检查当前项的name是否匹配
        if (item.name.includes(input)) {
            result.push(item);
        } else {
            if (item.data) {
                // 否则，‌检查当前项的data属性中的子项
                let subResult = item.data.filter((subItem) => subItem.name.includes(input));
                // 如果找到匹配的子项，‌将当前项（‌父级）‌添加到结果中
                if (subResult.length > 0) {
                    result.push({ ...item, data: subResult });
                }
            }
        }
    }

    return result;
};

const menu_active = ref('');
const emit = defineEmits(['update:link']);
const menu_link_event = (item: any) => {
    if (item.page == menu_active.value) {
        menu_active.value = '';
        modelValue.value = [];
    } else {
        menu_active.value = item.page;
        modelValue.value = [item];
    }
};
</script>
<style lang="scss" scoped>
.container {
    search {
        width: 22.5rem;
    }
    .content {
        .item {
            width: 10.3rem;
            padding: 0 0.5rem;
            height: 3.6rem;
            line-height: 3.6rem;
            background-color: #f9f9f9;
            border-radius: 0.2rem;
            font-size: 1.2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s linear;
            &:hover {
                background-color: #edf4ff;
                color: $cr-primary;
            }
            &.active {
                background: #edf4ff;
                color: $cr-primary;
            }
        }
    }
}
</style>
