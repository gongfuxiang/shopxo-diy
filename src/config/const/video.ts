import defaultCommon from './index';
import commonTop from './common-top';
interface DefaultVideo {
    content: {
        content_top: object;
        video: uploadList[];
        video_img: uploadList[];
        video_ratio: string;
    };
    style: {
        common_style: object;
    };
}

const defaultVideo: DefaultVideo = {
    content: {
        content_top: {
            ...commonTop,
        },
        video: [],
        video_img: [],
        video_ratio: '16:9',
    },
    style: {
        common_style: defaultCommon,
    },
};

export default defaultVideo;
