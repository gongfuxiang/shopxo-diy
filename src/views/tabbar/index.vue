<template>
    <div v-loading.fullscreen.lock="loading" class="app-wrapper no-copy" element-loading-background="rgba(255,255,255,1)" element-loading-custom-class="loading-custom">
        <template v-if="!loading_content">
            <template v-if="!is_empty">
                <div class="app-wrapper-content flex-row">
                    <app-main :footer="form.footer"></app-main>
                    <settings :key="key" :value="form.footer"></settings>
                </div>
                <div class="app-wrapper-footer flex-row align-c">
                    <el-button type="primary" class="footer-save" @click="save_event">保存</el-button>
                </div>
            </template>
            <template v-else>
                <no-data height="100vh" img-width="260px" size="16px" text="编辑数据有误"></no-data>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { UploadFile } from 'element-plus';
import { is_obj } from '@/utils';
import { Settings, AppMain } from './components/index';
import defaultSettings from './components/main/index';
import { cloneDeep } from 'lodash';
import DiyAPI, { diyData, headerAndFooter, diyConfig } from '@/api/diy';
import CommonAPI from '@/api/common';
import { commonStore } from '@/store';
const common_store = commonStore();
interface diy_data_item {
    id: string;
    model: {
        logo: string;
        name: string;
        is_enable: string;
        describe: string;
    };
    footer: headerAndFooter;
}
const temp_form = ref<diy_data_item>({
    id: '',
    model: {
        logo: '',
        name: '',
        is_enable: '1',
        describe: '',
    },
    footer: {
        name: '底部导航',
        show_tabs: '0',
        key: 'footer-nav',
        com_data: defaultSettings.footer_nav,
    },
});
const form = ref<diy_data_item>({
    id: '',
    model: {
        logo: '',
        name: '',
        is_enable: '1',
        describe: '',
    },
    footer: {
        name: '底部导航',
        show_tabs: '0',
        key: 'footer-nav',
        com_data: {},
    },
});

const key = ref('');
//#region 页面初始化数据 ---------------------start
// 页面加载
onMounted(() => {
    common_init();
});
const is_empty = ref(false);
const init = () => {
    if (get_id()) {
        DiyAPI.getInit({ id: get_id() }).then((res: any) => {
            if (res.data) {
                form.value = form_data_transfor_diy_data(res.data);
            } else {
                is_empty.value = true;
            }
            loading_event();
        });
    } else {
        temp_form.value.footer.com_data = defaultSettings.footer_nav;
        form.value = cloneDeep(temp_form.value);
        loading_event();
    }
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
const save_event = () => {
    save_formmat_form_data(form.value);
};
// save_formmat_form_data: 保存数据， data： 数据， close： 是否关闭， is_export： 是否导出， is_preview： 是否预览
const save_formmat_form_data = (data: diy_data_item, close: boolean = false, is_export: boolean = false, is_preview: boolean = false) => {
    const clone_form = cloneDeep(data);
    // 数据改造
    const new_data = diy_data_transfor_form_data(clone_form);
    DiyAPI.save(new_data).then((res) => {
        // 如果是导出或预览模式，则不显示保存成功的消息
        if (!(is_export || is_preview)) {
            ElMessage.success('保存成功');
        }
        if (close) {
            ElMessageBox.confirm('您确定要关闭本页吗？', '提示')
                .then(() => {
                    // 关闭页面
                    window.close();
                })
                .catch(() => {});
        } else {
            // 判断是否需要导出
            if (is_export) {
                const index = window.location.href.lastIndexOf('?s=');
                const pro_url = window.location.href.substring(0, index);
                const new_url = import.meta.env.VITE_APP_BASE_API == '/dev-api' ? import.meta.env.VITE_APP_BASE_API_URL : pro_url;
                window.open(new_url + '?s=diyapi/diydownload/id/' + res.data + '.html', '_blank');
            }
            form.value.id = String(res.data);
            history.pushState({}, '', '?s=diy/saveinfo/id/' + res.data + '.html');
        }
    });
};
//#endregion 顶部导航回调方法 ---------------------end
// 数据改造
const diy_data_transfor_form_data = (clone_form: diy_data_item) => {
    return {
        id: clone_form.id,
        logo: clone_form.model.logo,
        name: clone_form.model.name,
        is_enable: clone_form.model.is_enable,
        describe: clone_form.model.describe,
        config: JSON.stringify({
            footer: clone_form.footer,
        }),
    };
};
const form_data_transfor_diy_data = (clone_form: diyData) => {
    let temp_config = clone_form.config;
    let new_tem_form = cloneDeep(temp_form.value);
    try {
        return {
            id: clone_form.id,
            model: {
                logo: clone_form.logo,
                name: clone_form.name,
                is_enable: clone_form.is_enable,
                describe: clone_form.describe,
            },
            footer: is_obj(temp_config) ? (temp_config as diyConfig).footer : JSON.parse(temp_config as string).footer,
        };
    } catch (error) {
        return {
            id: clone_form.id,
            model: {
                logo: clone_form.logo,
                name: clone_form.name,
                is_enable: clone_form.is_enable,
                describe: clone_form.describe,
            },
            footer: new_tem_form.footer,
        };
    }
};

// 截取document.location.search字符串内id/后面的所有字段
const get_id = () => {
    let new_id = '';
    if (document.location.search.indexOf('id/') !== -1) {
        new_id = document.location.search.substring(document.location.search.indexOf('id/') + 3);
        // 去除字符串的.html
        let html_index = new_id.indexOf('.html');
        if (html_index !== -1) {
            new_id = new_id.substring(0, html_index);
        }
        return new_id;
    } else {
        return new_id;
    }
};
</script>

<style scoped lang="scss">
.app-wrapper {
    background-color: #fff;
    .app-wrapper-content {
        height: calc(100vh - 11.1rem);
    }
    .app-wrapper-footer {
        height: 11.1rem;
        padding: 3.5rem 2rem;
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
:deep(.settings) {
    box-shadow: 0 0.5rem 2rem rgba(50, 55, 58, 0.1);
    .settings-title {
        box-shadow: 0 0.5rem 2rem rgba(50, 55, 58, 0.1);
    }
}
</style>
