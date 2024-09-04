import defaultCommon from './index';
import { online_url } from '@/utils';
const new_url = await online_url('/static/app/tabbar/').then((res) => res);
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
const defaultFooterNav = ref<DefaultFooterNav>({
    content: {
        nav_style: '0',
        nav_type: '0',
        nav_content: [
            { id: '1', name: '首页', src: [{ id: 1, url: new_url + 'home.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], src_checked: [{ id: 1, url: new_url + 'active/home.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], href: {} },
            { id: '2', name: '分类', src: [{ id: 1, url: new_url + 'category.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], src_checked: [{ id: 1, url: new_url + 'active/category.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], href: {} },
            { id: '3', name: '购物车', src: [{ id: 1, url: new_url + 'cart.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], src_checked: [{ id: 1, url: new_url + 'active/cart.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], href: {} },
            { id: '4', name: '我的', src: [{ id: 1, url: new_url + 'user.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], src_checked: [{ id: 1, url: new_url + 'active/user.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }], href: {} },
        ],
    },
    style: {
        text_color_checked: 'rgba(255, 0, 0, 1)',
        default_text_color: 'rgba(0, 0, 0, 1)',
        common_style: { ...defaultCommon, color_list: [{ color: 'rgba(255,255,255,1)', color_percentage: undefined }] },
    },
});

export default defaultFooterNav;
