<template>
    <div id="detail">
        <scroll class="content">
            <detail-nav-bar class="detail-nav"/>
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo"/>
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import {getGoodsDetail, Goods, Shop, GoodsParam} from "../../network/detail";
    import Scroll from 'components/common/scroll/Scroll'

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {}
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            Scroll
        },
        created() {
            // console.log(this.$route.params.iid);
            this.iid = this.$route.query.iid
            getGoodsDetail(this.iid).then(res => {
                const data = res.result
                this.topImages = data.itemInfo.topImages
                console.log(this.topImages)
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                // 3.创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)

                // 4.保存商品的详情数据
                this.detailInfo = data.detailInfo;

                // 5.获取参数的信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            })
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #ffffff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px);
    }
</style>
