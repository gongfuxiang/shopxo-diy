const defaultCommon: componentsCommonCommonStyle = {
    direction: '90deg',
    color_list: [{ color: '', color_percentage: undefined }],
    background_img_style: '0',
    floating_up: 0,
    is_bottom_up: '0',
    padding_top_safe_value: 0, // 安全距离值，在顶部时，需要加上安全距离，防止遮挡
    padding: 0,
    padding_top: 0,
    padding_bottom: 0,
    padding_left: 0,
    padding_right: 0,
    margin: 0,
    margin_top: 0,
    margin_bottom: 0,
    margin_left: 0,
    margin_right: 0,
    radius: 0,
    radius_top_left: 0,
    radius_top_right: 0,
    radius_bottom_left: 0,
    radius_bottom_right: 0,
    box_shadow_color: '',
    box_shadow_x: 0,
    box_shadow_y: 0,
    box_shadow_blur: 0,
    box_shadow_spread: 0,
    background_img: [] as uploadList[],
};

export default defaultCommon;
