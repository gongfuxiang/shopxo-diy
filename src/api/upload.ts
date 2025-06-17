import request from '@/utils/request';

class UploadAPI {
    /**  分类查询接口*/
    static getTree() {
        return request({
            url: `attachmentapi/attachmentcategory`,
            method: 'post',
        });
    }
    /** 分类新增，修改接口 */
    static saveTree(data: any) {
        return request({
            url: `attachmentapi/attachmentcategorysave`,
            method: 'post',
            data,
        });
    }
    /** 分类删除接口 */
    static delTree(data: any) {
        return request({
            url: `attachmentapi/attachmentcategorydelete`,
            method: 'post',
            data,
        });
    }
    /** 附件移动分类 */
    static moveTree(data: any) {
        return request({
            url: `attachmentapi/attachmentmovecategory`,
            method: 'post',
            data,
        });
    }

    // 附件列表
    static getAttachmentList(data: any) {
        return request({
            url: `attachmentapi/attachmentlist`,
            method: 'post',
            data,
        });
    }
    // 附件名称修改
    static saveAttachmentName(data: any) {
        return request({
            url: `attachmentapi/attachmentsave`,
            method: 'post',
            data,
        });
    }
    // 附件删除
    static delAttachment(data: any) {
        return request({
            url: `attachmentapi/attachmentdelete`,
            method: 'post',
            data,
        });
    }
    // 附件上传
    static uploadAttachment(data: any, progress: any) {
        return request({
            url: `attachmentapi/attachmentupload`,
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progress,
        });
    }
    // 扫码上传
    static uploadQrcode(data: any) {
        return request({
            url: `attachmentapi/attachmentscanuploaddata`,
            method: 'post',
            data,
        });
    }
    // 提取链接 --------附件远程下载
    static getAttachmentCatch(data: any) {
        return request({
            url: `attachmentapi/attachmentcatch`,
            method: 'post',
            data,
        });
    }
}

export default UploadAPI;

// 分类树结构
export interface Tree {
    /** 主键 */
    id: string;
    /** 父级id */
    pid: string;
    /** 名称 */
    name: string;
    /** 路径 */
    path: string;
    /** 是否开启 */
    is_enable: number | string;
    /** 排序 */
    sort: number;
    /** 下级 */
    items?: Tree[];
    /** 图标 */
    icon?: string;
}
