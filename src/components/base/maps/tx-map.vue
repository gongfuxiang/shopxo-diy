<template>
    <!-- 地图 -->
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
            load_map_script1(); // 加载地图资源
            load_map_script2(); // 加载地图资源
        });
        window.init = () => {
            init();
        };
        const load_map_script1 = () => {
            // 此处在所需页面引入资源就是，不用再public/index.html中引入
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.className = 'loadmap'; // 给script一个类名
            script.src = 'https://map.qq.com/api/js?v=2.exp&key=IMYBZ-QJ6C3-QPZ3Y-OUKL6-IVU5S-ZYBKA&callback=init';
            let loadmap = document.getElementsByClassName('loadmap');
            if (loadmap) {
                // 每次append script之前判断一下，避免重复添加script资源标签
                for (var i = 0; i < loadmap.length; i++) {
                    document.body.removeChild(loadmap[i]);
                }
            }
            document.body.appendChild(script);
        };
        const load_map_script2 = () => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.className = 'loadmap2'; // 给script一个类名
            script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=IMYBZ-QJ6C3-QPZ3Y-OUKL6-IVU5S-ZYBKA&libraries=service';
            let loadmap2 = document.getElementsByClassName('loadmap2');
            // 每次append script之前判断一下，避免重复添加script资源标签
            for (var i = 0; i < loadmap2.length; i++) {
                document.body.removeChild(loadmap2[i]);
            }
            document.body.appendChild(script);
        };
        // 初始化地图
        const init = () => {
            const qq_maps = window.qq.maps;
            let point = new qq_maps.LatLng(lat.value, lng.value);
            map.value = new qq_maps.Map('map', {
                center: point,
                zoom: 10,
            });
            let marker3 = new qq_maps.Marker({
                map: map.value,
                position: point,
                draggable: props.draggable,
            });
            qq_maps.event.addListener(marker3, 'dragend', function (e) {
                lat.value = e.latLng.lat;
                lng.value = e.latLng.lng;
                map.value.panTo(e.latLng);
                context.emit('point', lng, lat);
            });
        };
        const map_event = (value) => {
            let geo3 = new TMap.service.Geocoder();
            geo3.getLocation({ address: value }).then((result) => {
                let lnglat = result.result.location;
                lng.value = lnglat.lng;
                lat.value = lnglat.lat;
                context.emit('point', lng.value, lat.value);
                init();
            });
        };
    },
});
</script>
<style lang="scss" scoped></style>
