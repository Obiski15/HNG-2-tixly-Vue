<script setup lang="ts">
import { Label as LabelPrimitive } from "reka-ui";
import { computed } from "vue";
import { cn } from "@/utils";

export interface LabelProps {
  for?: string;
  class?: string;
}

const props = defineProps<LabelProps>();

const labelClasses = computed(() => {
  return cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    props.class
  );
});
</script>

<template>
  <LabelPrimitive :for="for" :class="labelClasses" v-bind="$attrs">
    <slot />
  </LabelPrimitive>
</template>
