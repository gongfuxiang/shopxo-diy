<template>
    <!-- 地图 -->
    <div class="container w">
        <div id="map" class="map radius-md" :style="{ width: width, height: height }"></div>
    </div>
</template>
<script>
import { commonStore } from '@/store';
export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: '上海市黄浦区上海中心大厦',
        },
        // 是否可拖拽
        draggable: {
            type: Boolean,
            default: true,
        },
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '350px',
        },
        type: {
            type: String,
            default: 'baidu', // 地图类型 默认1.tianditu天地图/2.baidu百度地图/3.tencent腾讯地图/4.amap高德地图
        },
    },
    emits: ['point'],
    setup(props, context) {
        const common_store = commonStore();
        const common_amap_map_ak = common_store.common.config.common_amap_map_ak;
        const common_amap_map_safety_ak = common_store.common.config.common_amap_map_safety_ak;
        const common_baidu_map_ak = common_store.common.config.common_baidu_map_ak;
        const common_tencent_map_ak = common_store.common.config.common_tencent_map_ak;
        const common_tianditu_map_ak = common_store.common.config.common_tianditu_map_ak;
        const map = ref(null);
        const lng = ref(121.47894);
        const lat = ref(31.223);
        watch(
            () => props.modelValue,
            (val) => {
                if (!val) return;
                map_event(val);
            }
        );
        onMounted(() => {
            load_map_script(); // 加载地图资源
        });
        const load_map_script = () => {
            // 此处在所需页面引入资源就是，不用再public/index.html中引入
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.className = 'loadmap'; // 给script一个类名
            if (props.type === 'tianditu') {
                // 天地图
                script.src = `https://api.tianditu.gov.cn/api?v=4.0&tk=${common_tianditu_map_ak || 'bf0676d6b99ee6f7f917640a54af0415'}`;
            } else if (props.type === 'baidu') {
                // 百度地图
                script.src = `https://api.map.baidu.com/getscript?v=3.0&ak=${common_baidu_map_ak || 'XSdiGjfg3wOHiKjpYEMG6CYA'}`;
            } else if (props.type === 'tencent') {
                // 腾讯地图
                script.src = `https://map.qq.com/api/js?v=2.exp&key=${common_tencent_map_ak || 'IMYBZ-QJ6C3-QPZ3Y-OUKL6-IVU5S-ZYBKA'}&callback=init`;
            } else if (props.type === 'amap') {
                // 高德地图
                script.src = `https://webapi.amap.com/maps?v=2.0&key=${common_amap_map_ak || '3e92c6bfdd5ddb4aac39ed5e4d0db663'}`;
            }
            // 使用script.onload，待资源加载完成，再初始化地图
            if (props.type === 'tencent') {
                window.init = () => {
                    init();
                };
                load_tx_map();
            } else {
                script.onload = () => {
                    init();
                };
            }
            let loadmap = document.getElementsByClassName('loadmap');
            if (loadmap) {
                // 每次append script之前判断一下，避免重复添加script资源标签
                for (var i = 0; i < loadmap.length; i++) {
                    document.body.removeChild(loadmap[i]);
                }
            }
            if (props.type === 'amap') {
                window._AMapSecurityConfig = {
                    securityJsCode: common_amap_map_safety_ak || '6d68c17c7b2a96a0616b1b8c371f391f',
                };
            }
            document.body.appendChild(script);
        };

        const load_tx_map = () => {
            // 此处在所需页面引入资源就是，不用再public/index.html中引入
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.className = 'loadmap2'; // 给script一个类名
            script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${common_tencent_map_ak || 'IMYBZ-QJ6C3-QPZ3Y-OUKL6-IVU5S-ZYBKA'}&libraries=service`;
            let loadmap2 = document.getElementsByClassName('loadmap2');
            if (loadmap2) {
                // 每次append script之前判断一下，避免重复添加script资源标签
                for (var i = 0; i < loadmap2.length; i++) {
                    document.body.removeChild(loadmap2[i]);
                }
            }
            document.body.appendChild(script);
        };
        // 初始化地图
        const init = () => {
            switch (props.type) {
                case 'tianditu':
                    const T = window.T;
                    // 坐标
                    map.value = new T.Map('map');
                    let point = new T.LngLat(lng.value, lat.value);
                    map.value.centerAndZoom(point, 10);
                    // 禁止鼠标滚动缩小放大
                    map.value.disableScrollWheelZoom();

                    // 添加控件
                    //创建缩放平移控件对象
                    let control = new T.Control.Zoom();
                    // control.setPosition(T_ANCHOR_TOP_RIGHT);
                    //添加缩放平移控件
                    map.value.addControl(control);

                    map.value.clearOverLays();
                    let marker = new T.Marker(point);
                    map.value.addOverLay(marker);
                    if (props.draggable) {
                        marker.enableDragging();
                        marker.addEventListener('dragend', function (e) {
                            map.value.panTo(new T.LngLat(e.lnglat.lng, e.lnglat.lat));
                            lat.value = e.lnglat.lat;
                            lng.value = e.lnglat.lng;
                            context.emit('point', lng.value, lat.value);
                        });
                    }
                    break;
                case 'baidu':
                    const BMap = window.BMap;
                    map.value = new BMap.Map('map', {
                        enableMapClick: false,
                    });
                    let point2 = new BMap.Point(lng.value, lat.value);
                    map.value.centerAndZoom(point2, 10); // 初始化地图,设置中心点坐标和地图级别
                    // 添加控件
                    let navigationControl = new BMap.NavigationControl({
                        // 靠左上角位置
                        anchor: window.BMAP_ANCHOR_TOP_LEFT,
                        // LARGE类型
                        type: window.BMAP_NAVIGATION_CONTROL_LARGE,
                    });
                    map.value.addControl(navigationControl);
                    let marker2 = new BMap.Marker(point2);
                    map.value.addOverlay(marker2);
                    if (props.draggable) {
                        // 修正marker的初始化
                        marker2.enableDragging();
                        marker2.addEventListener('dragend', function (e) {
                            map.value.panTo(e.point);
                            lat.value = e.point.lat;
                            lng.value = e.point.lng;
                            context.emit('point', lng.value, lat.value);
                        });

                        // 设置标注提示信息
                        let cr = new BMap.CopyrightControl({ anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT });
                        map.value.addControl(cr); //添加版权控件
                        let bs = map.value.getBounds(); //返回地图可视区域
                        cr.addCopyright({ id: 1, content: '<div class="map-dragging-tips"><span>' + '拖动红色图标直接定位' + '</span></div>', bounds: bs });
                    }
                    break;
                case 'tencent':
                    const qq_maps = window.qq.maps;
                    let point3 = new qq_maps.LatLng(lat.value, lng.value);
                    map.value = new qq_maps.Map('map', {
                        center: point3,
                        zoom: 10,
                    });
                    let marker3 = new qq_maps.Marker({
                        map: map.value,
                        position: point3,
                        draggable: props.draggable,
                    });
                    qq_maps.event.addListener(marker3, 'dragend', function (e) {
                        lat.value = e.latLng.lat;
                        lng.value = e.latLng.lng;
                        map.value.panTo(e.latLng);
                        context.emit('point', lng.value, lat.value);
                    });
                    break;
                case 'amap':
                    const AMap = window.AMap;
                    map.value = new AMap.Map('map', {
                        zoomEnable: true,
                        resizeEnable: false,
                        scrollWheel: false,
                        zoom: 10, // 初始化地图级别
                        center: [lng.value, lat.value], // 初始化地图中心点位置
                    });
                    AMap.plugin(['AMap.ToolBar'], function () {
                        // 在图面添加工具条控件, 工具条控件只有缩放功能
                        map.value.addControl(new AMap.ToolBar());
                    });
                    // 创建标注
                    var marker_config = {
                        position: map.value.getCenter(),
                        // offset: new AMap.Pixel(-13, -30),
                        draggable: props.draggable,
                    };
                    let marker4 = new AMap.Marker(marker_config);
                    marker4.setMap(map);
                    // 标注可拖拽回调
                    if (props.draggable) {
                        marker4.on('dragend', (e) => {
                            map.value.panTo(e.lnglat);
                            lng.value = e.lnglat.lng;
                            lat.value = e.lnglat.lat;
                            context.emit('point', lng.value, lat.value);
                        });
                    }
                    map.value.add(marker4);
                    break;
            }
        };
        const map_event = (value) => {
            switch (props.type) {
                case 'tianditu':
                    let geo = new T.Geocoder();
                    geo.getPoint(value, function (result) {
                        let point = result.getLocationPoint();
                        if (result.getStatus() == 0) {
                            lng.value = point.lng;
                            lat.value = point.lat;
                            init();
                            map.value.panTo(new T.LngLat(lng.value, lat.value));
                            context.emit('point', lng.value, lat.value);
                        } else {
                            ElMessage.info(point?.getMsg() || '您选择地址没有解析到结果！');
                        }
                    });
                    break;
                case 'baidu':
                    // 创建地址解析器实例
                    let geo2 = new window.BMap.Geocoder();
                    // 将地址解析结果显示在地图上,并调整地图视野
                    geo2.getPoint(
                        value,
                        function (point) {
                            if (point) {
                                lng.value = point.lng;
                                lat.value = point.lat;
                                context.emit('point', lng.value, lat.value);
                                init();
                            } else {
                                ElMessage.info(point?.getMsg() || '您选择地址没有解析到结果！');
                            }
                        },
                        '全国'
                    );
                    break;
                case 'tencent':
                    let geo3 = new TMap.service.Geocoder();
                    geo3.getLocation({ address: value }).then((result) => {
                        let lnglat = result.result.location;
                        lng.value = lnglat.lng;
                        lat.value = lnglat.lat;
                        init();
                        context.emit('point', lng.value, lat.value);
                    });
                    break;
                case 'amap':
                    AMap.plugin('AMap.Geocoder', () => {
                        new AMap.Geocoder().getLocation(value, (status, result) => {
                            if (status === 'complete' && result.geocodes.length) {
                                var lnglat = result.geocodes[0].location;
                                lng.value = lnglat.lng;
                                lat.value = lnglat.lat;
                                init();
                                context.emit('point', lng.value, lat.value);
                            } else {
                                ElMessage.info('您选择地址没有解析到结果！');
                            }
                        });
                    });
                    break;
            }
        };
        context.expose({
            map_event,
        });
    },
});
</script>
<style lang="scss" scoped></style>
