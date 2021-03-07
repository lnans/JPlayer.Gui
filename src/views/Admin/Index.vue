<template lang="pug">
v-container.main__content
  Tile(
    v-for="(tile, idx) in tiles",
    :key="idx",
    :title="$t(`administration.tiles.${tile.label}`)",
    :count="tile.count",
    :icon="availableTiles[tile.label].icon"
  )
</template>

<script>
import Tile from "@/components/Tile.vue";
export default {
  name: "Admin",
  components: { Tile },
  data() {
    return {
      tiles: [],
      availableTiles: {
        user_tile_label: { to: "", icon: "fa-user" },
        profile_tile_label: { to: "", icon: "far fa-address-card" },
        function_tile_label: { to: "", icon: "fa-cogs" },
      },
    };
  },
  mounted() {
    this.getTiles();
  },
  methods: {
    getTiles() {
      this.$http.get("dashboard/tiles/administration").then((response) => {
        this.tiles = response.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>