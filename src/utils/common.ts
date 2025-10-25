// 定义一组预定义的颜色数组，用于在各种场景中轻松引用这些颜色
// 这些颜色包括从白色到黑色的不同灰度，以及一些鲜艳的颜色，格式有十六进制、RGB、RGBA、HSV、HSL等
export const predefine_colors = ['#fff', '#ddd', '#ccc', '#999', '#666', '#333', '#000', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', '#1F93FF', '#c7158577'];
// 数据的默认值，避免没有值的时候报错
export const old_radius = { radius: 0, radius_top_left: 0, radius_top_right: 0, radius_bottom_left: 0, radius_bottom_right: 0 };

export const old_padding = { padding: 0, padding_top: 0, padding_bottom: 0, padding_left: 0, padding_right: 0 };

export const old_margin = { margin: 0, margin_top: 0, margin_bottom: 0, margin_left: 0, margin_right: 0 };

export const old_border_and_box_shadow = { border_is_show: '0', border_color: '#FF3F3F', border_style: 'solid',border_size: { padding: 1, padding_top: 1, padding_right: 1, padding_bottom: 1, padding_left: 1, }, box_shadow_color: '', box_shadow_x: 0, box_shadow_y: 0, box_shadow_blur: 0, box_shadow_spread: 0 };
// 只好设置
export const font_weight = [
    { name: '加粗', value: 'bold' },
    { name: '正常', value: '400' },
];

/**
 * 从URL中提取指定前缀后的ID值
 * @param prefix 前缀字符串
 * @returns 提取的ID值
 */
const extractIdFromUrl = (prefix: string): string => {
    const url = document.location.href;
    const startIndex = url.indexOf(prefix);
    if (startIndex === -1) return '';
    
    // 计算起始位置（包含前缀）
    const start = startIndex + prefix.length;
    let result = url.substring(start);
    
    // 移除.html后缀
    const dotIndex = result.indexOf('.');
    if (dotIndex !== -1) {
        result = result.substring(0, dotIndex);
    }
    
    // 移除查询参数
    const andIndex = result.indexOf('&');
    if (andIndex !== -1) {
        result = result.substring(0, andIndex);
    }
    
    // 移除路径分隔符后的部分
    const slashIndex = result.indexOf('/');
    if (slashIndex !== -1) {
        result = result.substring(0, slashIndex);
    }
    
    return result;
};

// 截取document.location.search字符串内id/后面的所有字段
export const get_id = () => {
    // 先尝试匹配 id/ 模式
    const url = document.location.href;
    const idIndex = url.indexOf('id/');
    if (idIndex !== -1) {
        const result = url.substring(idIndex + 3);
        const htmlIndex = result.indexOf('.html');
        if (htmlIndex !== -1) {
            return result.substring(0, htmlIndex);
        }
        return result.split('.')[0].split('/')[0];
    }
    
    // 尝试匹配-saveinfo-模式
    const saveinfoResult = extractIdFromUrl('-saveinfo-');
    if (saveinfoResult) return saveinfoResult;
    
    // 尝试匹配-forminputinfo-模式
    return extractIdFromUrl('-diyinfo-');
};

// 获取当前业务类型
export const get_type = () => {
    return data_handle('type/', '');
}
// 获取类型
export const get_business = () => {
    return data_handle('business/', '');
}
// 数据处理
export const data_handle = (val: string, default_val: string): string => {
    let new_data = default_val;
    // 去除origin的数据
    const url = document.location.href;
    if (url.indexOf(val) != -1) {
        new_data = url.substring(url.indexOf(val) + val.length);
        // 去除字符串的.html
        // 去除并且数据
        if (new_data.indexOf('&') != -1) {
            new_data = new_data.split('&')[0];
        }
        const dot_data = new_data.split('.')[0];
        if (dot_data != '') {
            new_data = dot_data.split('/')[0];
        }
        return new_data;
    } else {
        return new_data;
    }
}