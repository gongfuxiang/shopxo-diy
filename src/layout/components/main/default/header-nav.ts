interface DefaultFooterNav {
    content: {
        color_list: color_list[];
        title: string;
        direction: string;
        background_img_style: number;
        background_img_url: uploadList[];
    };
}
const defaultFooterNav: DefaultFooterNav = {
    content: {
        color_list: [{ color: '#f5f5f5', color_percentage: '' }],
        title: '',
        direction: '180deg',
        background_img_style: 2,
        background_img_url: [],
    },
};

export default defaultFooterNav;
