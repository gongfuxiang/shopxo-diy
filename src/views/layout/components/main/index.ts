import defaultHeaderNav from '@/config/const/header-nav';
import defaultFooterNav from '@/config/const/footer-nav';
import defaultVideo from '@/config/const/video';
import defaultUserInfo from '@/config/const/user-info';
import defaultRowLine from '@/config/const/row-line';
import defaultSearch from '@/config/const/search';
import defaultNavGroup from '@/config/const/nav-group';
import defaultAuxiliaryBlank from '@/config/const/auxiliary-blank';
import defaultRichText from '@/config/const/rich-text';
import defaultArticleList from '@/config/const/article-list';
import defaultArticleTabs from '@/config/const/article-tabs';
import defaultCarousel from '@/config/const/carousel';
import defaultNotice from '@/config/const/notice';
import defaultTitle from '@/config/const/title';
import defaultFloatWindow from '@/config/const/float-window';
import defaultTabs from '@/config/const/tabs';
import defaultGoodsList from '@/config/const/goods-list';
import defaultGoodsTabs from '@/config/const/goods-tabs';
import defaultDataTabs from '@/config/const/data-tabs';
import defaultImgMagic from '@/config/const/img-magic';
import defaultHotZone from '@/config/const/hot-zone';
import defaultCustom from '@/config/const/custom';
import defaultDataMagic from '@/config/const/data-magic';
import defaultCoupon from '@/config/const/coupon';
import defaultSeckill from '@/config/const/seckill';
import defaultTabsCarousel from '@/config/const/tabs-carousel';

// 系统设置
interface DefaultSettings {
    header_nav: object;
    footer_nav: object;
    video: object;
    user_info: object;
    article_list: object;
    article_tabs: object;
    row_line: object;
    auxiliary_blank: object;
    rich_text: object;
    search: object;
    nav_group: object;
    carousel: object;
    notice: object;
    title: object;
    float_window: object;
    tabs: object;
    goods_list: object;
    goods_tabs: object;
    data_tabs: object;
    img_magic: object;
    data_magic: object;
    hot_zone: object;
    custom: object;
    coupon: object;
    seckill: object;
    tabs_carousel: object;
}

const defaultSettings: DefaultSettings = {
    header_nav: defaultHeaderNav,
    footer_nav: defaultFooterNav,
    video: defaultVideo,
    user_info: defaultUserInfo,
    article_list: defaultArticleList,
    article_tabs: defaultArticleTabs,
    row_line: defaultRowLine,
    auxiliary_blank: defaultAuxiliaryBlank,
    rich_text: defaultRichText,
    search: defaultSearch,
    nav_group: defaultNavGroup,
    carousel: defaultCarousel,
    notice: defaultNotice,
    title: defaultTitle,
    float_window: defaultFloatWindow,
    tabs: defaultTabs,
    goods_list: defaultGoodsList,
    goods_tabs: defaultGoodsTabs,
    data_tabs: defaultDataTabs,
    img_magic: defaultImgMagic,
    data_magic: defaultDataMagic,
    hot_zone: defaultHotZone,
    custom: defaultCustom,
    coupon: defaultCoupon,
    seckill: defaultSeckill,
    tabs_carousel: defaultTabsCarousel,
};

export default defaultSettings;
