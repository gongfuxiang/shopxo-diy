<template>
    <div v-for="(item, index) in diy_data" :key="item.id" :class="model_class(item)" :style="model_style(item)" @click="on_choose(index, item.show_tabs)">
        <div v-if="item.show_tabs == '1'" class="plug-in-right" chosenClass="close">
            <el-icon :class="`iconfont ${item.is_enable == '1' ? 'icon-eye' : 'icon-eye-close'}`" @click.stop="set_enable(index)" />
            <el-icon class="iconfont icon-del" @click.stop="del(index)" />
            <el-icon class="iconfont icon-copy" @click.stop="copy(index)" />
            <el-icon :class="['iconfont', 'icon-arrow-top', icon_arrow_disable(item.key, index, 'moveUp')]" @click.stop="moveUp(index, arrow_disable_method(item.key, index, 'moveUp'))" />
            <el-icon :class="['iconfont', 'icon-arrow-bottom', icon_arrow_disable(item.key, index, 'moveDown')]" @click.stop="moveDown(index, arrow_disable_method(item.key, index, 'moveDown'))" />
        </div>
        <div class="plug-in-name">{{ item.name }}</div>
        <div class="main-content" :class="{ 'plug-in-close': item.is_enable != '1' }" :style="mainContentStyle">
            <!-- 基础组件 -->
            <!-- 视频 -->
            <template v-if="item.key == 'video'">
                <model-video :key="item.com_data" :value="item.com_data"></model-video>
            </template>
            <!-- 用户信息 -->
            <template v-else-if="item.key == 'user-info'">
                <model-user-info :key="item.com_data" :value="item.com_data"></model-user-info>
            </template>
            <!-- 文章列表 -->
            <template v-else-if="item.key == 'article-list'">
                <model-article-list :key="item.com_data" :value="item.com_data"></model-article-list>
            </template>
            <!-- 文章选项卡 -->
            <template v-else-if="item.key == 'article-tabs'">
                <model-article-tabs :key="item.com_data" :value="item.com_data"></model-article-tabs>
            </template>
            <!-- 搜索框 -->
            <template v-else-if="item.key == 'search'">
                <model-search :key="item.com_data" :value="item.com_data"></model-search>
            </template>
            <!-- 导航组 -->
            <template v-else-if="item.key == 'nav-group'">
                <model-nav-group :key="item.com_data" :value="item.com_data"></model-nav-group>
            </template>
            <!-- 轮播图 -->
            <template v-else-if="item.key == 'carousel'">
                <model-carousel :key="item.com_data" :value="item.com_data"></model-carousel>
            </template>
            <!-- 公告 -->
            <template v-else-if="item.key == 'notice'">
                <model-notice :key="item.com_data" :value="item.com_data"></model-notice>
            </template>
            <!-- 选项卡 -->
            <template v-else-if="item.key == 'tabs'">
                <model-tabs :key="item.com_data" :value="item.com_data"></model-tabs>
            </template>
            <!-- 商品列表 -->
            <template v-else-if="item.key == 'goods-list'">
                <model-goods-list :key="item.com_data" :value="item.com_data"></model-goods-list>
            </template>
            <!-- 商品选项卡 -->
            <template v-else-if="item.key == 'goods-tabs'">
                <model-goods-tabs :key="item.com_data" :value="item.com_data"></model-goods-tabs>
            </template>
            <!-- 图片魔方 -->
            <template v-else-if="item.key == 'img-magic'">
                <model-img-magic :key="item.com_data" :value="item.com_data" :show-tabs="item.show_tabs == '1'"></model-img-magic>
            </template>
            <!-- 数据魔方 -->
            <template v-else-if="item.key == 'data-magic'">
                <model-data-magic :key="item.com_data" :value="item.com_data" :show-tabs="item.show_tabs == '1'"></model-data-magic>
            </template>
            <!-- 热区 -->
            <template v-else-if="item.key == 'hot-zone'">
                <model-hot-zone :key="item.com_data" :value="item.com_data"></model-hot-zone>
            </template>
            <!-- 自定义 -->
            <template v-else-if="item.key == 'custom'">
                <model-custom :key="item.com_data" :value="item.com_data" :show-tabs="item.show_tabs == '1'"></model-custom>
            </template>
            <!-- 营销组件 -->
            <!-- 优惠券 -->
            <template v-else-if="item.key == 'coupon'">
                <model-coupon :key="item.com_data" :value="item.com_data"></model-coupon>
            </template>
            <template v-else-if="item.key == 'seckill'">
                <model-seckill :key="item.com_data" :value="item.com_data"></model-seckill>
            </template>
            <!-- 工具组件 -->
            <!-- 辅助线 -->
            <template v-else-if="item.key == 'row-line'">
                <model-auxiliary-line :key="item.com_data" :value="item.com_data"></model-auxiliary-line>
            </template>
            <!-- 辅助空白 -->
            <template v-else-if="item.key == 'auxiliary-blank'">
                <model-auxiliary-blank :key="item.com_data" :value="item.com_data"></model-auxiliary-blank>
            </template>
            <!--富文本 -->
            <template v-else-if="item.key == 'rich-text'">
                <model-rich-text :key="item.com_data" :value="item.com_data"></model-rich-text>
            </template>
            <!-- 文本标题 -->
            <template v-else-if="item.key == 'text-title'">
                <model-text-title :key="item.com_data" :value="item.com_data"></model-text-title>
            </template>
            <!-- 悬浮按钮 -->
            <template v-else-if="item.key == 'float-window'">
                <model-float-window :key="item.com_data" :value="item.com_data" @change="float_bottom_change($event, item.id)"></model-float-window>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
