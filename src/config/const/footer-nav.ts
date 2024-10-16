import defaultCommon from './index';
import { online_url } from '@/utils';
const new_url = await online_url('/static/app/tabbar/').then((res) => res);
interface DefaultFooterNav {
    content: {
        nav_style: string;
        nav_type: string;
        nav_content: { id: string; name: string; img: uploadList[]; img_checked: uploadList[]; link: object }[];
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
            {
                id: '1',
                name: '首页',
                img: [{ id: 1, url: new_url + 'home.png', original: '', title: '', ext: '.png', type: 'img' }],
                img_checked: [{ id: 2, url: new_url + 'active/home.png', original: '', title: '', ext: '.png', type: 'img' }],
                link: {
                    name: '商城首页',
                    page: '/pages/index/index',
                },
            },
            {
                id: '2',
                name: '分类',
                img: [{ id: 3, url: new_url + 'category.png', original: '', title: '', ext: '.png', type: 'img' }],
                img_checked: [{ id: 4, url: new_url + 'active/category.png', original: '', title: '', ext: '.png', type: 'img' }],
                link: {
                    name: '商品分类',
                    page: '/pages/goods-category/goods-category',
                },
            },
            {
                id: '3',
                name: '购物车',
                img: [{ id: 5, url: new_url + 'cart.png', original: '', title: '', ext: '.png', type: 'img' }],
                img_checked: [{ id: 6, url: new_url + 'active/cart.png', original: '', title: '', ext: '.png', type: 'img' }],
                link: {
                    name: '购物车',
                    page: '/pages/cart/cart',
                },
            },
            {
                id: '4',
                name: '我的',
                img: [{ id: 7, url: new_url + 'user.png', original: '', title: '', ext: '.png', type: 'img' }],
                img_checked: [{ id: 8, url: new_url + 'active/user.png', original: '', title: '', ext: '.png', type: 'img' }],
                link: {
                    name: '我的',
                    page: '/pages/user/user',
                },
            },
        ],
    },
    style: {
        text_color_checked: 'rgba(255, 0, 0, 1)',
        default_text_color: 'rgba(0, 0, 0, 1)',
        common_style: { ...defaultCommon, color_list: [{ color: 'rgba(255,255,255,1)', color_percentage: undefined }] },
    },
};

export default defaultFooterNav;
