<template>
  <div class="storegrid" v-if="products.length > 0">
    <transition-group name="items" tag="section" class="content">
      <div v-for="item in products" :key="item.id" class="item">
        <div class="img-contain">
          <NuxtLink :to="`/product/${item.id}`">
            <img :src="item.media.source" />
          </NuxtLink>
        </div>
        <star-rating
          :rating="item.starrating"
          active-color="#000"
          :star-size="15"
          :show-rating="false"
          style="margin: 5px 0"
        ></star-rating>
        <h3>{{ item.name }}</h3>
        <h4 class="price">{{ item.price.formatted | dollar }}</h4>
        <NuxtLink :to="`/product/${item.id}`">
          <button class="multi-item">View Item ></button>
        </NuxtLink>
      </div>
    </transition-group>
    <aside>
      <h3>Special Sale</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam libero
        iusto nemo laboriosam perferendis voluptas ullam officiis, quibusdam
        quas quam eveniet est fugit delectus corporis incidunt nam esse suscipit
        itaque?
      </p>
      <h3>Filter by Price:</h3>
      <p style="margin-top: 5px">
        Max Price
        <strong>${{ pricerange }}</strong>
      </p>
      <input
        class="slider"
        id="pricerange"
        type="range"
        v-model="pricerange"
        :min="min"
        :max="max"
        step="0.1"
      />
      <span class="min">${{ min }}</span>
      <span class="max">${{ max }}</span>
    </aside>
  </div>
</template>

<script>
import StarRating from "vue-star-rating/src/star-rating.vue";
import { mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      min: 0,
      max: 200,
      pricerange: 200,
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(["getProducts"]),
    products() {
      let pros = [...this.getProducts];
      if (this.id && pros) {
        pros = pros.filter((x) => x.categories.find((y) => y.id == this.id));
      }
      return pros;
    },
  },
  components: {
    StarRating,
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
}

.img-contain {
  max-height: 200px;
  display: flex;
  align-content: center;
  align-items: center;
  img {
    width: 100%;
  }
}

.item {
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
}

aside {
  height: 100%;
  width: 100%;
}

.max {
  display: inline-block;
  float: right;
}
</style>