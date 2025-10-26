<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/utils";

export interface InputProps {
  type?: string;
  class?: string;
  modelValue?: string | number;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const inputClasses = computed(() => {
  return cn(
    "border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    props.class
  );
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    :type="type"
    :class="inputClasses"
    :value="modelValue"
    @input="handleInput"
    v-bind="$attrs"
  />
</template>
