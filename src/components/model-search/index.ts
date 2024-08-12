interface hot_word_list {
    id: string;
    value: string;
    color: string;
}
interface search_content {
    style_radio: string;
    style_type: string;
    logo: string;
    search_title: string;
    search_link: string;
    location: string;
    tips: string;
    hot_word_list: hot_word_list[];
}
interface search_styles {
    search_border: string;
    tips_color: string;
    hot_words_color: string;
    text_location: string;
    text_style: string;
    text_color: string;
    text_size: number;
    common_style: object;
}