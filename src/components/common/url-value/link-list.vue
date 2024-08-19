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
                    <div v-for="item in new_base_data" :key="item.type">
                        <div class="fw mb-15">{{ item.name }}</div>
                        <div class="flex-row flex-wrap gap-15">
                            <div v-for="(child, index) in item.data" :key="index" class="item" :class="menu_active == item.page ? 'active' : ''" @click="menu_link_event(child)">{{ child.name }}</div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { urlValueStore, urlValue } from '@/store';
const url_value_store = urlValueStore();
const props = defineProps({
    // 重置
    reset: {
        type: Boolean,
        default: () => false,
    },
});
watch(
    () => props.reset,
    () => {
        menu_active.value = '';
    }
);
const modelValue = defineModel({ type: Object, default: {} });
const search_value = ref('');
const base_data = computed(() => {
    // 过滤url_value_store.url_value.page_link_list中的type为shop的data的数据，只保留data数组
    return url_value_store.url_value.page_link_list.filter((item: any) => {
        if (item.type == 'shop') {
            return item.data;
        }
    });
});
const new_base_data = computed(() => {
    // 过滤url_value_store.url_value.page_link_list中的type为shop的data的数据，只保留data数组
    return base_data.value[0].data;
});
const handle_search = () => {
    // 根据关键词过滤new_base_data数据
    new_base_data.value.filter((item: any) => {
        if (item.data) {
            return item.data.filter((item: any) => {
                if (item.name.includes(search_value.value)) {
                    return item;
                }
            });
        } else {
            return item.filter((item: any) => {
                if (item.name.includes(search_value.value)) {
                    return item;
                }
            });
        }
    });
};
const menu_active = ref('');
const emit = defineEmits(['update:link']);
const menu_link_event = (item: any) => {
    if (item.page == menu_active.value) {
        menu_active.value = '';
        modelValue.value = {};
    } else {
        menu_active.value = item.page;
        modelValue.value = item;
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
