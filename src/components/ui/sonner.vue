<script setup lang="ts">
import { Toaster as Sonner } from "vue-sonner";

// Define props that match the Sonner component
interface ToasterProps {
  theme?: "light" | "dark" | "system";
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  hotkey?: string[];
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  visibleToasts?: number;
  closeButton?: boolean;
  toastOptions?: {
    className?: string;
    descriptionClassName?: string;
    actionButtonClassName?: string;
    cancelButtonClassName?: string;
    style?: Record<string, string>;
  };
  offset?: string | number;
  dir?: "ltr" | "rtl" | "auto";
}

const props = withDefaults(defineProps<ToasterProps>(), {
  position: "bottom-right",
});
</script>

<template>
  <Sonner
    class="toaster group"
    :theme="props.theme"
    :position="props.position"
    :hotkey="props.hotkey"
    :rich-colors="props.richColors"
    :expand="props.expand"
    :duration="props.duration"
    :visible-toasts="props.visibleToasts"
    :close-button="props.closeButton"
    :offset="props.offset"
    :dir="props.dir"
    :toast-options="{
      classes: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
      ...props.toastOptions,
    }"
  />
</template>
