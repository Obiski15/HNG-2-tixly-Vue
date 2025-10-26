<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { authenticate as authenticateService } from "@/services/auth.service";
import { UserKey } from "@/composables/useUser";
import type { User } from "@/types";

const isAuthenticating = ref(false);
const isAuthenticated = ref(false);
const user = ref<User | null>(null);
const router = useRouter();

onMounted(async () => {
  try {
    isAuthenticating.value = true;
    const data = await authenticateService();
    if (!data.isAuthenticated) {
      router.replace("/login");
      toast.error("You must be logged in to access this page.");
      return;
    }
    isAuthenticated.value = data.isAuthenticated;
    user.value = data.user;
  } catch (e) {
    isAuthenticated.value = false;
    router.replace("/login");
    toast.error((e as Error).message);
  } finally {
    isAuthenticating.value = false;
  }
});

// Provide user to child components
provide(UserKey, user);
</script>

<template>
  <div
    v-if="isAuthenticating"
    class="flex min-h-screen items-center justify-center"
  >
    <div class="text-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"
      ></div>
      <p class="text-muted-foreground mt-4 text-sm">Loading...</p>
    </div>
  </div>
  <slot v-else-if="isAuthenticated" />
</template>
