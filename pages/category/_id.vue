<template>
  <div>
    <app-store-grid />
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
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
</style>