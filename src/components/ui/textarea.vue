<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/utils";

export interface TextareaProps {
  class?: string;
  modelValue?: string;
}

const props = defineProps<TextareaProps>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const textareaClasses = computed(() => {
  return cn(
    "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    props.class
  );
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <textarea
    :class="textareaClasses"
    :value="modelValue"
    @input="handleInput"
    v-bind="$attrs"
  />
</template>
