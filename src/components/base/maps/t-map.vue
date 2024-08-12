<template>
    <!-- 天地图 -->
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
            default: '216px',
        },
    },
    emits: ['point'],
    setup(props, context) {
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
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.className = 'loadmap'; // 给script一个类名
            script.src = 'https://api.tianditu.gov.cn/api?v=4.0&tk=bf0676d6b99ee6f7f917640a54af0415';
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
                });
            }
        };
        const map_event = (value) => {
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
        };
    },
});
</script>
<style lang="scss" scoped></style>
