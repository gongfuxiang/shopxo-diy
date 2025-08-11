<template>
    <!-- 模版导入 -->
    <el-dialog v-model="dialogVisible" class="radius-lg" width="1168" draggable append-to-body :close-on-click-modal="false" @close="close_event">
        <template #header>
            <div class="title re">
                <template v-if="common_store_config.diy_upload_url !== '' && common_store_config.diy_market_url !== ''">
                    <el-radio-group v-model="temp_active" is-button :disabled="is_disabled" @change="temp_change">
                        <el-radio-button value="1">本地导入</el-radio-button>
                        <el-radio-button value="2">模版市场</el-radio-button>
                    </el-radio-group>
                </template>
                <div class="middle size-16 fw-b">模版导入</div>
            </div>
        </template>
        <div class="url-value-content ptb-16 flex-col gap-16">
            <div v-if="temp_active == '1'" class="h flex-row jc-c align-c">
                <div class="import-content">
                    <el-upload v-model:file-list="file_list" action="#" :accept="exts_text" :show-file-list="false" :auto-upload="false" :on-change="upload_change">
                        <template #trigger>
                            <div class="import-btn">
                                <icon name="upload-file" color="primary"></icon>
                            </div>
                        </template>
                    </el-upload>
                    <div v-if="file_list.length > 0" class="upload-file-tips mt-10 size-12 flex-row gap-5 jc-c align-e">
                        <span class="fw-b">{{ upload_file.name }}</span>
                        <span class="cr-9">({{ annex_size_to_unit(upload_file.size) }})</span>
                    </div>
                    <div class="cr-c size-12 flex-col gap-10 mt-10 align-s">
                        <p>1. 选择已下载的diy设计zip包</p>
                        <p>2. 导入将自动新增一条数据</p>
                    </div>
                </div>
            </div>
            <div v-else class="h flex-col gap-16">
                <div v-loading="loading && { text: Loading_text }" :element-loading-text="Loading_text" class="flex-1 flex-col gap-16">
                    <div class="temp-search flex-row jc-sb align-c w">
                        <div class="flex-row gap-10 align-c search-content">
                            <el-input v-model="form.keywords" class="flex-1" placeholder="搜索关键字" clearable @keyup.enter="get_interface('1')" />
                            <el-button type="primary" @click="get_interface('1')">
                                <view class="flex-row jc-c gap-4">
                                    <icon name="search"></icon>
                                    <text>搜索</text>
                                </view>
                            </el-button>
                            <el-checkbox v-model="form.status" class="ml-20" @change="status_change">我已购买</el-checkbox>
                        </div>
                        <el-link v-if="more_link !== ''" type="primary" :href="more_link" target="_blank" :underline="false">
                            <div class="flex-row gap-3 align-c">
                                <icon name="download-btn"></icon>
                                <text>更多diy模版下载</text>
                            </div>
                        </el-link>
                    </div>
                    <el-scrollbar height="493px">
                        <div class="temp-content flex-1">
                            <div v-if="data_list.length > 0" class="flex-row flex-wrap gap-16">
                                <div v-for="item in data_list" :key="item.id" class="item flex-col br-f5">
                                    <div class="re img-content oh">
                                        <image-empty v-model="item.images" class="img" error-img-style="width:5rem;height:5rem;"></image-empty>
                                        <!-- 鼠标滑入，显示详情 -->
                                        <div class="mask"></div>
                                        <div class="middle detail">
                                            <el-link class="detail-content plr-20 ptb-6 bg-f cr-3 round" type="primary" :href="item.goods_url" :underline="false" target="_blank">
                                                <div class="flex-row align-c gap-4">
                                                    <icon name="eye"></icon>
                                                    <text>查看</text>
                                                </div>
                                            </el-link>
                                        </div>
                                    </div>
                                    <div class="flex-1 flex-col pa-10 gap-10">
                                        <div class="title text-line-2">{{ item.title }}</div>
                                        <div class="flex-row jc-sb align-c gap-3">
                                            <p class="cr-error fw-b size-14">{{ item.price_data.value }}</p>
                                            <el-button :type="item.buy_data.status == 1 ? 'success' : 'primary'" :disabled="item.buy_data.status == 2" @click="buy_event(item, item.buy_data.status)">{{ item.buy_data.title }}</el-button>
                                        </div>
                                        <div class="cr-9 size-12 flex-row jc-sb align-c">
                                            <el-popover placement="top" :width="150" trigger="click">
                                                <template #reference>
                                                    <div class="c-pointer">
                                                        {{ item.version_apply.name }}
                                                    </div>
                                                </template>
                                                <el-scrollbar max-height="200px">
                                                    <div class="flex-col gap-10">
                                                        <div v-for="version in item.version_apply.data" :key="version">
                                                            {{ version }}
                                                        </div>
                                                    </div>
                                                </el-scrollbar>
                                            </el-popover>
                                            <el-popover v-if="item.buy_auth_domain.length > 0" placement="top" :width="150" trigger="click">
                                                <template #reference>
                                                    <div class="flex-row gap-3 cr-9 align-c size-12 c-pointer">
                                                        <icon name="domain" class="re top-1"></icon>
                                                        <span>授权域名</span>
                                                    </div>
                                                </template>
                                                <el-scrollbar max-height="200px">
                                                    <div class="flex-col gap-10">
                                                        <div v-for="domain in item.buy_auth_domain" :key="domain">
                                                            {{ domain }}
                                                        </div>
                                                    </div>
                                                </el-scrollbar>
                                            </el-popover>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <no-data height="493px"></no-data>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div v-if="temp_active == '1'">
                    <el-button class="plr-28 ptb-10" @click="close_event">取消</el-button>
                    <el-button class="plr-28 ptb-10" type="primary" @click="confirm_event">确定</el-button>
                </div>
                <div v-else class="flex-row jc-e">
                    <el-pagination :disabled="is_disabled" :current-page="form.page" background :page-size="form.page_size" :pager-count="5" layout="prev, pager, next" :total="form.data_total" @current-change="current_page_change" />
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import type { UploadFile } from 'element-plus';
import { annex_size_to_unit } from '@/utils';
import CommonAPI from '@/api/common';
import { commonStore } from '@/store';
import { get_id } from '@/utils/common';
const common_store = commonStore();
const app = getCurrentInstance();
/**
 * @description: 模版导入
 * @param dialogVisible {Boolean} 弹窗显示
 * @param type{String} 链接类型为空数组则表示无限制，全部可用，传过来则表示传的值可用
 * @param multiple{Boolean} 是否多选 默认单选 只生效 商品页面 goods/ 文章页面 article/ DIY页面 diy/ 设计页面 design/ 自定义页面 custom-view/ 品牌页面 brand
 * @return {*} update:dialogVisible
 */
