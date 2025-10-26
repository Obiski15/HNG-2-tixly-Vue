<script setup lang="ts">
import { Slot } from "reka-ui";
import { type VariantProps } from "class-variance-authority";
import { computed } from "vue";
import { cn } from "@/utils";
import { buttonVariants } from "@/utils/constants";

export interface ButtonProps {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  asChild?: boolean;
  as?: string;
  class?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  asChild: false,
  as: "button",
});

const buttonClasses = computed(() => {
  return cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.class
  );
});
</script>

<template>
  <Slot v-if="asChild" :class="buttonClasses" v-bind="$attrs">
    <slot />
  </Slot>
  <component v-else :is="as" :class="buttonClasses" v-bind="$attrs">
    <slot />
  </component>
</template>
