import defaultCommon from './index';
interface DefaultUserInfo {
    content: {
        user_info: string[];
        icon_setting: { id: string; src: uploadList[]; href: object; icon: string }[];
    };
    style: {
        user_avatar_size: string;
        user_name_color: string;
        user_name_weight: string;
        user_name_size: number;
        user_id_color_list: color_list[];
        user_id_color: string;
        user_id_direction: string;
        user_id_weight: string;
        user_id_size: number;
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
        user_info: ['1', '2', '3', '4', '5'],
        icon_setting: [
            { id: '1', src: [], icon: 'applet-me-settings-acquiesce', href: {} },
            { id: '2', src: [], icon: 'applet-me-message-acquiesce', href: {} },
        ],
    },
    style: {
        user_avatar_size: '60',
        user_name_color: 'rgba(0, 0, 0, 1)',
        user_name_weight: '500',
        user_name_size: 16,
        user_id_color_list: [
            { color: 'rgba(254, 184, 143, 1)', color_percentage: undefined },
            { color: 'rgba(255, 227, 220, 1)', color_percentage: undefined },
        ],
        user_id_color: 'rgba(0, 0, 0, 1)',
        user_id_direction: '90deg',
        user_id_weight: '400',
        user_id_size: 10,
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
