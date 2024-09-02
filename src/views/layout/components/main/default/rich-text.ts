import defaultCommon from './index';
interface DefaultUserInfo {
    content: {
        html: string;
    };
    style: {
        common_style: object;
    };
}
const defaultUserInfo: DefaultUserInfo = {
    content: {
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
