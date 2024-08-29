import defaultCommon from './index';

interface DefaultFooterNav {
    content: {
        theme: string;
        title: string;
        link: object;
        indicator_location: string;
        bottom_navigation_show: string;
    };
    style: {
        background_type: string;
        background_color_list: color_list[];
        background_direction: string;
        background_img_style: number;
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
        theme: '1',
        title: '',
        link: {},
        indicator_location: 'center',
        bottom_navigation_show: '1'
    },
    style: {
        background_type: 'color_image',
        background_color_list: [{ color: '#fff', color_percentage: undefined }],
        background_direction: '180deg',
        background_img_style: 2,
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
