<script setup lang="ts">
import { LogOut } from "lucide-vue-next";
import Button from "@/components/ui/button.vue";
import { useAuth } from "@/composables/useAuth";
import { useUser } from "@/composables/useUser";

const { logout, status } = useAuth();
const user = useUser();
</script>

<template>
  <header class="bg-card border-border border-b">
    <div class="container-app flex items-center justify-between py-4">
      <div>
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <p class="text-muted-foreground text-sm">
          Welcome back, {{ user?.name ?? "User" }}
        </p>
      </div>
      <Button
        :disabled="status === 'isLoggingOut'"
        variant="outline"
        @click="logout"
      >
        <LogOut class="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  </header>
</template>
