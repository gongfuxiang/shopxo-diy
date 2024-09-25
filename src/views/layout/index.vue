<template>
    <div v-loading.fullscreen.lock="loading" class="app-wrapper no-copy" element-loading-background="rgba(255,255,255,1)" element-loading-custom-class="loading-custom">
        <template v-if="!loading_content">
            <template v-if="!is_empty">
                <navbar v-model="form.model" :save-disabled="save_disabled" @preview="preview_event" @save="save_event" @save-close="save_close_event" />
                <div class="app-wrapper-content flex-row">
                    <app-main :diy-data="form.diy_data" :tabs-data="form.tabs_data" :header="form.header" :footer="form.footer" @right-update="right_update" @import="import_data_event" @export="export_data_event" @clear="clear_data_event"></app-main>
                    <settings :key="key" :value="diy_data_item"></settings>
                </div>
            </template>
            <template v-else>
                <no-data height="100vh" img-width="260px" size="16px" text="编辑数据有误"></no-data>
            </template>
        </template>
        <preview v-model="preview_dialog" :data-id="diy_id"></preview>
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
    header: headerAndFooter;
    footer: headerAndFooter;
    tabs_data: Array<any>;
    diy_data: Array<any>;
}
const temp_form = ref<diy_data_item>({
    id: '',
    model: {
        logo: '',
        name: '',
        is_enable: '1',
        describe: '',
    },
    header: {
        name: '页面设置',
        show_tabs: '1',
        key: 'page-settings',
        com_data: defaultSettings.header_nav,
    },
    footer: {
        name: '底部导航',
        show_tabs: '0',
        key: 'footer-nav',
        com_data: defaultSettings.footer_nav,
    },
    tabs_data: [],
    diy_data: [],
});
const form = ref<diy_data_item>({
    id: '',
    model: {
        logo: '',
        name: '',
        is_enable: '1',
        describe: '',
    },
    header: {
        name: '页面设置',
        show_tabs: '1',
        key: 'page-settings',
        com_data: {},
    },
    footer: {
        name: '底部导航',
        show_tabs: '0',
        key: 'footer-nav',
        com_data: {},
    },
    tabs_data: [],
    diy_data: [],
});
const diy_data_item = ref({});

const key = ref('');

