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
        common_style: defaultCommon,
    },
};

export default defaultUserInfo;
