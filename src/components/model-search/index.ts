interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
interface search_content {
    is_center: boolean;
    is_icon_show: boolean;
    icon_type: string;
    icon_src: string;
    icon_img_src: uploadList[];
    search_botton_src: uploadList[];
    search_botton_icon: string;
    is_tips_show: boolean;
    tips: string;
    is_search_show: boolean;
    search_type: string;
    search_tips: string;
    hot_word_list: hot_word_list[];
}
interface search_styles {
    icon_color: string;
    button_inner_color: string;
    color_list: color_list[];
    direction: string;
    background_img_style: string;
    background_img_url: uploadList[];
    search_button_radius: object;
    tips_color: string;
    hot_words_color: string;
    search_border: string;
    search_border_radius: object;
    common_style: object;
}