<script setup lang="ts">
import { LogIn } from "lucide-vue-next";
import LoginForm from "@/components/auth/login-form.vue";
import Layout from "@/components/Layout.vue";
import Card from "@/components/ui/Card.vue";
</script>

<template>
  <Layout :show-footer="false">
    <div
      class="wave-bg flex min-h-screen items-center justify-center px-4 py-12"
    >
      <Card as="Root" class="w-full max-w-md shadow-xl">
        <Card as="Header" class="space-y-1">
          <div class="mb-2 flex items-center gap-2">
            <LogIn class="text-primary h-6 w-6" />
            <Card as="Title" class="text-2xl">Welcome Back</Card>
          </div>
          <Card as="Description">
            Enter your credentials to access your account
          </Card>
        </Card>
        <Card as="Content">
          <LoginForm />
        </Card>
      </Card>
    </div>
  </Layout>
</template>
