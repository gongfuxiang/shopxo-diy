interface nav_group {
    id: string;
    img: uploadList[];
    title: string;
    link: object;
}

interface nav_group_content {
    nav_style: string;
    single_line: number;
    display_style: string;
    row: number;
    nav_content_list: nav_group[];
}

interface nav_group_styles {
    space: number;
    radius: number;
    radius_top_left: number;
    radius_top_right: number;
    radius_bottom_left: number;
    radius_bottom_right: number;
    is_show: string;
    is_roll: string;
    interval_time: number;
    indicator_style: string;
    indicator_location: string;
    indicator_size: number;
    indicator_radius: radiusStyle;
    actived_color: string;
    color: string;
    title_color: string;
    title_size: number;
    title_space: number;
    common_style: object;
}
