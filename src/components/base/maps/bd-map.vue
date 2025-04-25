<!-- vue 3 引入百度api -->
<template>
    <!-- 百度地图 -->
    <div class="container w">
        <div id="map" class="map radius-md" :style="{ width: width, height: height }"></div>
    </div>
</template>

<script>
export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: '上海市黄浦区上海中心大厦',
        },
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
            default: '216px',
        },
    },
    emits: ['point'],
    setup(props, context) {
        const map = ref(null);
        const lng = ref(121.478);
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
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.className = 'loadmap'; // 给script一个类名
            script.src = 'https://api.map.baidu.com/getscript?v=3.0&ak=XSdiGjfg3wOHiKjpYEMG6CYA';
            // 此处需要注意：申请ak时，一定要应用类别一定要选浏览器端，不能选服务端，不然地图会报ak无效
            script.onload = () => {
                // 使用script.onload，待资源加载完成，再初始化地图
                init();
            };
            let loadmap = document.getElementsByClassName('loadmap');
            if (loadmap) {
                // 每次append script之前判断一下，避免重复添加script资源标签
                for (var i = 0; i < loadmap.length; i++) {
                    document.body.removeChild(loadmap[i]);
                }
            }

            document.body.appendChild(script);
        };
        // 初始化地图
        const init = () => {
            const BMap = window.BMap;
            map.value = new BMap.Map('map', {
                enableMapClick: false,
            });
            let point = new BMap.Point(lng.value, lat.value);
            map.value.centerAndZoom(point, 10); // 初始化地图,设置中心点坐标和地图级别
            // 添加控件
            let navigationControl = new BMap.NavigationControl({
                // 靠左上角位置
                anchor: window.BMAP_ANCHOR_TOP_LEFT,
                // LARGE类型
                type: window.BMAP_NAVIGATION_CONTROL_LARGE,
            });
            map.value.addControl(navigationControl);
            let marker = new BMap.Marker(point);
            map.value.addOverlay(marker);
            if (props.draggable) {
                // 修正marker的初始化
                marker.enableDragging();
                marker.addEventListener('dragend', function (e) {
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
        };

        const map_event = (value) => {
            // 创建地址解析器实例
            let geo = new window.BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            geo.getPoint(
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
        };
    },
});
</script>
<style lang="less" scoped></style>
