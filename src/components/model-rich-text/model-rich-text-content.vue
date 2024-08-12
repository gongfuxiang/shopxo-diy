<template>
    <div class="rich-text-content w">
        <card-container class="common-content-height">
            <div class="mb-12">展示设置</div>
            <div class="br-c">
                <!-- 工具栏 -->
                <Toolbar id="toolbar-container" :editor="editor_ref" :default-config="toolbar_config" :mode="mode" />
                <!-- 编辑器 -->
                <Editor id="editor-container" v-model="form.html" class="editor" :default-config="editor_config" :mode="mode" @on-change="handle_change" @on-created="handle_created" />
            </div>
            <upload v-model:model-value="upload_list" v-model:visible-dialog="visibleDialog" is-custom-dialog @update:model-value="upload_list_change"></upload>
        </card-container>
    </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({ html: '' }),
    },
});
const form = reactive(props.value);

const mode = ref('default'); // 编辑器模式
// 编辑器实例，必须用 shallowRef
const editor_ref = shallowRef();
const toolbar_config = ref({}); // 工具条配置
const upload_list = ref<uploadList[]>([]);
const visibleDialog = ref(false);
// 编辑器配置
interface InsertFnType {
    (url: string, alt?: string, href?: string): void;
}
const editor_config = ref({
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            // 自定义选择图片
            customBrowseAndUpload(insertFn: InsertFnType) {
                visibleDialog.value = true;
            },
        },
    },
});
const handle_created = (editor: any) => {
    editor_ref.value = editor; // 记录 editor 实例，重要！
};

const emit = defineEmits(['update:value']);
const handle_change = (editor: any) => {
    form.html = editor.getHtml();
};
const upload_list_change = (arry: uploadList[]) => {
    console.log(arry);
    const editor = editor_ref.value;
    let new_html = '';
    if (editor) {
        arry.forEach((item: uploadList) => {
            const url = item.url;
            const alt = item.title;
            new_html += `<img src="${url}" alt="${alt}" />`;
        });
        editor.setHtml(new_html);
    }
    upload_list.value = [];
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editor_ref.value;
    if (editor == null) return;
    editor.destroy();
});
</script>
<style lang="scss" scoped>
.rich-text-content {
    .editor {
        position: relative;
        height: calc(100vh - 42.5rem) !important;
        overflow-y: hidden;
    }
}
</style>
