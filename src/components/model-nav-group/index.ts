interface nav_group {
    id: string;
    nav_image: uploadList[];
    title: string;
    title_link: string,
}

interface nav_group_content {
    nav_style: string;
    single_line: number;
    display_style: string;
    row: number;
    nav_content_list: nav_group[];
}

interface nav_group_styles {
    radius: number;
    radius_top_left: number;
    radius_top_right: number;
    radius_bottom_left: number;
    radius_bottom_right: number;
    is_show: boolean;
    is_roll: boolean;
    interval_time: number;
    indicator_style: string;
    indicator_location: string;
    indicator_size: number;
    indicator_radius: radiusStyle;
    actived_color: string;
    color: string;
    title_color: string;
    title_size: number;
    common_style: object;
}

