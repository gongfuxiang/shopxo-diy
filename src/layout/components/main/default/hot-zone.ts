import defaultCommon from './index';
interface DefaultHotZone {
    content: {
        img: uploadList[];
        hot: hotData;
    };
    style: {
        common_style: object;
    };
}

const defaultHotZone: DefaultHotZone = {
    content: {
        // { id: 1, url: '/src/assets/images/components/model-user-info/avatar.png', original: '头像1', title: '头像1', ext: '.png', type: 'img' }
        img: [],
        hot: {
            // /src/assets/images/components/model-user-info/avatar.png
            img_height: 1,
            img_width: 1,
            img: '',
            data: [],
        },
    },
    style: {
        common_style: defaultCommon,
    },
};

export default defaultHotZone;
