<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import {getGoodsDetail, Goods} from "../../network/detail";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {}
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
        },
        created() {
            // console.log(this.$route.params.iid);
            this.iid = this.$route.query.iid
            getGoodsDetail(this.iid).then(res => {
                const data = res.result
                this.topImages = data.itemInfo.topImages
                console.log(this.topImages)
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            })
        }
    }
</script>

<style scoped>

</style>
