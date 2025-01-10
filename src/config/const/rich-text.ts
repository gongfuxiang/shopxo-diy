import defaultCommon from './index';
import commonTop from './common-top';
interface DefaultUserInfo {
    content: {
        content_top: object;
        html: string;
    };
    style: {
        common_style: object;
    };
}
const defaultUserInfo: DefaultUserInfo = {
    content: {
        content_top: {
            ...commonTop,
        },
        html: '',
    },
    style: {
        common_style: {
            ...defaultCommon,
            color_list: [{ color: '#fff', color_percentage: undefined }],
            padding: 15,
            padding_top: 15,
            padding_bottom: 15,
            padding_left: 15,
            padding_right: 15,
        },
    },
};

export default defaultUserInfo;
