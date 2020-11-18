<template>
<div id="home">
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <tab-control ref="tabControl1" :titles="['流行', '新款', '精选']" @tabClick="tabClick" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <home-recommend :recommends="recommends"/>
        <feature-view/>
        <tab-control ref="tabControl2" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
        <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import Scroll from 'components/common/scroll/Scroll'

    import HomeSwiper from './childComps/HomeSwiper'
    import HomeRecommend from './childComps/HomeRecommend'
    import FeatureView from  './childComps/FeatureView'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backTop/BackTop'

    import {getHomeMultidata, getHomeGoods} from 'network/home'
    import {debounce} from "common/utils";

    export default {
        name: "Home",
        components: {
            NavBar,
            TabControl,
            Scroll,
            HomeSwiper,
            HomeRecommend,
            FeatureView,
            GoodsList,
            BackTop
        },
        data() {
          return {
              result : null,
              banners: [],
              recommends: [],
              goods: {
                  'pop': {page: 0, list:[]},
                  'new': {page: 0, list:[]},
                  'sell': {page: 0, list:[]},
              },
              currentType: 'pop',
              isShowBackTop: false,
              tabOffsetTop: 0,
              isTabFixed: false,
              saveY: 0,
          }
        },
        created() {
            this.getMultiData()
            this.getGoods('pop')
            this.getGoods('new')
            this.getGoods('sell')
        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh(), 500)
            this.$bus.$on('itemImageLoad', () => {
                refresh()
            })
        },
        methods: {
            /**
             *  事件监听
             */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0, 500)
            },
            contentScroll(position) {
                this.isShowBackTop = position.y < -1000
                this.isTabFixed    = (-position.y) > this.tabOffsetTop
            },
            loadMore() {
                this.getGoods(this.currentType)
            },
            swiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },
            /**
             * 网络请求
             */
            getMultiData() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list;
                })
            },
            getGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                })
                this.$refs.scroll.finishPullUp()
            },

        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        destroyed() {
            console.log('des');
        },
        activated() {
            this.$refs.scroll.scrollTo(0, saveY, 0)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY()
        }
    }
</script>

<style scoped>
    #home {
        height: 100vh;
        position: relative;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 3;*/
    }
    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .tab-control {
        position: relative;
        z-index: 9;
    }
    /*.fixed {*/
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 44px;*/
    /*}*/
    /*.content {*/
        /*height: calc(100% - 93px);*/
        /*overflow: hidden;*/
        /*margin-top: 44px;*/
    /*}*/
</style>