const props = defineProps({
    type: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
});
const common_store_config = computed(() => common_store.common.config);

const dialogVisible = defineModel({ type: Boolean, default: false });
// 监听判断是否有当前的导入内容
const temp_active = ref('1');
watchEffect(() => {
    if (common_store_config.value.diy_upload_url === '') {
        temp_active.value = '2';
    } else {
        temp_active.value = '1';
    }
});
const temp_change = (val: any) => {
    temp_active.value = val;
};
const more_link = computed(() => {
    return common_store_config.value.store_diy_url || '';
});
//导入
const exts_text = ref('.zip');
const upload_file = ref({
    name: '',
    size: 0,
});
const file_list = ref<UploadFile[]>([]);
// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const upload_change = async (uploadFile: UploadFile) => {
    upload_file.value.name = uploadFile.name || '';
    upload_file.value.size = uploadFile.size || 0;
    nextTick(() => {
        file_list.value = [uploadFile];
    });
};

watch(
    () => dialogVisible.value,
    (val) => {
        if (val && data_list.value.length <= 0) {
            // 获取附件列表
            get_import_list('1');
        }
    }
);

const data_list = ref<arrayIndex[]>([]);
const form = ref({
    keywords: '',
    status: false,
    page: 1,
    page_size: 10,
    data_total: 0,
});
const loading = ref(false);
const is_disabled = ref(false);
const Loading_text = ref(' ');
const get_import_list = (type?: string) => {
    // 如果type为空则重置页码
    if (!type) {
        form.value.page = 1;
    } else {
        form.value.page = Number(type);
    }
    // 加载中
    loading.value = true;
    const new_data = {
        ...form.value,
        is_already_buy: form.value.status ? '1' : '0',
    };
    CommonAPI.getDynamicApi(common_store_config.value.diy_market_url, new_data)
        .then((res: any) => {
            const data = res.data;
            form.value.data_total = data.data_total;
            data_list.value = data.data_list;
            loading.value = false;
            // 解除禁用效果
            is_disabled.value = false;
        })
        .catch(() => {
            form.value.data_total = 0;
            data_list.value = [];
            // 解除禁用效果
            loading.value = false;
            is_disabled.value = false;
        });
};
const status_change = (val: any) => {
    get_interface('1');
};
// 分页查询
const current_page_change = (val: number) => {
    get_interface(val.toString());
};
// 除了初始化调用的时候，其他情况都会执行禁用效果
const get_interface = (val: string) => {
    is_disabled.value = true;
    get_import_list(val);
}
// 购买事件
const buy_event = (item: any, status: number) => {
    if (status == 0) {
        // 跳转链接
        window.open(item.goods_url, '_blank');
    } else if (status == 1) {
        // 执行导入
        const new_data: install_data = {
            id: item.id,
            data_id: get_id(),
            opt: 'url',
            key: '',
        };
        loading.value = true;
        // 导入时禁用切换
        is_disabled.value = true;
        Loading_text.value = '正在获取中...';
        install(new_data);
    }
};
interface install_data {
    id: string;
    data_id: string;
    opt: string;
    key: string;
}
const install = async (item: install_data) => {
    let new_data = item;
    CommonAPI.getDynamicApi(common_store_config.value.diy_install_url ,item)
        .then((res: any) => {
            switch (item.opt) {
                case 'url':
                    new_data['key'] = res.data;
                    new_data['opt'] = 'download';
                    Loading_text.value = '正在下载中...';
                    install(new_data);
                    break;
                case 'download':
                    new_data['key'] = res.data;
                    new_data['opt'] = 'install';
                    Loading_text.value = '正在安装中...';
                    install(new_data);
                    break;
                case 'install':
                    ElMessage.success(res.msg);
                    if (import.meta.env.VITE_APP_BASE_API == '/dev-admin') {
                        history.pushState({}, '', '?s=diy/saveinfo/id/' + res.data + '.html');
                    }
                    Loading_text.value = '';
                    loading.value = false;
                    // 解除禁用效果
                    is_disabled.value = false;
                    close_event();
                    emit('confirm');
                    break;
            }
        })
        .catch((err) => {
            loading.value = false;
            // 解除禁用效果
            is_disabled.value = false;
            Loading_text.value = '';
        });
};

