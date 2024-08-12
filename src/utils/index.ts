/**
 * 判断一个对象是否为空。
 *
 * 为空的定义是对象的键的数量为0。这适用于任何对象，包括普通对象、数组（视为对象）等。
 * 该函数不直接使用`Object.keys(obj).length === 0`进行判断，而是通过封装这个逻辑来提供一个独立的、可重用的函数。
 * 这样做可以增加代码的可读性和可维护性，并且抽象了对象为空的检查，使得调用者不需要关心具体的实现细节。
 *
 * @param obj 要检查的对象。可以是任何类型的对象，包括数组。
 * @returns 如果对象为空，则返回true；否则返回false。
 */
export function is_obj_empty(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

/**
 * 渐变色的方法
 * color_list: [] 渐变色的存储
 * direction 渐变色的角度
 * @param {string[], string} path
 * @returns {string}
 */
export function gradient_computer(new_style: gradientStyle) {
    let color_list = new_style.color_list;
    let direction = new_style.direction;
    return gradient_handle(color_list, direction);
}
/**
 * 根据给定的颜色列表和方向生成一个线性渐变的CSS样式字符串。
 *
 * @param color_list 颜色列表，包含渐变中的各个颜色值。
 * @param direction 渐变的方向，可以是角度或其他CSS支持的渐变方向。
 * @returns 返回一个字符串，包含生成的线性渐变样式。
 */
export function gradient_handle(color_list: string[], direction: string) {
    let container_common_styles = ``;
    if (color_list && color_list.length > 0) {
        container_common_styles += `background: linear-gradient(${direction || '0deg'},`;
        // 颜色反转
        const new_color_list = JSON.parse(JSON.stringify(color_list));
        const reverse_color = new_color_list.reverse();
        reverse_color.forEach((item: any, index: number) => {
            container_common_styles += `${item ? item : 'rgb(255 255 255 / 0%)'}`;
            if (color_list.length == 1) {
                container_common_styles += `0%, ${item} 100%`;
            } else {
                if (index == color_list.length - 1) {
                    container_common_styles += ` 100%`;
                } else if (index == 0) {
                    container_common_styles += ` 0%,`;
                } else {
                    container_common_styles += ` ${(100 / color_list.length) * index}%,`;
                }
            }
        });
        container_common_styles += `);`;
    }
    return container_common_styles;
}

/**
 * 设置内边距的方法
 * new_style: 内边距的集合
 * @param {string[], string} path
 * @returns {string}
 */
export function padding_computer(new_style: internalStyle) {
    return `padding: ${new_style.padding_top || 0}px ${new_style.padding_right || 0}px ${new_style.padding_bottom || 0}px ${new_style.padding_left || 0}px;`;
}

/**
 * 设置外边距的方法
 * new_style: 外边距的集合
 * @param {string[], string} path
 * @returns {string}
 */
export function margin_computer(new_style: marginStyle) {
    return `margin: ${new_style.margin_top || 0}px ${new_style.margin_right || 0}px ${new_style.margin_bottom || 0}px ${new_style.margin_left || 0}px;`;
}

/**
 * 设置圆角的方法
 * new_style: 外边距的集合
 * @param {string[], string} path
 * @returns {string}
 */
export function radius_computer(new_style: radiusStyle) {
    return `border-radius: ${new_style.radius_top_left || 0}px ${new_style.radius_top_right || 0}px ${new_style.radius_bottom_right || 0}px ${new_style.radius_bottom_left || 0}px;`;
}

/**
 * 设置阴影样式
 * new_style: 外边距的集合
 * @param {string[], string} path
 * @returns {string}
 */
export function box_shadow_computer(new_style: boxShadowStyle) {
    return `box-shadow: ${new_style.box_shadow_x || 0}px ${new_style.box_shadow_y || 0}px ${new_style.box_shadow_blur || 0}px ${new_style.box_shadow_spread || 0}px ${new_style.box_shadow_color || 'rgba(0,0,0,0)'};`;
}

/**
 * 设置阴影样式
 * new_style: 外边距的集合
 * @param {string[], string} path
 * @returns {string}
 */
export function background_computer(new_style: backgroundImgUrlStyle) {
    if (new_style.background_img_url.length > 0) {
        let url_styke = '';
        if (new_style.background_img_style == 1) {
            url_styke = 'background-repeat: repeat;';
        } else if (new_style.background_img_style == 2) {
            url_styke = 'background-size: cover;background-position: center;';
        } else {
            url_styke = `background-repeat: no-repeat;background-position: center;`;
        }
        return `background-image:url(${new_style.background_img_url[0].url});${url_styke}`;
    } else {
        return '';
    }
}
/**
 * 计算并组合组件的常用样式。
 *
 * 该函数通过调用一系列特定样式的计算函数，来组装一个组件的常用样式字符串。
 * 这些样式包括渐变色、内边距、外边距、圆角和阴影等，为组件提供了一套完整的外观定义。
 *
 * @param new_style  组件的新样式对象，包含了需要计算的样式属性。
 * @returns 返回一个字符串，包含了计算后的样式定义，可以被直接应用于组件的样式属性。
 */
export function common_styles_computer(new_style: componentsCommonCommonStyle) {
    return gradient_computer(new_style) + padding_computer(new_style) + margin_computer(new_style) + radius_computer(new_style) + box_shadow_computer(new_style) + background_computer(new_style);
}

/**
 * 生成一个随机数学字符串。
 * @returns {string} 一个6位的36进制随机字符串。
 */
export function get_math() {
    // 通过Math.random()生成随机数，并转换为36进制的字符串
    let randomString = Math.random().toString(36);
    // 确保随机字符串至少有6位，因为substring(2)可能会使短于6位的字符串产生错误。
    // 如果字符串长度不足6位，通过padStart将其前面填充为0，直到长度达到6位。
    randomString = randomString.length >= 6 ? randomString : randomString.padStart(6, '0');
    // 截取掉随机字符串开头的'0.'部分，获得最终的6位随机字符串。
    return randomString.substring(2);
}

/**
 * 附件字节大小转换为单位
 * @author  Devil
 * @blog    http://gong.gg/
 * @version 1.0.0
 * @date    2024-07-21
 * @desc    description
 * @param   {int}        size [文件大小]
 */
export function annex_size_to_unit(size: number = 0) {
    var unit = 'KB';
    var kb = size / 1024;
    if (kb < 1024) {
        unit = 'KB';
        size = Math.round(kb * 100) / 100;
    } else if (kb < 1024 * 1024) {
        unit = 'MB';
        size = Math.round((size / (1024 * 1024)) * 100) / 100;
    } else if (kb < 1024 * 1024 * 1024) {
        unit = 'GB';
        size = Math.round((size / (1024 * 1024 * 1024)) * 100) / 100;
    }
    return size + unit;
}
/**
 * 获取文件名的扩展名。
 * 该函数用于从给定的文件名中提取扩展名。它通过寻找文件名中最后一个点字符的位置来确定扩展名的开始，
 * 并返回从该位置到字符串结尾的所有字符。如果文件名中没有点字符，或者点字符位于文件名的开头，
 * 则表示没有扩展名，函数将返回空字符串。
 *
 * @param name 文件名或路径名。
 * @returns 文件名的扩展名，如果不存在扩展名则返回空字符串。
 */
export const ext_name = (name: string) => {
    // 查找最后一个点字符的位置。
    const i = name.lastIndexOf('.');
    // 如果找到了点字符，并且点字符不是在字符串的开头（即确保它是扩展名的一部分）。
    if (i >= 0) {
        // 从点字符位置到字符串末尾提取扩展名，并转换为小写。
        return name.substring(i).toLowerCase();
    }
    // 如果没有找到点字符，或者点字符在字符串的开头，返回空字符串。
    return '';
};


/**
 * 将大小计算成百分比
 *
 * @param num 当前的大小或位置。
 * @param size 容器的大小。
 * @returns 计算后的百分比值，含4位小数
 */
export const percentage_count = (num: number, container_size: number) => {
    const marks = num / container_size * 100;
    return marks.toFixed(4)+ '%';
}

/**
 * 计算当前偏移量
 *
 * @param size 当前的组件的大小宽或者高。
 * @param location 容器的位置的偏移量。
 * @param container_size 对应位置的容器的大小
 * @returns 偏移量
 */
export const location_compute = (size: number, location: number, container_size: number) => {
    if (size + location >= container_size) {
        const deviation = container_size - size;
        if (deviation >= 0) {
            return deviation;
        } else {
            return 0;
        }
    } else {
        return location;
    }
}