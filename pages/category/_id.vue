<template>
  <div>
    <app-store-grid :data="getProductsByCategory" />
  </div>
</template>

<script>
import AppStoreGrid from "~/components/AppStoreGrid.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AppStoreGrid,
  },
  computed: {
    ...mapGetters(["getProductsByCategory"]),
  },
  created() {
    this.$store.dispatch("getProductsListByCategory", this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>