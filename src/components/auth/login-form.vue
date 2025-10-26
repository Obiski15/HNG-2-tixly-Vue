<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuth } from "@/composables/useAuth";
import { loginSchema, type LoginInput } from "@/schema/auth.schema";
import Button from "@/components/ui/button.vue";
import Input from "@/components/ui/input.vue";
import Label from "@/components/ui/label.vue";

const { login, status } = useAuth();

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  await login(values as LoginInput);
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <div class="space-y-2">
      <div>
        <Label for="email">Email</Label>
      </div>
      <Input
        id="email"
        v-model="email"
        type="email"
        placeholder="you@example.com"
        :aria-invalid="!!errors.email"
      />
      <p v-if="errors.email" class="text-destructive text-sm">
        {{ errors.email }}
      </p>
    </div>

    <div class="space-y-2">
      <div>
        <Label for="password">Password</Label>
      </div>
      <Input
        id="password"
        v-model="password"
        type="password"
        placeholder="••••••••"
        :aria-invalid="!!errors.password"
      />
      <p v-if="errors.password" class="text-destructive text-sm">
        {{ errors.password }}
      </p>
    </div>

    <Button :disabled="status === 'isLoggingIn'" type="submit" class="w-full">
      {{ status === "isLoggingIn" ? "Logging in..." : "Login" }}
    </Button>

    <div class="text-primary text-center text-sm">
      <span>Don't have an account? </span>
      <router-link to="/signup" class="hover:underline">Sign up</router-link>
    </div>
  </form>
</template>
