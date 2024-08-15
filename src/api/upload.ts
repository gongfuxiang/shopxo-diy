import request from '@/utils/request';
import { AxiosRequestConfig } from 'axios';

class UploadAPI {
    /**  分类查询接口*/
    static getTree() {
        return request({
            url: `diyapi/attachmentinit`,
            method: 'post',
        });
    }
    /** 分类新增，修改接口 */
    static saveTree(data: any) {
        return request({
            url: `diyapi/attachmentcategorysave`,
            method: 'post',
            data,
        });
    }
    /** 分类删除接口 */
    static delTree(data: any) {
        return request({
            url: `diyapi/attachmentcategorydelete`,
            method: 'post',
            data,
        });
    }
    /** 附件移动分类 */
    static moveTree(data: any) {
        return request({
            url: `diyapi/attachmentmovecategory`,
            method: 'post',
            data,
        });
    }

    // 附件列表
    static getAttachmentList(data: any) {
        return request({
            url: `diyapi/attachmentlist`,
            method: 'post',
            data,
        });
    }
    // 附件名称修改
    static saveAttachmentName(data: any) {
        return request({
            url: `diyapi/attachmentsave`,
            method: 'post',
            data,
        });
    }
    // 附件删除
    static delAttachment(data: any) {
        return request({
            url: `diyapi/attachmentdelete`,
            method: 'post',
            data,
        });
    }
    // 附件上传
    static uploadAttachment(data: any, progress: any) {
        return request({
            url: `diyapi/attachmentupload`,
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progress,
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
    is_enable: Number;
    /** 排序 */
    sort: number;
    /** 下级 */
    items?: Tree[];
    /** 图标 */
    icon?: string;
}
