<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, id) in topImages" :key="id">
      <a :href="item.link">
        <img :src="item" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    }
  },
  methods: {
    imageLoad() {

    },
  }
}
</script>

<style scoped>
 .detail-swiper {
   height: 300px;
 }
</style>
