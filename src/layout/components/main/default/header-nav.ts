interface DefaultFooterNav {
    content: {
        color_list: string[];
        title: string;
        direction: string;
        background_img_style: number;
        background_img_url: uploadList[];
    };
}
const defaultFooterNav: DefaultFooterNav = {
    content: {
        color_list: ['#f5f5f5'],
        title: '',
        direction: '0deg',
        background_img_style: 2,
        background_img_url: [],
    },
};

export default defaultFooterNav;
