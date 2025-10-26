<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/utils";

const props = defineProps<{
  /**
   * Specify which card component to render.
   * Available: Root, Header, Title, Description, Content, Footer
   */
  as: "Root" | "Header" | "Title" | "Description" | "Content" | "Footer";
  class?: string;
}>();

const cardClasses = computed(() => {
  switch (props.as) {
    case "Root":
      return cn(
        "bg-card text-card-foreground border-border rounded-lg border shadow-sm",
        props.class
      );
    case "Header":
      return cn("flex flex-col space-y-1.5 p-6", props.class);
    case "Title":
      return cn(
        "text-2xl leading-none font-semibold tracking-tight",
        props.class
      );
    case "Description":
      return cn("text-muted-foreground text-sm", props.class);
    case "Content":
      return cn("p-6 pt-0", props.class);
    case "Footer":
      return cn("flex items-center p-6 pt-0", props.class);
    default:
      return props.class;
  }
});

const element = computed(() => {
  if (props.as === "Title") return "h3";
  if (props.as === "Description") return "p";
  return "div";
});
</script>

<template>
  <component :is="element" :class="cardClasses" v-bind="$attrs">
    <slot />
  </component>
</template>
