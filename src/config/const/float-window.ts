import { get_math } from "@/utils";

interface defaultSearch {
    content: {
        button_jump: string;
        button_img: uploadList[];
        button_link: object;
    };
    style: {
        display_location: string;
        offset_number: number;
        offset_number_percentage: string;
        float_style: string;
        float_style_color: string;
    };
}
const defaultSearch: defaultSearch = {
    content: {
        button_jump: 'link',
        button_img: [],
        button_link: {},
    },
    style: {
        display_location: 'right',
        offset_number: 120,
        offset_number_percentage: '100%',
        float_style: 'shadow',
        float_style_color: '#32373a1a',
    },
};

export default defaultSearch;
