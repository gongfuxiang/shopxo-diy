interface DefaultSetting {
    page_size: number;
    order_by_type: string;
    order_by_rule: string;
    is_cover: string;
    category_ids: string[];
    brand_ids: string[];
    coupon_ids: string[];
}

const defaultSetting: DefaultSetting = {
    page_size: 4,
    order_by_type: '0',
    order_by_rule: '0',
    // 文章封面
    is_cover: '0',
    // 分类id
    category_ids: [],
    // 品牌分类id
    brand_ids: [],
    // 优惠券分类id
    coupon_ids: [],
};

export default defaultSetting;
