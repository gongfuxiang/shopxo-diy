import defaultCommon from './index';
interface DefaultVideo {
    content: {
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
        video: [],
        video_img: [],
        video_ratio: '16:9',
    },
    style: {
        common_style: defaultCommon,
    },
};

export default defaultVideo;