// 取消回调
const emit = defineEmits(['confirm']);
const close_event = () => {
    dialogVisible.value = false;
    upload_file.value.name = '';
    upload_file.value.size = 0;
    file_list.value = [];
};
// 确认回调
const confirm_event = () => {
    if (file_list.value.length > 0) {
        const form_data = new FormData();
        if (get_id()) {
            form_data.append('data_id', get_id());
        }
        if (file_list.value && file_list.value[0].raw) {
            form_data.append('file', file_list.value[0]?.raw);
        }
        CommonAPI.getDynamicApi(common_store_config.value.diy_upload_url, form_data, true)
            .then((res: any) => {
                ElMessage.success(res.msg);
                if (import.meta.env.VITE_APP_BASE_API == '/dev-admin') {
                    history.pushState({}, '', '?s=diy/saveinfo/id/' + res.data + '.html');
                }
                close_event();
                emit('confirm');
            })
            .catch(() => {});
    }
};

</script>
<style lang="scss" scoped>
.url-value-content {
    height: 57.3rem;
}
.import-content {
    text-align: center;
    .import-btn {
        width: 14rem;
        height: 14rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 7rem;
        color: $cr-primary;
        background: #e1f0ff;
        border-radius: 0.4rem;
        border: 0.1rem dashed $cr-primary;
    }
}
.temp-search {
    .search-content {
        width: 50rem;
    }
}
.temp-content {
    .item {
        width: calc(100% / 5 - (1.6rem * 4 / 5));
        border-radius: 0.8rem;
        transition: all 0.3s;
        overflow: hidden;
        .img-content {
            .img {
                width: 100%;
                height: 20rem;
                transition: all 0.3s;
            }
            .detail {
                opacity: 0;
                transition: all 0.3s;
                .detail-content {
                    transition: all 0.3s;
                    margin-top: 3rem;
                }
                &:hover {
                    .detail-content {
                        color: $cr-primary;
                    }
                }
            }
            .mask {
                position: absolute;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.5);
                opacity: 0;
                transition: all 0.3s;
            }
            &:hover {
                .img {
                    transform: scale(1.05);
                }
                .mask {
                    background: rgba(0, 0, 0, 0.4);
                }
                .detail {
                    opacity: 1;
                }

                .detail-content {
                    margin-top: 0rem;
                }
                .mask {
                    opacity: 0.8;
                }
            }
        }
        .title {
            height: 4rem;
        }
    }
}
:deep(.el-tabs__nav-wrap) {
    &::after {
        height: 0.1rem;
    }
}
:deep(.el-tabs__item) {
    /* 修改为您想要的文字大小 */
    font-size: 1.4rem !important;
}
</style>
