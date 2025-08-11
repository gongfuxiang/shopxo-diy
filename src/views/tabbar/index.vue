<template>
    <div v-loading.fullscreen.lock="loading" class="app-wrapper no-copy" element-loading-background="rgba(255,255,255,1)" element-loading-custom-class="loading-custom">
        <template v-if="!loading_content">
            <template v-if="!is_empty">
                <div class="app-wrapper-content flex-row">
                    <app-main :footer="form"></app-main>
                    <settings :key="key" :value="form" :footer-dialog-position-top="footer_dialog_position_top"></settings>
                </div>
                <div class="app-wrapper-footer flex-row align-c">
                    <el-button type="primary" class="footer-save" :disabled="save_disabled" @click="save_event">保存</el-button>
                </div>
            </template>
            <template v-else>
                <no-data height="100vh" img-width="260px" size="16px" text="编辑数据有误"></no-data>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { get_math, convert_strings_to_numbers } from '@/utils';
import { Settings, AppMain } from './components/index';
import defaultSettings from './components/main/index';
import { cloneDeep } from 'lodash';
import CommonAPI from '@/api/common';
import { commonStore } from '@/store';
const common_store = commonStore();
const temp_form = ref(defaultSettings.footer_nav);
const form = ref<any>({});

const key = ref('');
const footer_dialog_position_top = ref(50);
//#region 页面初始化数据 ---------------------start
// 页面加载
onMounted(() => {
    common_init();
});
const is_empty = ref(false);
const init = () => {
    CommonAPI.getDynamicApi(common_store.common.config.app_tabbar_data_url, { type: get_type() })
        .then((res: any) => {
            if (res.data) {
                let data = res.data;
                data.style.common_style = convert_strings_to_numbers(data.style.common_style);
                form.value = data;
            } else {
                form.value = cloneDeep(temp_form.value);
            }
            key.value = get_math();
            loading_event();
        })
        .catch(() => {
            is_empty.value = true;
        });
};

// 初始化公共数据
const common_init = () => {
    CommonAPI.getInit().then((res: any) => {
        common_store.set_common(res.data);
        init();
    });
};
// 加载动画
const loading = ref(true);
const loading_content = ref(true);
const loading_event = () => {
    loading_content.value = false;
    setTimeout(() => {
        loading.value = false;
    }, 1000);
};
//#endregion 页面初始化数据 ---------------------end

//#region 顶部导航回调方法 ---------------------start
const save_disabled = ref(false);
const save_event = () => {
    const clone_form = cloneDeep(form.value);
    const new_data = {
        type: get_type(),
        config: clone_form,
    };
    save_disabled.value = true;
    // 数据改造
    CommonAPI.getDynamicApi(common_store.common.config.app_tabbar_save_url, new_data).then((res: any) => {
        // 如果是导出或预览模式，则不显示保存成功的消息
        ElMessage.success('保存成功');
        setTimeout(() => {
            save_disabled.value = false;
        }, 500);
    }).catch((err) => {
        save_disabled.value = false;
    });
};
const get_type = () => {
    let new_type = 'home';
    if (document.location.search.indexOf('/type/') != -1) {
        new_type = document.location.search.substring(document.location.search.indexOf('/type/') + 6);
        // 进行3次切割选择参数内容
        const result1 = splitAndGetFirst(new_type, '/');
        const result2 = splitAndGetFirst(result1, '&');
        return splitAndGetFirst(result2, '#');
    } else {
        return new_type;
    }
};
function splitAndGetFirst(str: string, separator: string): string {
    const data = str.split(separator);
    if (data.length > 1) {
      return data[0];
    } else {
      return str;
    }
}
//#endregion 顶部导航回调方法 ---------------------end
</script>

<style scoped lang="scss">
.app-wrapper {
    background-color: #fff;
    .app-wrapper-content {
        height: calc(100vh - 6.2rem);
    }
    .app-wrapper-footer {
        height: 6.2rem;
        padding: 1.5rem;
        border-top: 0.1rem solid #f5f5f5;
        position: relative;
        background: #fff;
        .footer-save {
            height: 3.1rem;
            line-height: 3.1rem;
            padding-top: 0;
            padding-bottom: 0;
            font-size: 1.2rem;
            min-width: 8rem;
        }
    }
}
.no-copy {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
:deep(.divider-line) {
    box-shadow: 0 0.5rem 2rem rgba(50, 55, 58, 0.1);
}
// :deep(.settings) {
//     // box-shadow: 0 0.5rem 2rem rgba(50, 55, 58, 0.1);
//     .settings-title {
//         // box-shadow: 0 0.5rem 2rem rgba(50, 55, 58, 0.1);
//     }
// }
</style>
