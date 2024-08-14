import defaultCommon from './index';
interface DefaultFooterNav {
    content: {
        nav_style: string;
        nav_type: string;
        nav_content: { id: string; name: string; src: uploadList[]; src_checked: uploadList[]; href: object }[];
    };
    style: {
        text_color_checked: string;
        default_text_color: string;
        common_style: object;
    };
}
const defaultFooterNav: DefaultFooterNav = {
    content: {
        nav_style: '0',
        nav_type: '0',
        nav_content: [
            { id: '1', name: '首页', src: [{ id: 1, url: '/src/assets/images/layout/main/phone.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], src_checked: [{ id: 1, url: '/src/assets/images/layout/main/phone.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], href: {} },
            { id: '2', name: '分类', src: [{ id: 1, url: '/src/assets/images/layout/main/phone.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], src_checked: [{ id: 1, url: '/src/assets/images/layout/main/phone.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], href: {} },
            { id: '3', name: '购物车', src: [{ id: 1, url: '/src/assets/images/layout/main/phone.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], src_checked: [{ id: 1, url: '/src/assets/images/layout/main/phone.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], href: {} },
            { id: '4', name: '我的', src: [{ id: 1, url: '/src/assets/images/layout/main/phone.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], src_checked: [{ id: 1, url: '/src/assets/images/layout/main/phone.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], href: {} },
        ],
    },
    style: {
        text_color_checked: 'rgba(204, 204, 204, 1)',
        default_text_color: 'rgba(0, 0, 0, 1)',
        common_style: { ...defaultCommon, color_list: [{ color: 'rgba(255,255,255,1)', color_percentage: '' }]},
    },
};

export default defaultFooterNav;
