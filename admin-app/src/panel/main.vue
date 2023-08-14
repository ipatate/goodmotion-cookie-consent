<template>
  <div class="gm-admin-panel wrap">
    <h1>Réglages</h1>
    <button
      @click="store.saveOptions"
      :disabled="store.loading"
      class="button button-primary"
    >
      <span v-if="store.loading === true">processing...</span>
      <span v-else> Sauver </span>
    </button>
    <div v-show="store.loading === true" class="gm-admin-panel-loader">
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "./stores";
import Loader from "./components/Loader.vue";
const store = useMainStore();
</script>

<style>
.gm-admin-panel h1 {
  margin-bottom: 2rem;
}

.gm-admin-panel {
  margin-top: 2rem;
  padding: 1rem 0.5rem;
  position: relative;
}

.gm-admin-panel-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(240, 240, 241, 0.4);
  color: var(--wc-blue);
}
</style>
