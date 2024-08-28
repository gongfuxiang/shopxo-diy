import defaultCommon from './index';

interface DefaultFooterNav {
    content: {
        color_list: color_list[];
        title: string;
    };
    style: {
        background_type: string;
        background_color_list: color_list[];
        background_direction: string;
        background_img_url: uploadList[];
        background_title_color: string,
        background_title_typeface: string,
        background_title_size: number,
        function_buttons_type: string,
        immersive_style: boolean,
        up_slide_display: boolean,
        common_style: object;
    }
}
const defaultFooterNav: DefaultFooterNav = {
    content: {
        color_list: [{ color: '#f5f5f5', color_percentage: '' }],
        title: '',
    },
    style: {
        background_type: 'color',
        background_color_list: [{ color: '#fff', color_percentage: '' }],
        background_direction: '180deg',
        background_img_url: [],
        background_title_color: '#000',
        background_title_typeface: '500',
        background_title_size: 14,
        function_buttons_type: 'black',
        immersive_style: false,
        up_slide_display: true,
        common_style: defaultCommon,
    },
};

export default defaultFooterNav;
