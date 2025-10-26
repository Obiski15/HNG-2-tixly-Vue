<template>
  <div class="flex min-h-screen flex-col">
    <main class="flex-1">
      <slot />
    </main>
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup lang="ts">
import Footer from "./Footer.vue";

const props = defineProps({
  showFooter: {
    type: Boolean,
    default: true,
  },
});
</script>
