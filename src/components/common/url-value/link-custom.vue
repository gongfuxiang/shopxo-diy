<template>
    <!-- 自定义链接 -->
    <div class="container">
        <div class="tabs flex-row gap-10 mb-30 align-c">
            <div v-for="item in custom_type" :key="item.id" class="item bg-f5 radius-sm" :class="custom_type_active == item.id ? 'active' : ''" @click="custom_type_event(item)">{{ item.name }}</div>
        </div>
        <div class="content">
            <el-scrollbar height="470px">
                <el-form ref="ruleFormRef" :model="form" label-width="85px" status-icon>
                    <template v-if="custom_type_active == 0">
                        <el-form-item label="跳转路径" prop="link" :rules="link">
                            <el-input v-model="form.link" class="link-input" placeholder="请输入跳转路径" clearable />
                        </el-form-item>
                        <div class="tips">
                            <p class="title">WEB端</p>
                            <p>1. 以http开头</p>
                            <p>2. 如小程序中使用WEB页面、需要在小程序后台加入白名单</p>
                            <p class="title">内部页面(小程序/APP内部地址)</p>
                            <p>1. 小程序以/pages开始</p>
                            <p>2. 例如：/pages/user/user、支持带参数 ?x=xx</p>
                            <p>3. 示例：/pages/goods-detail/goods-detail?id=1</p>
                            <p class="title">打开外部小程序</p>
                            <p>1. 以appid://开头</p>
                            <p>2. 例如：appid://wx88888888|path</p>
                            <p>3. 示例：appid://wx88888888|/pages/goods-detail/goods-detail?id=1</p>
                            <p class="title">打开外部小程序链接</p>
                            <p>1. 以shortlink://开头</p>
                            <p>2. 例如：shortlink://链接可以通过【小程序菜单】->【复制链接】获取。</p>
                            <p>3. 示例：shortlink://#小程序://ShopXO系统/WxblCyRUmDqGpcz</p>
                            <p class="title">拨打电话</p>
                            <p>1. 以tel://开头</p>
                            <p>2. 例如：tel://13222222222</p>
                            <p class="title">跳转原生地图查看指定位置</p>
                            <p>1. 以map://开头</p>
                            <p>2. 例如：map://名称|地址|经度|纬度</p>
                            <p>3. 示例：map://ShopXO|上海浦东新区张江高科技园区XXX号|121.626444|31.20843</p>
                        </div>
                    </template>
                    <template v-if="custom_type_active == 1">
                        <el-form-item label="APPID" prop="app_id" :rules="app_id">
                            <el-input v-model="form.app_id" class="link-input" placeholder="请输入小程序APPID" clearable />
                        </el-form-item>
                        <el-form-item label="小程序路径" prop="app_link" :rules="app_link">
                            <el-input v-model="form.app_link" class="link-input" placeholder="请输入小程序路径" clearable />
                        </el-form-item>
                    </template>
                    <template v-if="custom_type_active == 2">
                        <el-form-item label="电话号码" prop="phone" :rules="phone">
                            <el-input v-model="form.phone" class="link-input" placeholder="请输入电话号码" clearable />
                        </el-form-item>
                    </template>
                    <template v-if="custom_type_active == 3">
                        <el-form-item label="名称" prop="name" :rules="name">
                            <el-input v-model="form.name" class="link-input" placeholder="请输入名称" clearable />
                        </el-form-item>
                        <el-form-item label="详细地址" prop="address" :rules="address">
                            <el-input v-model="form.address" class="link-input" placeholder="请输入地址" type="1" clearable @change="address_change" />
                        </el-form-item>
                        <el-form-item label="经纬度">
                            <maps v-model="map_address" :type="common_map_type" @point="map_point"></maps>
                            <!-- <t-map v-model="map_address" @point="map_point"></t-map> -->
                            <!-- <bd-map v-model="map_address" @point="map_point"></bd-map> -->
                            <!-- <gd-map v-model="map_address" @point="map_point"></gd-map> -->
                            <!-- <tx-map v-model="map_address" @point="map_point"></tx-map> -->
                        </el-form-item>
                    </template>
                    <el-button type="primary" class="hide" @click="on_submit">Create</el-button>
                </el-form>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { commonStore } from '@/store';
