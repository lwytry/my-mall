<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images="topImages"/>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import {getGoodsDetail} from "../../network/detail";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper
        },
        created() {
            // console.log(this.$route.params.iid);
            this.iid = this.$route.query.iid
            getGoodsDetail(this.iid).then(res => {
                this.topImages = res.result.itemInfo.topImages
                console.log(this.topImages)
            })
        }
    }
</script>

<style scoped>

</style>
