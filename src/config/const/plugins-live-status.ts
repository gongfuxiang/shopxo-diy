/**
 * 直播插件状态与筛选工具（与 UniApp pages/plugins/live 对齐）
 * - 列表展示：status + status_name
 * - 自动筛选：live_status（逗号分隔）、live_is_recommended（number，未选不传）
 */

/** 直播间状态默认值（接口无 status_list 时使用）0-离线, 1-在线, 2-离开, 3-封禁 */
export const LIVE_ROOM_STATUS_LIST = [
    { type: '0', name: '离线' },
    { type: '1', name: '直播中' },
    { type: '2', name: '离开' },
    { type: '3', name: '封禁' },
] as const;

/** 直播间列表项 data 字段（接口与预览占位数据共用） */
export interface LiveRoomDataLike {
    /** 接口标准字段：0离线 1在线 2离开 3封禁 */
    status?: string | number;
    /** 兼容旧字段名 */
    live_status?: string | number;
    /** 接口返回的状态文案，优先用于角标展示 */
    status_name?: string;
    /** UniApp 列表观看人数字段 */
    online_count?: string | number;
    viewer_count?: string | number;
    access_count?: string | number;
    /** 卖家名称（UniApp 列表 seller_name） */
    seller_name?: string;
}

/** 读取直播间状态值（接口字段 status，兼容 live_status） */
export const get_live_room_status = (data: LiveRoomDataLike | undefined | null): number | null => {
    if (!data) return null;
    const raw = data.status ?? data.live_status;
    if (raw === '' || raw === undefined || raw === null) return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
};

/** 是否展示直播状态角标 */
export const should_show_live_status = (data: LiveRoomDataLike | undefined | null): boolean => {
    return get_live_room_status(data) !== null;
};

/** 状态展示名称（优先接口 status_name，与 UniApp 列表一致） */
export const get_live_room_status_name = (data: LiveRoomDataLike | undefined | null): string => {
    if (data?.status_name) return String(data.status_name);
    const s = get_live_room_status(data);
    if (s === null) return '';
    const item = LIVE_ROOM_STATUS_LIST.find((it) => String(it.type) === String(s));
    return item?.name ?? '';
};

/** 筛选选项：优先后端 live.status_list，否则使用与 UniApp 一致的默认列表 */
export const get_live_status_filter_list = (plugins: Record<string, unknown> | undefined) => {
    const live = plugins?.live as { status_list?: { type: string; name: string }[] } | undefined;
    const list = live?.status_list;
    if (Array.isArray(list) && list.length > 0) {
        return list;
    }
    return [...LIVE_ROOM_STATUS_LIST];
};

/** 观看人数（与 UniApp 列表 online_count 字段一致） */
export const get_live_online_count = (data: LiveRoomDataLike | undefined | null): string | number => {
    if (!data) return '0';
    return data.online_count ?? data.viewer_count ?? data.access_count ?? '0';
};

/** 是否推荐默认选项（diyapi/init 未返回 live.is_recommended_list 时使用） */
const LIVE_IS_RECOMMENDED_FALLBACK = [
    { type: '1', name: '是' },
    { type: '0', name: '否' },
];

/** 是否推荐下拉选项：优先后端 plugins.live.is_recommended_list */
export const get_live_is_recommended_list = (plugins: Record<string, unknown> | undefined) => {
    const live = plugins?.live as { is_recommended_list?: { type: string; name: string }[] } | undefined;
    const list = live?.is_recommended_list;
    if (Array.isArray(list) && list.length > 0) {
        return list;
    }
    return [...LIVE_IS_RECOMMENDED_FALLBACK];
};

/**
 * 是否推荐转 autolivelist 参数 live_is_recommended（number）
 * 未选择时返回 undefined，请求体不包含该字段
 */
export const format_live_is_recommended = (val: string | number | null | undefined): number | undefined => {
    if (val === '' || val === null || val === undefined) return undefined;
    const n = Number(val);
    return Number.isNaN(n) ? undefined : n;
};
