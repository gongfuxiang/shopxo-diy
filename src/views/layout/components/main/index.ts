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
import defaultBlogList from '@/config/const/blog-list';
import defaultBlogTabs from '@/config/const/blog-tabs';
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
import defaultRealstore from '@/config/const/realstore';
import defaultShop from '@/config/const/shop';
import defaultBinding from '@/config/const/binding';
import defaultSalerecords from '@/config/const/salerecords';
import defaultAsk from '@/config/const/ask';
import defaultAskTabs from '@/config/const/ask-tabs';
import defaultActivity from '@/config/const/activity';
import defaultGoodsMagic from '@/config/const/goods-magic';

// 系统设置
interface DefaultSettings {
    header_nav: object;
    footer_nav: object;
    video: object;
    user_info: object;
    article_list: object;
    article_tabs: object;
    blog: object;
    blog_tabs: object;
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
    realstore: object;
    shop: object;
    binding: object;
    salerecords: object;
    ask: object;
    ask_tabs: object;
    activity: object;
    goods_magic: object;
}

const defaultSettings: DefaultSettings = {
    header_nav: defaultHeaderNav,
    footer_nav: defaultFooterNav,
    video: defaultVideo,
    user_info: defaultUserInfo,
    article_list: defaultArticleList,
    article_tabs: defaultArticleTabs,
    blog: defaultBlogList,
    blog_tabs: defaultBlogTabs,
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
    realstore: defaultRealstore,
    shop: defaultShop,
    binding: defaultBinding,
    salerecords: defaultSalerecords,
    ask: defaultAsk,
    ask_tabs: defaultAskTabs,
    activity: defaultActivity,
    goods_magic: defaultGoodsMagic,
};

export default defaultSettings;