const common_store = commonStore();
const common_map_type = common_store.common.config.common_map_type || 'baidu';
const props = defineProps({
    status: {
        type: Boolean,
        default: false,
    },
    // 重置
    reset: {
        type: Boolean,
        default: () => false,
    },
    // 判断是否返回链接地址
    selectIsUrl: {
        type: Boolean,
        default: false,
    },
});
watch(
    () => props.status,
    (val) => {
        on_submit();
    }
);
watch(
    () => props.reset,
    (val) => {
        reset_data();
        custom_type_active.value = 0;
    }
);
interface customType {
    id: number;
    name: string;
}
const custom_type = ref<customType[]>([
    { id: 0, name: '普通链接' },
    { id: 1, name: '跳转小程序' },
    { id: 2, name: '拨打电话' },
    { id: 3, name: '跳转地图' },
]);
const custom_type_active = ref(0);
const custom_type_event = (item: any) => {
    custom_type_active.value = item.id;
};

const map_address = ref('');
const address_change = (val: string) => {
    map_address.value = val;
};

//#region 天地图  -----------------------------------------------start
const map_point = (lng: number, lat: number) => {
    form.lng = lng;
    form.lat = lat;
};
//#endregion 天地图  -----------------------------------------------end

const form = reactive({
    link: '',
    app_id: '',
    app_link: '',
    phone: '',
    name: '',
    address: '',
    lng: 121.47894,
    lat: 31.223,
});
const link = computed(() => {
    return { trigger: 'change', message: '跳转路径不能为空', required: custom_type_active.value == 0 };
});
const app_id = computed(() => {
    return { trigger: 'change', message: '跳转小程序APPID不能为空', required: custom_type_active.value == 1 };
});
const app_link = computed(() => {
    return { trigger: 'change', message: '跳转小程序路径不能为空', required: custom_type_active.value == 1 };
});
const phone = computed(() => {
    return { trigger: 'change', message: '电话号码不能为空', required: custom_type_active.value == 2 };
});
const name = computed(() => {
    return { trigger: 'change', message: '名称不能为空', required: custom_type_active.value == 3 };
});
const address = computed(() => {
    return { trigger: 'change', message: '详细地址不能为空', required: custom_type_active.value == 3 };
});
const ruleFormRef = ref<FormInstance>();
const emit = defineEmits(['update:link']);
const on_submit = () => {
    if (!ruleFormRef.value) return;
    ruleFormRef.value.validate((valid: boolean) => {
        if (valid) {
            let new_value: pageLinkList = {
                name: '',
                page: '',
            };
            if (custom_type_active.value == 1) {
                new_value = {
                    name: form.app_id + '|' + form.app_link,
                    page: 'appid://' + form.app_id + '|' + form.app_link,
                };
            } else if (custom_type_active.value == 2) {
                new_value = {
                    name: form.phone,
                    page: 'tel://' + form.phone,
                };
            } else if (custom_type_active.value == 3) {
                new_value = {
                    name: form.name,
                    page: 'map://' + form.name + '|' + form.address + '|' + form.lng + '|' + form.lat,
                    lng: form.lng,
                    lat: form.lat,
                };
            } else {
                new_value = {
                    name: form.link,
                    page: form.link,
                };
            }
            emit('update:link', new_value);
        }
    });
};
const reset_data = () => {
    form.link = '';
    form.app_id = '';
    form.app_link = '';
    form.phone = '';
    form.name = '';
    form.address = '';
    form.lng = 121.47894;
    form.lat = 31.223;
};
</script>
<style lang="scss" scoped>
.container {
    .tabs {
        .item {
            width: 8rem;
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
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
    .link-input {
        width: 33.2rem;
    }
}
.tips {
    p {
        padding-left: 4rem;
        color: #666;
        font-size: 1.2rem;
        &.title {
            margin: 1rem 0;
            color: #333;
            padding-left: 2rem;
        }
    }
}
</style>
