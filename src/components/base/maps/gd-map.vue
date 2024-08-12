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
            script.src = 'https://webapi.amap.com/maps?v=2.0&key=3e92c6bfdd5ddb4aac39ed5e4d0db663';
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
        const init = () => {
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
        };

        const map_event = (value) => {
            AMap.plugin('AMap.Geocoder', () => {
                var geo = new AMap.Geocoder();
                geo.getLocation(value, (status, result) => {
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
        };
    },
});
</script>
<style lang="scss" scoped></style>
