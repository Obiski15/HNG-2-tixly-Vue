<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "@/components/ui/button.vue";

const router = useRouter();
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4"
  >
    <div class="text-center">
      <h1 class="mb-4 text-9xl font-bold text-primary">404</h1>
      <h2 class="mb-4 text-3xl font-semibold">Page Not Found</h2>
      <p class="text-muted-foreground mb-8 text-lg">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button size="lg" @click="router.push('/')">Go Back Home</Button>
    </div>
  </div>
</template>
