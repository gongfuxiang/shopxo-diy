import defaultHeaderNav from './default/header-nav';
import defaultFooterNav from './default/footer-nav';
import defaultVideo from './default/video';
import defaultUserInfo from './default/user-info';
import defaultRowLine from './default/row-line';
import defaultSearch from './default/search';
import defaultNavGroup from './default/nav-group';
import defaultAuxiliaryBlank from './default/auxiliary-blank';
import defaultRichText from './default/rich-text';
import defaultArticleList from './default/article-list';
import defaultArticleTabs from './default/article-tabs';
import defaultCarousel from './default/carousel';
import defaultNotice from './default/notice';
import defaultTextTitle from './default/text-title';
import defaultFloatWindow from './default/float-window';
import defaultTabs from './default/tabs';
import defaultProductList from './default/goods-list';
import defaultShopTabs from './default/goods-tabs';
import defaultImgMagic from './default/img-magic';
import defaultHotZone from './default/hot-zone';
import defaultCustom from './default/custom';
import defaultDataMagic from './default/data-magic';
import defaultCoupon from './default/coupon';
import defaultSeckill from './default/seckill'

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
    text_title: object;
    float_window: object;
    tabs: object;
    shop_list: object;
    shop_tabs: object;
    img_magic: object;
    data_magic: object;
    hot_zone: object;
    custom: object;
    coupon: object;
    seckill: object;
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
    text_title: defaultTextTitle,
    float_window: defaultFloatWindow,
    tabs: defaultTabs,
    shop_list: defaultProductList,
    shop_tabs: defaultShopTabs,
    img_magic: defaultImgMagic,
    data_magic: defaultDataMagic,
    hot_zone: defaultHotZone,
    custom: defaultCustom,
    coupon: defaultCoupon,
    seckill: defaultSeckill,
};

export default defaultSettings;
