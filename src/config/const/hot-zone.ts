import defaultCommon from './index';
import commonTop from './common-top';
interface DefaultHotZone {
    content: {
        content_top: object;
        img: uploadList[];
        hot: hotData;
    };
    style: {
        common_style: object;
    };
}

const defaultHotZone: DefaultHotZone = {
    content: {
        content_top: {
            ...commonTop,
        },
        // { id: 1, url: '/src/assets/images/components/model-user-info/avatar.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }
        img: [],
        hot: {
            // /src/assets/images/components/model-user-info/avatar.png
            img_height: 1,
            img_width: 1,
            data: [],
        },
    },
    style: {
        common_style: defaultCommon,
    },
};

export default defaultHotZone;
