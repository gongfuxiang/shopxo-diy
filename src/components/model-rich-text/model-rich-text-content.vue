<template>
    <div class="rich-text-content w">
        <card-container class="common-content-height">
            <div class="mb-12">展示设置</div>
            <div class="br-c pr z-deep">
                <!-- 工具栏 -->
                <Toolbar id="toolbar-container" :editor="editor_ref" :default-config="toolbar_config" :mode="mode" />
                <!-- 编辑器 -->
                <Editor id="editor-container" ref="editorRef" v-model="form.html" class="editor" :default-config="editor_config" :mode="mode" @on-change="handle_change" @on-created="handle_created" />
            </div>
            <upload v-model:model-value="upload_list" v-model:visible-dialog="visibleDialog" :type="rich_upload_type" :limit="1" is-custom-dialog @update:model-value="upload_list_change"></upload>
        </card-container>
    </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
const props = defineProps({
    value: {
        type: Object,
        default: () => ({ html: '<p></p>' }),
    },
});
const form = reactive(props.value);

const mode = ref('default'); // 编辑器模式
const editorRef = ref<HTMLElement | null>(null);
// 编辑器实例，必须用 shallowRef
const editor_ref = shallowRef();
// 插入光标位置
const cursor_position = ref(0);
const toolbar_config = ref({}); // 工具条配置
//  上传列表
const upload_list = ref<uploadList[]>([]);
// 上传弹窗显示
const visibleDialog = ref(false);
// 上传类型
const rich_upload_type = ref('img');
// 编辑器配置
interface InsertFnType {
    (url: string, alt?: string, href?: string): void;
}
const editor_config = ref({
    placeholder: '请输入内容...',
    MENU_CONF: {
        // 自定义菜单配置
        uploadImage: {
            // 自定义选择图片
            customBrowseAndUpload(insertFn: InsertFnType) {
                rich_upload_type.value = 'img';
                visibleDialog.value = true;
                cursor_position.value = editor_ref.value.selection;
                upload_insert.value = insertFn;
            },
        },
        uploadVideo: {
            // 自定义上传视频
            customBrowseAndUpload(insertFn: InsertFnType) {
                rich_upload_type.value = 'video';
                visibleDialog.value = true;
                cursor_position.value = editor_ref.value.selection;
                upload_insert.value = insertFn;
            },
        },
    },
});
// 获取到对应的触发事件
const upload_insert = ref<any>(null);
const handle_created = (editor: any) => {
    editor_ref.value = editor; // 记录 editor 实例，重要！
};

const emit = defineEmits(['update:value']);
const handle_change = (editor: any) => {
    form.html = editor.getHtml();
};
const upload_list_change = (arry: uploadList[]) => {
    const editor = editor_ref.value;
    let new_html = '';
    if (editor) {
        arry.forEach((item: uploadList) => {
            const url = item.url;
            const alt = item.title;
            // if (rich_upload_type.value === 'img') {
            //     new_html += `<img src="${url}" alt="${alt}" />`;
            // } else if (rich_upload_type.value === 'video') {
            //     new_html += `<video src="${url}" />`;
            // }
            // 弹出框结束的时候触发添加事件
            upload_insert.value(url, alt);
        });
        // 弹出框结束之后清空数据
        upload_insert.value = null;
        // 插入图片或视频
        // if (editor.isDisabled()) editor.enable();
        // if (!editor.isFocused()) editor.focus();

        // editor.select(cursor_position.value);
        // // editor.deleteFragment();
        // editor.dangerouslyInsertHtml(new_html);
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
        img {
            max-width: 100%;
        }
        video {
            max-width: 100%;
        }
    }
}
</style>
