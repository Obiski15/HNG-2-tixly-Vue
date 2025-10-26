<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuth } from "@/composables/useAuth";
import { signupSchema, type SignupInput } from "@/schema/auth.schema";
import Button from "@/components/ui/button.vue";
import Input from "@/components/ui/input.vue";
import Label from "@/components/ui/label.vue";

const { signup, status } = useAuth();

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(signupSchema),
});

const [name] = defineField("name");
const [email] = defineField("email");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");

const onSubmit = handleSubmit(async (values) => {
  await signup(values as SignupInput);
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <div class="space-y-2">
      <div>
        <Label for="name">Name</Label>
      </div>
      <Input
        id="name"
        v-model="name"
        type="text"
        placeholder="John Doe"
        :aria-invalid="!!errors.name"
      />
      <p v-if="errors.name" class="text-destructive text-sm">
        {{ errors.name }}
      </p>
    </div>

    <div class="space-y-2">
      <div>
        <Label for="signup-email">Email</Label>
      </div>
      <Input
        id="signup-email"
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
        <Label for="signup-password">Password</Label>
      </div>
      <Input
        id="signup-password"
        v-model="password"
        type="password"
        placeholder="••••••••"
        :aria-invalid="!!errors.password"
      />
      <p v-if="errors.password" class="text-destructive text-sm">
        {{ errors.password }}
      </p>
    </div>

    <div class="space-y-2">
      <div>
        <Label for="confirm-password">Confirm Password</Label>
      </div>
      <Input
        id="confirm-password"
        v-model="confirmPassword"
        type="password"
        placeholder="••••••••"
        :aria-invalid="!!errors.confirmPassword"
      />
      <p v-if="errors.confirmPassword" class="text-destructive text-sm">
        {{ errors.confirmPassword }}
      </p>
    </div>

    <Button :disabled="status === 'isSigningUp'" type="submit" class="w-full">
      {{ status === "isSigningUp" ? "Creating account..." : "Sign Up" }}
    </Button>

    <div class="text-primary text-center text-sm">
      <span>Already have an account? </span>
      <router-link to="/login" class="hover:underline">Login</router-link>
    </div>
  </form>
</template>
