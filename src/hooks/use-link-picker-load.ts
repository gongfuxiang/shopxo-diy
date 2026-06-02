import { nextTick, ref, watch, type Ref } from 'vue';

/**
 * 链接选择弹窗列表加载：打开时拉取一次，关闭仅重置表单；避免分页初始事件重复请求
 */
export function useLinkPickerLoad(options: {
    loadStamp: Ref<number>;
    resetFlag: Ref<boolean>;
    resetFields: () => void;
    fetchList: (page: number) => void;
}) {
    const paginationReady = ref(false);
    /** 初始加载完成前，忽略筛选器 @change 触发的重复请求（商品 cascader 等） */
    const filterFetchEnabled = ref(false);

    const loadFirstPage = () => {
        filterFetchEnabled.value = false;
        paginationReady.value = false;
        options.resetFields();
        options.fetchList(1);
        nextTick(() => {
            paginationReady.value = true;
            // 等待筛选组件绑定数据后可能触发的 change 事件结束
            window.setTimeout(() => {
                filterFetchEnabled.value = true;
            }, 100);
        });
    };

    watch(
        options.loadStamp,
        (val, oldVal) => {
            if (!val || val === oldVal) {
                return;
            }
            loadFirstPage();
        },
        { immediate: true },
    );

    watch(options.resetFlag, () => {
        options.resetFields();
    });

    const onPageChange = (page: number) => {
        if (!paginationReady.value) {
            return;
        }
        options.fetchList(page);
    };

    const runFilterFetch = (fn: () => void) => {
        if (!filterFetchEnabled.value) {
            return;
        }
        fn();
    };

    return { onPageChange, filterFetchEnabled, runFilterFetch };
}
