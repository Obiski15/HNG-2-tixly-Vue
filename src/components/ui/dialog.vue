<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  type DialogCloseProps,
  type DialogContentProps,
  type DialogDescriptionProps,
  type DialogOverlayProps,
  type DialogPortalProps,
  type DialogRootProps,
  type DialogTitleProps,
  type DialogTriggerProps,
} from "reka-ui";
import { X } from "lucide-vue-next";
import { computed } from "vue";
import { cn } from "@/utils";

const delegatedProps = defineProps<{
  /**
   * Specify which component to render.
   * Available components: Root, Trigger, Portal, Close, Overlay, Content, Header, Footer, Title, Description
   */
  as:
    | "Root"
    | "Trigger"
    | "Portal"
    | "Close"
    | "Overlay"
    | "Content"
    | "Header"
    | "Footer"
    | "Title"
    | "Description";
  class?: string;
  [key: string]: any;
}>();

const delegatedEmits = defineEmits<{
  "update:open": [value: boolean];
}>();

const props = computed(() => {
  const { as, class: className, ...rest } = delegatedProps;
  return rest;
});
</script>

<template>
  <!-- Root -->
  <DialogRoot
    v-if="as === 'Root'"
    v-bind="(props as DialogRootProps)"
    @update:open="delegatedEmits('update:open', $event)"
  >
    <slot />
  </DialogRoot>

  <!-- Trigger -->
  <DialogTrigger
    v-else-if="as === 'Trigger'"
    v-bind="(props as DialogTriggerProps)"
  >
    <slot />
  </DialogTrigger>

  <!-- Portal -->
  <DialogPortal
    v-else-if="as === 'Portal'"
    v-bind="(props as DialogPortalProps)"
  >
    <slot />
  </DialogPortal>

  <!-- Close -->
  <DialogClose v-else-if="as === 'Close'" v-bind="(props as DialogCloseProps)">
    <slot />
  </DialogClose>

  <!-- Overlay -->
  <DialogOverlay
    v-else-if="as === 'Overlay'"
    v-bind="(props as DialogOverlayProps)"
    :class="
      cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
        delegatedProps.class
      )
    "
  />

  <!-- Content -->
  <DialogPortal v-else-if="as === 'Content'">
    <DialogOverlay
      :class="
        cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80'
        )
      "
    />
    <DialogContent
      v-bind="(props as DialogContentProps)"
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
          delegatedProps.class
        )
      "
    >
      <slot />
      <DialogClose
        class="ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
      >
        <X class="h-4 w-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>

  <!-- Header -->
  <div
    v-else-if="as === 'Header'"
    :class="
      cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        delegatedProps.class
      )
    "
  >
    <slot />
  </div>

  <!-- Footer -->
  <div
    v-else-if="as === 'Footer'"
    :class="
      cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        delegatedProps.class
      )
    "
  >
    <slot />
  </div>

  <!-- Title -->
  <DialogTitle
    v-else-if="as === 'Title'"
    v-bind="(props as DialogTitleProps)"
    :class="
      cn(
        'text-lg leading-none font-semibold tracking-tight',
        delegatedProps.class
      )
    "
  >
    <slot />
  </DialogTitle>

  <!-- Description -->
  <DialogDescription
    v-else-if="as === 'Description'"
    v-bind="(props as DialogDescriptionProps)"
    :class="cn('text-muted-foreground text-sm', delegatedProps.class)"
  >
    <slot />
  </DialogDescription>
</template>