const right_update = (item: any, diy: [Array<any>], header: headerAndFooter, footer: headerAndFooter, tabs_data: [Array<any>]) => {
    diy_data_item.value = item;
    form.value.diy_data = diy;
    form.value.header = header;
    form.value.footer = footer;
    form.value.tabs_data = tabs_data;
    // 生成随机id
    key.value = Math.random().toString(36).substring(2);
};
// 导入数据
const import_data_event = (uploadFile: UploadFile) => {
    // 截取document.location.search字符串内id/后面的所有字段
    const form_data = new FormData();
    if (get_id()) {
        form_data.append('id', get_id());
    }
    if (uploadFile && uploadFile.raw) {
        form_data.append('file', uploadFile?.raw);
    }
    DiyAPI.import(form_data).then((res: any) => {
        ElMessage.success(res.msg);
        history.pushState({}, '', '?s=diy/saveinfo/id/' + res.data + '.html');
        init();
    });
};
// 导出数据
const export_data_event = () => {
    save_formmat_form_data(form.value, false, true);
};
// 清空数据
const clear_data_event = () => {
    let new_tem_form = cloneDeep(temp_form.value);
    form.value.header.show_tabs = '1';
    form.value.footer.show_tabs = '0';
    form.value.header.com_data = new_tem_form.header.com_data;
    form.value.footer.com_data = new_tem_form.footer.com_data;
    form.value.tabs_data = [];
    form.value.diy_data = [];
    diy_data_item.value = new_tem_form.header;
};
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
        temp_form.value.header.com_data = defaultSettings.header_nav;
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
const preview_dialog = ref(false);
const diy_id = ref('');
const preview_event = () => {
    save_formmat_form_data(form.value, false, false, true);
};
const save_disabled = ref(false);
const save_event = (bool: boolean) => {
    save_disabled.value = bool;
    save_formmat_form_data(form.value);
};
const save_close_event = (bool: boolean) => {
    save_disabled.value = bool;
    save_formmat_form_data(form.value, true);
};
// save_formmat_form_data: 保存数据， data： 数据， close： 是否关闭， is_export： 是否导出， is_preview： 是否预览
const save_formmat_form_data = (data: diy_data_item, close: boolean = false, is_export: boolean = false, is_preview: boolean = false) => {
    const clone_form = cloneDeep(data);
    clone_form.header.show_tabs = '1';
    clone_form.footer.show_tabs = '0';
    // 字段比coupon多
    const new_array_1 = ['goods-list', 'article-list'];
    // 数据比正常list多一级
    const new_array_2 = ['goods-tabs', 'article-tabs'];
    // 数据格式简单
    const new_array_3 = ['coupon'];
    // 层级更深
    const new_array_4 = ['data-magic'];
    // 自定义数据
    const new_array_5 = ['custom'];
    clone_form.diy_data = clone_form.diy_data.map((item: any) => {
        if (new_array_1.includes(item.key)) {
            item.com_data.content.data_ids = item.com_data.content.data_list.map((item: any) => item.data.id).join(',') || '';
            item.com_data.content.data_list = item.com_data.content.data_list.map((item1: any) => {
                return {
                    ...item1,
                    data: [],
                    data_id: item1.data.id,
                };
            });
            item.com_data.content.data_auto_list = [];
        } else if (new_array_2.includes(item.key)) {
            item.com_data.content.tabs_active_index = 0;
            item.com_data.content.tabs_list.map((item: any) => {
                item.data_ids = item.data_list.map((item1: any) => item1.data.id).join(',') || '';
                item.data_list = item.data_list.map((item2: any) => {
                    return {
                        ...item2,
                        data: [],
                        data_id: item2.data.id,
                    };
                });
                item.data_auto_list = [];
            });
        } else if (new_array_3.includes(item.key)) {
            item.com_data.content.data_ids = item.com_data.content.data_list.map((item: any) => item.data.id).join(',') || '';
            item.com_data.content.data_list = [];
            item.com_data.content.data_auto_list = [];
        } else if (new_array_4.includes(item.key)) {
            item.com_data.content.data_magic_list.map((item1: any) => {
                item1.data_content.goods_ids = item1.data_content.goods_list.map((item2: any) => item2.data.id).join(',') || '';
                item1.data_content.goods_list = item1.data_content.goods_list.map((item3: any) => {
                    return {
                        ...item3,
                        data: [],
                        data_id: item3.data.id,
                    };
                });
            });
        } else if (new_array_5.includes(item.key)) {
            item.com_data.content.data_source_content_value = item.com_data.content.data_source_content.id;
            item.com_data.content.data_source_content = {};
        }
        return {
            ...item,
            show_tabs: '0',
        };
    });
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
            if (is_preview) {
                preview_dialog.value = true;
                diy_id.value = String(res.data);
            }
            form.value.id = String(res.data);
            history.pushState({}, '', '?s=diy/saveinfo/id/' + res.data + '.html');
        }

        setTimeout(() => {
            save_disabled.value = false;
        }, 500);
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
            header: clone_form.header,
            footer: clone_form.footer,
            diy_data: clone_form.diy_data,
            tabs_data: clone_form.tabs_data,
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
            header: is_obj(temp_config) ? (temp_config as diyConfig).header : JSON.parse(temp_config as string).header,
            footer: is_obj(temp_config) ? (temp_config as diyConfig).footer : JSON.parse(temp_config as string).footer,
            tabs_data: is_obj(temp_config) ? (temp_config as diyConfig).tabs_data : JSON.parse(temp_config as string).tabs_data,
            diy_data: is_obj(temp_config) ? (temp_config as diyConfig).diy_data : JSON.parse(temp_config as string).diy_data,
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
            header: new_tem_form.header,
            footer: new_tem_form.footer,
            tabs_data: new_tem_form.tabs_data,
            diy_data: new_tem_form.diy_data,
        };
    }
};

// 截取document.location.search字符串内id/后面的所有字段
const get_id = () => {
    let new_id = '';
    if (document.location.search.indexOf('id/') != -1) {
        new_id = document.location.search.substring(document.location.search.indexOf('id/') + 3);
        // 去除字符串的.html
        let html_index = new_id.indexOf('.html');
        if (html_index != -1) {
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
    background-color: #f0f2f5;
    .app-wrapper-content {
        height: calc(100vh - 6rem);
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
</style>