const app = getCurrentInstance();
import { get_math } from '@/utils';
import { cloneDeep, isEmpty } from 'lodash';
interface Props {
    diyData: any[];
    showModelBorder: boolean;
    mainContentStyle: string;
}

const props = withDefaults(defineProps<Props>(), {
    diyData: () => [],
    showModelBorder: false,
    mainContentStyle: ''
});
const diy_data = ref(props.diyData);

watch(() => props.diyData, (val) => {
    diy_data.value = val;
}, {immediate: true, deep: true});

// 模块的class
const model_class = computed(() => {
    return (item: { show_tabs: string; key: string; id: string }) => {
        return ['plug-in-table', { 'plug-in-border': item.show_tabs == '1', 'float-window': item.key == 'float-window', 'plug-in-animation': item.show_tabs != '1' && props.showModelBorder }];
    };
});

interface com_data {
    style: {
        common_style: {
            floating_up: number;
        }
    }
}
const model_style = computed(() => {
    return (item: { id: string; key: string, com_data: com_data }) => {
        // 40是容器的上下间距， 60是顶部的高度
        const container_height = window.innerHeight - 100;
        let bottom = 0;
        // 上下有除了padding间距时的处理逻辑
        if (container_height > 844) {
            // 上下高度
            const height = (window.innerHeight - 906) / 2;
            bottom = parseInt(float_bottom[item.id]) + height;
            // 容器自身高度是60 846-60 =  786
            if (parseInt(float_bottom[item.id]) > 786) {
                bottom = 786 + height;
            }
        } else {
            // 一半的上下间距
            const height = 20;
            bottom = parseInt(float_bottom[item.id]) + height;
            // 容器自身高度是60 container_height-60
            if (parseInt(float_bottom[item.id]) > container_height - 60) {
                bottom = container_height - 60 + height;
            }
        }
        let z_index = '';
        if (item.com_data.style.common_style?.floating_up !== 0) {
            z_index = `z-index: 1`;
        }
        return item.key == 'float-window' ? `bottom: ${((bottom / window.innerHeight) * 100).toFixed(4) + '%'};` : `margin-top: -${ item.com_data.style.common_style?.floating_up || 0 }px;${ z_index };`;
    };
});

const icon_arrow_disable = computed(() => {
    return (item_key: string, index: number, key: string) => {
        return arrow_disable_method(item_key, index, key) ? '' : 'disabled';
    };
});
// 判断逻辑
const arrow_disable_method = (item_key: string, index: number, key: string) => {
    let arrow_disable = true;
    if (item_key == 'float-window') {
        arrow_disable = false;
    } else {
        if (key == 'moveUp') {
            if (index == 0) {
                arrow_disable = false;
            } else {
                // 截取前半部分信息
                const new_list = diy_data.value.slice(0, index);
                // 去除所有的float-window
                const remove_float_list = new_list.filter((item) => item.key != 'float-window');
                // 判断前面除了float-window的个数是否大于0
                arrow_disable = remove_float_list.length == 0 ? false : true;
            }
        } else if (key == 'moveDown') {
            if (index == diy_data.value.length - 1) {
                arrow_disable = false;
            } else {
                // 截取后半部分信息, 舍弃自身的信息
                const new_list = diy_data.value.slice(index + 1, diy_data.value.length);
                // 去除所有的float-window
                const remove_float_list = new_list.filter((item) => item.key != 'float-window');
                // 判断前面除了float-window的个数是否大于0
                arrow_disable = remove_float_list.length == 0 ? false : true;
            }
        }
    }
    return arrow_disable;
};
const emits = defineEmits(['set_show_tabs', 'page_settings']);

// 是否启用
const set_enable = (index: number) => {
    const old_data = get_diy_index_data(index);
    old_data.is_enable = old_data.is_enable == '1' ? '0' : '1';
};

// 选中时候的效果
const on_choose = (index: number, show_tabs: string) => {
    // 如果已经选中了, 设置为不可再次触发事件
    if (show_tabs != '1') {
        // 设置对应的位置为显示
        emits('set_show_tabs', index);
    }
};

