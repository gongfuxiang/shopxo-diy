import CommonAPI from '@/api/common';
import { isEmpty } from 'lodash';
// 定义一组预定义的颜色数组，用于在各种场景中轻松引用这些颜色
// 这些颜色包括从白色到黑色的不同灰度，以及一些鲜艳的颜色，格式有十六进制、RGB、RGBA、HSV、HSL等
export const predefine_colors = ['#fff', '#ddd', '#ccc', '#999', '#666', '#333', '#000', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', '#1F93FF', '#c7158577'];
// 数据的默认值，避免没有值的时候报错
export const old_radius = { radius: 0, radius_top_left: 0, radius_top_right: 0, radius_bottom_left: 0, radius_bottom_right: 0 };
export const old_padding = { padding: 0, padding_top: 0, padding_bottom: 0, padding_left: 0, padding_right: 0 };
export const old_margin = { margin: 0, margin_top: 0, margin_bottom: 0, margin_left: 0, margin_right: 0 };
export const old_border_and_box_shadow = { border_is_show: '0', border_color: '#FF3F3F', border_style: 'solid',border_size: { padding: 1, padding_top: 1, padding_right: 1, padding_bottom: 1, padding_left: 1, }, box_shadow_color: '', box_shadow_x: 0, box_shadow_y: 0, box_shadow_blur: 0, box_shadow_spread: 0 };
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
 * 判断一个字符串是否是数字。
 * @param val 要检查的值
 * @returns 如果字符串为数字，则返回true；否则返回false。
 */
export function is_number(val: string | number): boolean {
    return typeof val == 'number' && !isNaN(val);
}


export const get_history_name = (components: any) => {
    // 输入验证
    if (!components || typeof components !== 'object' || !('name' in components)) {
        return '';
    }
    try {
        // 确保 new_name 是字符串或 undefined
        const newName = typeof components.new_name === 'string' ? components.new_name : '';
        // 返回 new_name 如果它不为空，否则返回 name
        return !isEmpty(newName) ? newName : components.name;
    } catch (error) {
        return '';
    }
}
/**
 * 获取嵌套对象的属性值
 * 
 * 该函数旨在通过指定的属性路径获取嵌套对象中的属性值它接受一个对象和一个属性路径字符串作为参数，
 * 并返回对应路径的属性值如果输入的路径无效或对象中不存在该路径，则返回空字符串
 * 
 * @param {Object} obj - 要从中获取属性的嵌套对象
 * @param {string} path - 属性路径，使用点号分隔的字符串表示
 * @returns {string} - 返回指定路径的属性值，如果路径无效则返回空字符串
 */
export function get_nested_property(obj: any, path: string): string {
    // 检查路径参数是否为字符串且非空，若不满足条件则返回空字符串
    if (typeof path !== 'string' || !path) return '';
    
    // 将属性路径字符串拆分为属性键数组
    const keys = path.split('.');

    // 使用reduce方法遍历属性键数组，逐层访问对象属性
    // 如果当前对象存在且拥有下一个属性键，则继续访问；否则返回空字符串
    return keys.reduce((o, key) => (o != null && o[key] != null ? o[key] : ''), obj) ?? '';
}

/**
 * 定义一个ListItem类型，用于描述列表项的结构
 */
type ListItem = { type: string; field: string; option?: Record<string, any> };

/**
 * 根据指定的类型和字段从列表中获取数据字段
 * 
 * @param list 列表项数组，每个项包含type和field属性
 * @param type 要匹配的类型
 * @param field 要匹配的字段名称
 * @returns 返回一个包含id和option的对象，id为匹配的字段名，option为匹配项的option属性
 */
export const get_data_fields = (list: Array<ListItem>, type: string, field: string) => {
    // 定义默认返回结果
    const defaultResult = { id: '', option: {} };
    try {
        // 如果列表为空，直接返回默认结果
        if (list.length === 0) {
            return defaultResult;
        }
        // 过滤列表，找出类型和字段都匹配的项
        const new_list = list.filter((item) => item.type === type && item.field === field);
        // 如果找到匹配的项，返回第一个匹配项的字段名和全部信息
        if (new_list.length > 0) {
            return {
                id: new_list[0].field,
                option: new_list[0],
            };
        } else {
            // 如果没有找到匹配的项，返回默认结果
            return defaultResult;
        }
    } catch (error) {
        // 捕获异常，返回默认结果
        return defaultResult;
    }
}

/**
 * 将对象或数组中的字符串转换为数字
 * 此函数递归地遍历给定对象或数组，将所有能转换为数字的字符串转换成数字类型
 * 如果字符串不能转换为数字，则保留原字符串
 *
 * @param obj 任意类型的对象或数组，需要转换其中的字符串
 * @param maxDepth 递归的最大深度，默认为100，用于防止无限递归
 * @param currentDepth 当前递归的深度，默认为0
 * @returns 转换后的对象或数组，结构与原输入相同
 */
export function convert_strings_to_numbers(obj: any, maxDepth: number = 100, currentDepth: number = 0): any {
    // 递归深度限制
    if (currentDepth >= maxDepth) {
        return obj;
    }
    if (Array.isArray(obj)) {
        // 处理数组
        return obj.map((item) => convert_strings_to_numbers(item, maxDepth, currentDepth + 1));
    } else if (is_obj(obj)) {
        // 处理对象
        return Object.keys(obj).reduce((acc: any, key: string) => {
            const value = obj[key];
            if (typeof value === 'string') {
                // 处理字符串
                const numValue = Number(value);
                if (!isNaN(numValue) && value.trim() !== '') {
                    acc[key] = numValue;
                } else {
                    acc[key] = value;
                }
            } else if (is_obj(value)) {
                // 递归处理子对象
                acc[key] = convert_strings_to_numbers(value, maxDepth, currentDepth + 1);
            } else {
                // 其他类型直接保留
                acc[key] = value;
            }
            return acc;
        }, {});
    } else {
        // 非对象类型直接返回
        return obj;
    }
}

type PaddingStyle = { padding_left: number; padding_right: number;};

type BorderStyle = { border_is_show: string; border_size?: PaddingStyle; };

export const border_width = (style: BorderStyle): number => {
    if (!style) { return 0; }
    if (style.border_is_show == '1') {
        const { padding_left = 0, padding_right = 0 } = style.border_size || {};
        return padding_left + padding_right; 
    } else { 
        return 0;
    }
}

/**
 * 接口字段数据处理函数
 * 根据提供的列表和类型，处理并返回一个包含默认值或历史值的对象
 * @param {any} list - 包含多项配置的列表，用于处理数据
 * @param {string} type - 数据类型标识符，决定是否使用历史数据
 * @param {any} data_source_content - 历史数据
 * @returns {any} - 处理后的数据对象
 */
export const interface_field_processing = (list: any, type: string, data_source_content: any) => {
    // 初始化一个空对象来存储处理后的数据
    const staging_data: any = {};
    // 如果列表不一样0，则遍历列表处理每一项
    if (!isEmpty(list)) {
        list.forEach((item: any) => {
            // 初始化值变量，根据不同的类型将被赋予不同的默认值
            let value : number | string | Array<any> = '';
            // 处理多选类型，默认值为空数组
            if (item.type == 'checkbox' || (item.type == 'select' && +item?.config?.is_multiple == 1)) {
                value = item?.config?.default ?? [];
            } else if ((item.type == 'input' && item?.config?.type == 'number') || item.type == 'switch') {
                // 处理数字或开关类型，默认值为0
                value = Number(item?.config?.default ?? 0);
            } else {
                // 其他情况，默认值为空字符串
                value = item?.config?.default ?? '';
            }
            // 如果是历史数据，且历史数据存在，则使用历史数据；否则使用默认值
            if (type == 'old') {
                staging_data[item.form_name] = data_source_content[item.form_name] == null ? value : data_source_content[item.form_name];
            } else {
                // 如果不是历史数据，直接使用默认值
                staging_data[item.form_name] = value;
            }
        })
    }
    // 返回处理后的数据对象
    return staging_data;
}

/**
 * 根据指定的条件类型和值，判断字段值是否满足条件
 * @param fieldValue 字段值，可以是任何类型
 * @param type 条件类型，如'contains', 'is-empty', 'greater-than'等
 * @param value 用于比较的值，可以是数字或字符串
 * @returns 返回一个布尔值，表示字段值是否满足指定的条件
 */
export const custom_condition_judg = (fieldValue: any, type: string, value: number | string): boolean => {
    // 处理 null 或 undefined 的情况
    if (fieldValue == null) {
        return true;
    }

    // 提前计算并缓存转换结果
    const stringValue = String(fieldValue);
    const valueStr = String(value);
    const numberValue = Number(value);
    switch (type) {
        case 'contains':
        case 'does-not-contain':
            // 处理包含和不包含的逻辑, 如果值为空，直接返回为空
            if (!isEmpty(valueStr)) {
                const result = stringValue.includes(valueStr);
                return type === 'contains' ? result : !result;
            } else {
                return true;
            }
        case 'is-empty':
        case 'is-not-empty':
            // 处理为空和不为空的逻辑
            const is_Empty = ['', '{}', '[]'].includes(stringValue.trim()) || (Array.isArray(fieldValue) && fieldValue.length === 0);
            return type === 'is-empty' ? is_Empty : !is_Empty;
        case 'greater-than':
        case 'less-than':
        case 'equal':
            // 根据字段值的类型，进行数字间的比较
            if (typeof fieldValue === 'number') {
                return compare_numbers(fieldValue, numberValue, type);
            } else if (Array.isArray(fieldValue)) {
                // 如果字段值是数组，比较数组长度和指定值
                const valueLength = fieldValue.length;
                return compare_numbers(valueLength, numberValue, type);
            } else {
                // 将字段值转换为数字进行比较, 如果是字符串的话，直接为NAN，比对不会成功，为空的时候会转为0 == 0会成功，其他情况下不会成功
                const numericFieldValue = +stringValue;
                return compare_numbers(numericFieldValue, numberValue, type);
            }
        default:
            return true;
    }
}

/**
 * 比较两个数字的大小
 * @param a 第一个数字
 * @param b 第二个数字
 * @param type 比较类型，如'greater-than', 'less-than', 'equal'等
 * @returns 根据比较类型返回比较结果
 */
const compare_numbers = (a: number, b: number, type: string): boolean => {
    switch (type) {
        case 'greater-than': return a > b;
        case 'less-than': return a < b;
        case 'equal': return a === b;
        default: return false;
    }
}


/**
 * 根据新的样式对象计算指示器的位置样式
 * 
 * 此函数根据指示器的新位置和当前位置以及底部距离来生成相应的CSS样式
 * 它处理的是一个包含指示器位置信息的对象，并返回一个字符串形式的CSS样式
 * 
 * @param new_style 包含指示器新位置和当前位置及底部距离的样式对象
 * @returns 返回计算出的指示器位置CSS样式字符串
 */
type indicator_data = { indicator_new_location: string, indicator_location: string, indicator_bottom: number }
export const get_indicator_location = (new_style: indicator_data) => {
    // 解构指示器的位置信息
    const { indicator_new_location = '',  indicator_location = '', indicator_bottom = 0 } = new_style;
    let styles = '';
    // 根据指示器的新位置是水平方向（left或right）还是垂直方向（默认）来决定如何设置样式
    if (['left', 'right'].includes(indicator_new_location)) {
        // 如果是水平方向，根据指示器的当前位置设置top、center或bottom样式
        if (indicator_location == 'flex-start') {
            styles += `top: 0px;`;
        } else if (indicator_location == 'center') {
            styles += `top: 50%; transform: translateY(-50%);`;
        } else {
            styles += `bottom: 0px;`;
        }
    } else {
        // 如果是垂直方向，根据指示器的当前位置设置left、center或right样式
        if (indicator_location == 'flex-start') {
            styles += `left: 0px;`;
        } else if (indicator_location == 'center') {
            styles += `left: 50%; transform: translateX(-50%);`;
        } else {
            styles += `right: 0px;`;
        }
    }
    // 如果有位置的处理，就使用指示器的位置处理，否则的话就用下边距处理
    styles += `${ !isEmpty(indicator_new_location) ? `${indicator_new_location}: ${ indicator_bottom }px;` : `bottom: ${ indicator_bottom }px;` }`;
    // 返回计算出的指示器位置样式
    return styles;
}

/**
 * 判断给定条件是否符合资格，主要用于自定义内部各个组件是否符合显示条件
 * @param field_list 字段列表，包含各个字段的数据
 * @param condition 条件数据，包括字段、类型和值
 * @param props 额外属性，包含自定义组和数据源等信息
 * @returns 返回一个布尔值，表示是否符合条件
 */
type condition_data = { field: string, type: string, value: string  };
export const get_is_eligible = (field_list: any[], condition: condition_data, props: any) => {
    try {
        // 条件加特殊标识，避免选择的时候出现重复的
        let new_field = condition.field;
        if (condition.field.includes('{|}')) {
            new_field = condition.field.split('{|}')[0];
        }
        // 获取对应条件字段的字段数据
        let option: any = {};
        if (field_list) {
            // 判断是否是自定义组并且 自定义组选则了对应的数据源
            if (props.isCustomGroup && !isEmpty(props.customGroupFieldId)) {
                // 取出对应自定义组的内容
                const group_option_list = field_list.find((item: any) => item.field === props.customGroupFieldId);
                // 取出自定义组内部数据源参数的详细数据
                const new_field_list = group_option_list?.data || [];
                // 通过对应条件，筛选出对应的数据
                option = new_field_list.find((item: any) => item.field === new_field);
            } else {
                option = field_list.find((item: any) => item.field === new_field);
            }
        }
        // 找不到对应的字段，就直接返回为成功，条件不存在
        if (!isEmpty(option)) {
            // 获取到字段的真实数据, option的使用主要是为了获取的他的中间参数和前缀，后缀等拼接在一起
            const field_value = custom_condition_data(new_field || '', option || {}, props.sourceList, props.isCustom);
            // 判断条件字段是否为空并且是显示面板才会生效，则直接返回true
            if (!isEmpty(new_field) && !isEmpty(condition.type) && props.isDisplayPanel) {
                return custom_condition_judg(field_value, condition.type, condition.value);
            } else {
                return true;
            }
        } else {
            return true;
        }
    } catch (error) {
        return true; // 或者根据业务需求返回适当的默认值
    }
}

/**
 * 根据数据源ID和配置选项来处理和返回特定格式的数据
 * 
 * @param data_source_id 数据源ID字符串，可以包含多个用分号分隔的ID
 * @param option 配置选项，包含数据处理的额外参数
 * @param sourceList 数据源列表，用于查找和处理数据
 * @param isCustom 是否为自定义模式，用于确定数据处理的方式
 * @returns 返回处理后的数据字符串
 */
export const custom_condition_data = (data_source_id: string, option: any, sourceList: any, isCustom: boolean) => {
    let data_value = '';
    if (data_source_id.includes(';')) {
        // 当数据源ID包含多个用分号分隔的ID时
        // 取出所有的字段，使用;分割
        const ids = data_source_id.split(';');
        let text = '';
        // 遍历每个ID，处理数据并合并
        ids.forEach((item: string, index: number) => {
            text += data_handling(item, sourceList, isCustom) + (index != ids.length - 1 ? (option?.join || '') : '');
        });
        data_value = text;
    } else {
        // 不输入商品， 文章和品牌时，从外层处理数据
        // 当数据源ID不包含分号时，直接处理数据
        data_value = data_handling(data_source_id, sourceList, isCustom);
    }
    // 根据配置选项，添加前缀和后缀到处理后的数据
    return (option?.first || '') + data_value + (option?.last || '');
}

/**
 * 数据处理函数
 * 该函数根据数据源ID和一个数据对象，返回对应的图标路径
 * 主要用于从复杂的数据结构中提取图标信息，根据是否是自定义图标，
 * 从不同的数据层级中获取信息
 * 
 * @param data_source_id 数据源ID，用于定位图标在数据结构中的位置
 * @param sourceList 包含图标数据的对象，可以是多层嵌套结构
 * @param isCustom 布尔值，指示是否为自定义图标，影响数据获取的方式
 * @returns 返回找到的图标路径，如果没有找到或数据为空，则返回空值
 */
const data_handling = (data_source_id: string, sourceList: any, isCustom: boolean) => {
    // 不输入商品， 文章和品牌时，从外层处理数据
    let new_data = get_nested_property(sourceList, data_source_id);
    // 如果是商品,品牌，文章的图片， 其他的切换为从data中取数据
    if (!isEmpty(sourceList.data) && isCustom) {
        new_data = get_nested_property(sourceList.data, data_source_id);
    }
    return new_data;
}

/**
 * 检查给定的参数是否为对象
 *
 * 此函数用于精确地验证一个变量是否为对象类型它通过以下步骤实现：
 * 1. 特殊处理 `null` 值，因为 `null` 在 JavaScript 中被当作对象处理，但实质上它不是
 * 2. 使用 `typeof` 操作符初步判断变量是否为对象
 * 3. 使用 `Object.prototype.toString.call(obj)` 方法精确判断变量是否为普通的对象
 *
 * @param obj 未知类型的参数，待检查是否为对象
 * @returns 如果参数是对象，则返回 true；否则返回 false
 */
export function is_obj(obj: unknown): boolean {
    // 特殊处理 null值，因为 typeof null 返回 "object"，但 null 并不是我们要检查的对象
    if (obj === null) return false;
    // 使用 typeof 排除非对象类型
    if (typeof obj != 'object') return false;
    // 确认是普通对象
    return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 渐变色的方法
 * color_list: [] 渐变色的存储
 * direction 渐变色的角度
 * @param {string[], string} path
 * @returns {string}
 */
export function gradient_computer(new_style: gradientStyle, is_return_all: boolean = true) {
    let color_list = new_style.color_list;
    let direction = new_style.direction;
    return gradient_handle(color_list, direction, is_return_all);
}
/**
 * 根据给定的颜色列表和方向生成一个线性渐变的CSS样式字符串。
 *
 * @param color_list 颜色列表，包含渐变中的各个颜色值。
 * @param direction 渐变的方向，可以是角度或其他CSS支持的渐变方向。
 * @param is_return_all 是否返回所有样式，包括渐变类型、颜色列表和方向。默认为false，只返回渐变样式。
 * @returns 返回一个字符串，包含生成的线性渐变样式。
 */
export function gradient_handle(color_list: color_list[], direction: string, is_return_all: boolean = true) {
    let container_common_styles = ``;
    if (color_list && color_list.length > 0) {
        if (is_return_all) {
            container_common_styles += `background:`;
        }
        container_common_styles += `linear-gradient(${direction || '180deg'},`;

        const new_color_list = JSON.parse(JSON.stringify(color_list));
        new_color_list.forEach((item: any, index: number) => {
            container_common_styles += `${item.color ? item.color : 'rgb(255 255 255 / 0%)'}`;
            if (color_list.length == 1) {
                container_common_styles += ` ${item.color_percentage || 0}%, ${item.color ? item.color : 'rgb(255 255 255 / 0%)'} 100%`;
            } else {
                if (typeof item.color_percentage === 'number') {
                    if (index == color_list.length - 1) {
                        container_common_styles += ` ${item.color_percentage}%`;
                    } else {
                        container_common_styles += ` ${item.color_percentage}%,`;
                    }
                } else {
                    if (index == color_list.length - 1) {
                        container_common_styles += ` 100%`;
                    } else if (index == 0) {
                        container_common_styles += ` 0%,`;
                    } else {
                        container_common_styles += ` ${(100 / color_list.length) * index}%,`;
                    }
                }
            }
        });
        container_common_styles += `)`;
        if (is_return_all) {
            container_common_styles += `;`;
        }
    }
    return container_common_styles;
}

/**
 * 设置内边距的方法
 * new_style: 内边距的集合
 * @param {string[], string} path
 * @returns {string}
 */
interface newPaddingStyle extends paddingStyle {
    padding_top_safe_value?: number;
}
export function padding_computer(new_style: newPaddingStyle, scale: number = 1) {
    let top = new_style.padding_top;
    if (typeof new_style.padding_top_safe_value == 'number') {
        top += new_style.padding_top_safe_value;
    }
    return `padding: ${top * scale || 0}px ${new_style.padding_right * scale || 0}px ${new_style.padding_bottom * scale || 0}px ${new_style.padding_left * scale || 0}px;`;
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
export function radius_computer(new_style: radiusStyle, scale: number = 1) {
    return `border-radius: ${new_style.radius_top_left * scale || 0}px ${new_style.radius_top_right * scale || 0}px ${new_style.radius_bottom_right * scale || 0}px ${new_style.radius_bottom_left * scale || 0}px;`;
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
    if (new_style.background_img.length > 0) {
        let url_styke = '';
        if (new_style.background_img_style == '1') {
            url_styke = 'background-repeat: repeat;';
        } else if (new_style.background_img_style == '2') {
        } else {
            url_styke = `background-repeat: no-repeat;background-position: center;`;
        }
        switch (new_style.background_img_style) {
            case '1':
                url_styke = `background-repeat: no-repeat;background-position: bottom;background-size: 100% auto;`;
                break;
            case '2':
                url_styke = `background-repeat: no-repeat;background-position: center;background-size: 100% auto;`;
                break;
            case '3':
                url_styke = 'background-repeat: repeat;';
                break;
            case '4':
                url_styke = 'background-size: cover;background-position: center;';
                break;
            default:
                url_styke = `background-repeat: no-repeat;background-position: top;background-size: 100% auto;`;
                break;
        }
        return `background-image:url(${new_style.background_img[0].url});${url_styke}`;
    } else {
        return '';
    }
}

export const border_computer = (new_style: border_style) => {
    const { border_is_show = '0', border_color = '', border_style = 'solid', border_size = { padding: 0, padding_bottom: 0, padding_left: 0, padding_right: 0, padding_top: 0 } } = new_style;
    if (border_is_show == '1') {
       return `border-width: ${border_size.padding_top}px ${border_size.padding_right}px ${border_size.padding_bottom}px ${border_size.padding_left}px;border-style: ${ border_style };border-color: ${border_color};`
    }
    return '';
};
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
    return gradient_computer(new_style) + margin_computer(new_style) + radius_computer(new_style) + box_shadow_computer(new_style) + border_computer(new_style) + `overflow:hidden;`;
}

export function common_img_computer(new_style: componentsCommonCommonStyle) {
    return padding_computer(new_style) + background_computer(new_style) + `overflow:hidden;`;
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
    const marks = (num / container_size) * 100;
    return marks.toFixed(4) + '%';
};

/**
 * 判断四个值是否相等
 *
 * @param a,b,c,d 对应的四个数字
 * @returns boolean true表示相等，false表示不相等
 */
export const areAllEqual = (a: number, b: number, c: number, d: number) => {
    if (a == null || b == null || c == null || d == null) {
        return false;
    }
    return a === b && b === c && c === d;
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
};

/**
 * 读取指定名称的cookie值
 * @param name 需要读取的cookie的名称
 * @returns 返回cookie的值，如果未找到则返回空字符串
 */
export const get_cookie = (name: string) => {
    // 初始化cookie值为空字符串
    var cookievalue = '';
    // 定义要搜索的cookie名称字符串
    var search = name + '=';
    // 检查是否存在cookie
    if (document.cookie.length > 0) {
        // 尝试查找cookie名称的位置
        let offset = document.cookie.indexOf(search);
        // 如果找到了cookie名称
        if (offset != -1) {
            // 跳过cookie名称的长度
            offset += search.length;
            // 查找cookie值的结束位置（可能是分号或者字符串末尾）
            let end = document.cookie.indexOf(';', offset);
            if (end == -1) end = document.cookie.length;
            // 提取并解码cookie值
            cookievalue = decodeURIComponent(document.cookie.substring(offset, end));
        }
    }
    // 返回获取到的cookie值
    return cookievalue;
};
/**
 * 设置cookie
 * 该函数用于设置一个cookie，包括cookie的名称、值和过期时间
 * @param name {string} - cookie的名称
 * @param value {string} - cookie的值
 * @param expire_time {number} - cookie的过期时间，单位为天
 */
export const set_cookie = (name: string, value: string, expire_time?: number) => {
    // 构造cookie字符串
    var cookie_str = name + '=' + encodeURIComponent(value);
    if (expire_time) {
        // 获取当前时间
        var now = new Date();
        // 计算过期时间
        var expire_date = new Date(now.getTime() + expire_time * 86400);
        cookie_str += ';expires=' + expire_date.toUTCString();
        // 将新增的cookie储存到cookie中，可以存储多个而不是替换
        document.cookie = cookie_str;
    } else {
        // 将新增的cookie储存到cookie中，可以存储多个而不是替换
        document.cookie = cookie_str;
    }
};

// style 风格
export const tabs_style = (color: string, style: string | number | boolean | undefined) => {
    const color_list = ['rgba(51,51,51,1)', 'rgba(255, 34, 34, 1)', 'rgba(255, 255, 255, 1)'];
    if (color_list.includes(color)) {
        if (style == '2' || style == '4') {
            return 'rgba(255, 255, 255, 1)';
        } else if (style == '3') {
            return 'rgba(255, 34, 34, 1)';
        } else {
            return 'rgba(51,51,51,1)';
        }
    } else {
        return color;
    }
};
/**
 * 获取在线资源URL的异步函数
 * 该函数根据当前环境变量的配置选择不同的方式来获取资源URL
 * 如果环境变量VITE_APP_BASE_API被设置为'/dev-api'，则从本地开发环境中导入临时数据
 * 否则，从cookie中获取资源主机地址
 * 这种设计允许开发者在不同的环境中灵活切换资源URL的来源，以适应不同的开发和生产需求
 * @param directory {string} - 资源目录名称
 * @returns {Promise<string>} 返回一个Promise，解析为包含资源URL的字符串
 */
export const online_url = async (directory: string = '') => {
    if (import.meta.env.VITE_APP_BASE_API == '/dev-api') {
        let temp_data = await import(import.meta.env.VITE_APP_BASE_API == '/dev-api' ? '../../temp.d' : '../../temp_pro.d');
        return temp_data.default.temp_attachment_host + directory;
    } else {
        // let attachemnt_host = common.config.attachment_host;
        let attachemnt_host = get_cookie('attachment_host') && get_cookie('attachment_host') !== 'null' && get_cookie('attachment_host') !== null ? get_cookie('attachment_host') : '';
        if (attachemnt_host.length <= 0) {
            await CommonAPI.getInit().then((res: any) => {
                set_cookie('attachment_host', res.data.config.attachment_host);
                attachemnt_host = res.data.config.attachment_host;
                // 将数据存到localStorage中
                localStorage.setItem('diy_init_common', res.data);
            });
        }
        return attachemnt_host + directory;
    }
};

/**
 * 调整元素的位置，使其保持在指定的最大宽度和高度范围内
 * @param x 元素的初始横坐标
 * @param y 元素的初始纵坐标
 * @param width 元素的宽度
 * @param height 元素的高度
 * @param maxWidth 屏幕的最大宽度
 * @param maxHeight 屏幕的最大高度
 * @returns 返回调整后的元素位置坐标
 */
export const adjustPosition = (x: number, y: number, width:number, height:number, maxWidth:number, maxHeight:number) => {
    // 计算元素的半宽度和半高度，用于后续计算元素的最终位置
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // 确保元素不会超出屏幕范围
    // 对于横坐标x，使用Math.max和Math.min函数限制其值在0到(maxWidth - width)之间
    // 对于纵坐标y，使用Math.max和Math.min函数限制其值在0到(maxHeight - height)之间
    x = Math.max(0, Math.min(maxWidth - width, x - halfWidth));
    y = Math.max(0, Math.min(maxHeight - height, y - halfHeight));

    // 返回调整后的元素位置坐标
    return { x, y };
}


export const getPlatform = () => {
    // 检查 navigator.platform 是否存在且不为空
    if (!navigator || !navigator.platform) {
        return 'Unknown';
    }

    const platform = navigator.platform.toLowerCase();
    
    // 使用正则表达式进行平台匹配
    const platformMap = [
        { regex: /^win/, name: 'Windows' },
        { regex: /^mac/, name: 'Mac' },
        { regex: /^linux/, name: 'Linux' },
        { regex: /android/, name: 'Android' },
        { regex: /ios/, name: 'iOS' }
    ];

    for (const { regex, name } of platformMap) {
        if (regex.test(platform)) {
            return name;
        }
    }

    return 'Unknown';
}

/**
 * 格式化日期为指定格式的时间字符串
 * 
 * @param date 日期对象
 * @param format 格式化字符串，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的时间字符串
 */
export function formatDate(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}