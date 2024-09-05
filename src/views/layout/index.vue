<template>
    <div v-loading.fullscreen.lock="loading" class="app-wrapper no-copy" element-loading-background="rgba(255,255,255,1)" element-loading-custom-class="loading-custom">
        <template v-if="!is_empty">
            <navbar v-model="form.model" @preview="preview" @save="save" @save-close="save_close" />
            <div class="app-wrapper-content flex-row">
                <app-main :diy-data="form.diy_data" :header="form.header" :footer="form.footer" @right-update="right_update" @import="import_data_event" @export="export_data_event"></app-main>
                <settings :key="key" :value="diy_data_item"></settings>
            </div>
        </template>
        <template v-else>
            <no-data height="100vh" img-width="260px" size="16px" text="编辑数据有误"></no-data>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { UploadFile, UploadFiles } from 'element-plus';
import { Navbar, Settings, AppMain } from './components/index';
import defaultSettings from './components/main/index';
import { cloneDeep } from 'lodash';
import DiyAPI, { diyData } from '@/api/diy';
import CommonAPI from '@/api/common';
import { commonStore } from '@/store';
const common_store = commonStore();
interface headerAndFooter {
    name: string;
    show_tabs: string;
    key: string;
    com_data: any;
}
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
    diy_data: Array<any>;
}
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
        com_data: defaultSettings.header_nav,
    },
    footer: {
        name: '底部导航',
        show_tabs: '0',
        key: 'footer-nav',
        com_data: defaultSettings.footer_nav,
    },
    diy_data: [],
});
const diy_data_item = ref({});

const key = ref('');
const api_count = ref(0);

const right_update = (item: any, diy: [Array<any>], header: headerAndFooter, footer: headerAndFooter) => {
    diy_data_item.value = item;
    form.value.diy_data = diy;
    form.value.header = header;
    form.value.footer = footer;
    // 生成随机id
    key.value = Math.random().toString(36).substring(2);
};
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
const export_data_event = () => {
    if (get_id()) {
        ElMessageBox.confirm('导出前需先保存最新数据，是否继续？', '提示')
            .then(() => {
                const index = window.location.href.lastIndexOf('?s=');
                const pro_url = window.location.href.substring(0, index);
                const new_url = import.meta.env.VITE_APP_BASE_API == '/dev-api' ? import.meta.env.VITE_APP_BASE_API_URL : pro_url;
                window.open(new_url + '?s=diyapi/diydownload/id/' + get_id() + '.html', '_blank');
            })
            .catch(() => {});
    } else {
        ElMessage.warning('请先保存,再导出');
    }
};
//#region 页面初始化数据 ---------------------start
// 页面加载
onMounted(() => {
    init();
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
            api_count.value += 1;
            loading_event(api_count.value);
        });
    } else {
        api_count.value = 1;
        loading_event(api_count.value);
    }
};

// 初始化公共数据
const common_init = () => {
    CommonAPI.getInit().then((res: any) => {
        // article_category ---- 文章分类
        // attachment_category ---- 附件分类
        // brand_category; ---- 品牌分类
        // brand_list ---- 品牌列表
        // goods_category ---- 商品分类
        // module_list ---- 模块列表
        //page_link_list ---- 页面链接
        common_store.set_common(res.data);
        api_count.value += 1;
        loading_event(api_count.value);
    });
};
// 加载动画
const loading = ref(true);
const loading_event = (count: number) => {
    if (count == 2) {
        setTimeout(() => {
            loading.value = false;
        }, 500);
    }
};
//#endregion 页面初始化数据 ---------------------end

//#region 顶部导航回调方法 ---------------------start
const preview = () => {
    console.log('预览');
};
const save = () => {
    formmat_form_data(form.value);
};
const save_close = () => {
    formmat_form_data(form.value, true);
};
const formmat_form_data = (data: diy_data_item, close: boolean = false) => {
    const clone_form = cloneDeep(data);
    clone_form.header.show_tabs = '1';
    clone_form.footer.show_tabs = '0';
    clone_form.diy_data = clone_form.diy_data.map((item: any) => {
        return {
            ...item,
            show_tabs: '0',
        };
    });
    // 将数据暂存到localStorage
    // localStorage.setItem('diy_data', JSON.stringify(clone_form));
    // 数据改造
    const new_data = diy_data_transfor_form_data(clone_form);
    DiyAPI.save(new_data).then((res) => {
        ElMessage.success('保存成功');
        if (close) {
            ElMessageBox.confirm('您确定要关闭本页吗？', '提示')
                .then(() => {
                    // 关闭页面
                    window.close();
                })
                .catch(() => {});
        } else {
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
            header: clone_form.header,
            footer: clone_form.footer,
            diy_data: clone_form.diy_data,
        }),
    };
};
const form_data_transfor_diy_data = (clone_form: diyData) => {
    try {
        return {
            id: clone_form.id,
            model: {
                logo: clone_form.logo,
                name: clone_form.name,
                is_enable: clone_form.is_enable,
                describe: clone_form.describe,
            },
            header: JSON.parse(clone_form.config).header,
            footer: JSON.parse(clone_form.config).footer,
            diy_data: JSON.parse(clone_form.config).diy_data,
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
            header: form.value.header,
            footer: form.value.footer,
            diy_data: form.value.diy_data,
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