// 复制
const copy = (index: number) => {
    // 获取当前数据, 复制的时候id更换一下
    const new_data = {
        ...cloneDeep(get_diy_index_data(index)),
        id: get_math(),
    };
    // 在当前位置下插入数据
    diy_data.value.splice(index, 0, new_data);
    emits('set_show_tabs', index + 1);
};
// 删除
const del = (index: number) => {
    app?.appContext.config.globalProperties.$common.message_box('删除后不可恢复，确定继续吗?', 'warning').then(() => {
        const show_tabs_index = diy_data.value.findIndex((item: any) => item.show_tabs == '1');
        if (show_tabs_index == index) {
            diy_data.value.splice(index, 1);
            if (diy_data.value.length > 0) {
                let new_index: number = index;
                // 删除的时候如果大于0，则显示上边的数据
                if (index > 0) {
                    new_index = new_index - 1;
                }
                emits('set_show_tabs', new_index);
            } else {
                emits('page_settings');
            }
        } else {
            diy_data.value.splice(index, 1);
        }
    });
};
// 获取当前传递过来的index对应的diy_data中的数据
const get_diy_index_data = (index: number) => {
    return (<arrayIndex>diy_data.value)[index.toString()];
};
// 向上移动
const moveUp = (index: number, flag: boolean) => {
    if (flag) {
        const old_data = get_diy_index_data(index);
        // 截取前半部分信息, 并反转一下，从最后边往前查询
        const new_list = diy_data.value.slice(0, index).reverse();
        const count = float_count(new_list);
        // 删除当前位置信息
        diy_data.value.splice(index, 1);
        // 将数据插入上一层数据中
        diy_data.value.splice(index - count, 0, old_data);
        // 设置对应的位置为显示
        emits('set_show_tabs', index - count);
    }
};
// 向下移动
const moveDown = (index: number, flag: boolean) => {
    if (flag) {
        const old_data = get_diy_index_data(index);
        // 截取后半部分信息, 舍弃自身的信息
        const new_list = diy_data.value.slice(index + 1, diy_data.value.length);
        const count = float_count(new_list);
        // 删除当前位置信息
        diy_data.value.splice(index, 1);
        // 将数据插入下一层数据中
        diy_data.value.splice(index + count, 0, old_data);
        emits('set_show_tabs', index + count);
    }
};
const float_count = (new_list: any[]) => {
    // 记录一下当前查询的是否是对应的信息
    let key = '';
    let conunt = 1;
    new_list.forEach((item, index) => {
        // 如果当前的key是悬浮按钮，并且历史的也是就加一，否则的话记录一下当前的key，避免多次循环
        if (item.key == 'float-window' && isEmpty(key)) {
            conunt += 1;
        } else {
            key = item.key;
        }
    });
    return conunt;
};
interface FloatBottom {
    [key: string]: string;
}
const float_bottom = reactive<FloatBottom>({});
const float_bottom_change = (val: { bottom: string; location: string }, id: string) => {
    float_bottom[id] = val.bottom;
};
</script>
<style scoped lang="scss">
// 悬浮按钮控制， 未选中情况下宽度自适应
.plug-in-table.float-window {
    .plug-in-name {
        display: none;
    }
}
// 选中情况下宽度是100%
.plug-in-border.float-window {
    .plug-in-name {
        display: block;
    }
}
.plug-in-border {
    position: relative;
    // border: 0.2rem solid $cr-main;
    z-index: 1;
    box-sizing: border-box;
}
.plug-in-border::before {
    content: '';
    width: calc(100% + 0.4rem);
    height: calc(100% + 0.4rem);
    position: absolute;
    top: -0.2rem;
    left: -0.2rem;
    // z-index: 1;
    border: 0.2rem solid $cr-main;
}
.plug-in-animation {
    transition: all 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 2px 8px rgba(50, 55, 58, 0.1);
    }
}
.plug-in-table {
    display: table;
    width: 100%;
    cursor: move;
    transform: translateZ(0rem) !important;
}
.plug-in-name {
    position: absolute;
    top: 0;
    background: #fff;
    left: -10rem;
    width: 8.6rem;
    height: 3.2rem;
    text-align: center;
    line-height: 3.2rem;
    font-size: 1.3rem;
    color: #666;
    border-radius: 0.3rem;
    z-index: 99;
    &::before {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        background: #fff;
        transform: rotate(45deg);
        top: 50%;
        right: -0.5rem;
        margin-top: -0.5rem;
    }
}
.plug-in-close::before {
    position: absolute;
    content: '\5DF2\9690\85CF';
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 99;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.plug-in-right {
    background: $cr-main;
    position: absolute;
    right: -5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.2rem;
    color: #fff;
    border-radius: 0.4rem;
    & > i {
        cursor: pointer;
    }
    & > i.disabled {
        color: #5db2ff;
        cursor: not-allowed;
    }
}
.plug-in-right {
    background: $cr-main;
    position: absolute;
    right: -5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.2rem;
    color: #fff;
    border-radius: 0.4rem;
    & > i {
        cursor: pointer;
    }
    & > i.disabled {
        color: #5db2ff;
        cursor: not-allowed;
    }
    & .icon-arrow-top,
    & .icon-arrow-bottom {
        height: 0.9rem;
    }
}
</style>