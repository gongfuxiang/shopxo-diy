import defaultCommon from './index';
interface DefaultUserInfo {
    content: {
        config: string[];
        icon_setting: { id: string; img: uploadList[]; link: object; icon: string }[];
    };
    style: {
        user_avatar_size: string;
        user_name_color: string;
        user_name_weight: string;
        user_name_size: number;
        number_code_color_list: color_list[];
        number_code_color: string;
        number_code_direction: string;
        number_code_weight: string;
        number_code_size: number;
        img_size: string;
        img_space: string;
        stats_name_color: string;
        stats_name_weight: string;
        stats_name_size: number;
        stats_number_color: string;
        stats_number_weight: string;
        stats_number_size: number;
        common_style: object;
    };
}
const defaultUserInfo: DefaultUserInfo = {
    content: {
        config: ['order_count', 'goods_favor_count', 'goods_browse_count', 'integral_number', 'number_code'],
        icon_setting: [
            { id: '1', img: [], icon: 'setup', link: { name: '设置中心', page: '/pages/setup/setup' } },
            { id: '2', img: [], icon: 'bell', link: { name: '我的消息', page: '/pages/message/message' } },
        ],
    },
    style: {
        user_avatar_size: '60',
        user_name_color: 'rgba(0, 0, 0, 1)',
        user_name_weight: '500',
        user_name_size: 16,
        number_code_color_list: [
            { color: 'rgba(254, 184, 143, 1)', color_percentage: undefined },
            { color: 'rgba(255, 227, 220, 1)', color_percentage: undefined },
        ],
        number_code_color: 'rgba(0, 0, 0, 1)',
        number_code_direction: '90deg',
        number_code_weight: '400',
        number_code_size: 10,
        img_size: '23',
        img_space: '25',
        stats_name_color: 'rgba(0, 0, 0, 1)',
        stats_name_weight: '400',
        stats_name_size: 12,
        stats_number_color: 'rgba(0, 0, 0, 1)',
        stats_number_weight: '500',
        stats_number_size: 16,
        common_style: {
            ...defaultCommon,
            color_list: [{ color: '#fff', color_percentage: undefined }],
        },
    },
};

export default defaultUserInfo;
