<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  type AlertDialogActionProps,
  type AlertDialogCancelProps,
  type AlertDialogContentProps,
  type AlertDialogDescriptionProps,
  type AlertDialogOverlayProps,
  type AlertDialogPortalProps,
  type AlertDialogRootProps,
  type AlertDialogTitleProps,
  type AlertDialogTriggerProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/utils";
import { buttonVariants } from "@/utils/constants";

const delegatedProps = defineProps<{
  /**
   * Specify which component to render.
   * Available components: Root, Trigger, Portal, Overlay, Content, Header, Footer, Title, Description, Action, Cancel
   */
  as:
    | "Root"
    | "Trigger"
    | "Portal"
    | "Overlay"
    | "Content"
    | "Header"
    | "Footer"
    | "Title"
    | "Description"
    | "Action"
    | "Cancel";
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
  <AlertDialogRoot
    v-if="as === 'Root'"
    v-bind="(props as AlertDialogRootProps)"
    @update:open="delegatedEmits('update:open', $event)"
  >
    <slot />
  </AlertDialogRoot>

  <!-- Trigger -->
  <AlertDialogTrigger
    v-else-if="as === 'Trigger'"
    v-bind="(props as AlertDialogTriggerProps)"
  >
    <slot />
  </AlertDialogTrigger>

  <!-- Portal -->
  <AlertDialogPortal
    v-else-if="as === 'Portal'"
    v-bind="(props as AlertDialogPortalProps)"
  >
    <slot />
  </AlertDialogPortal>

  <!-- Overlay -->
  <AlertDialogOverlay
    v-else-if="as === 'Overlay'"
    v-bind="(props as AlertDialogOverlayProps)"
    :class="
      cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
        delegatedProps.class
      )
    "
  />

  <!-- Content -->
  <AlertDialogPortal v-else-if="as === 'Content'">
    <AlertDialogOverlay
      :class="
        cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80'
        )
      "
    />
    <AlertDialogContent
      v-bind="(props as AlertDialogContentProps)"
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
          delegatedProps.class
        )
      "
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>

  <!-- Header -->
  <div
    v-else-if="as === 'Header'"
    :class="
      cn(
        'flex flex-col space-y-2 text-center sm:text-left',
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
  <AlertDialogTitle
    v-else-if="as === 'Title'"
    v-bind="(props as AlertDialogTitleProps)"
    :class="cn('text-lg font-semibold', delegatedProps.class)"
  >
    <slot />
  </AlertDialogTitle>

  <!-- Description -->
  <AlertDialogDescription
    v-else-if="as === 'Description'"
    v-bind="(props as AlertDialogDescriptionProps)"
    :class="cn('text-muted-foreground text-sm', delegatedProps.class)"
  >
    <slot />
  </AlertDialogDescription>

  <!-- Action -->
  <AlertDialogAction
    v-else-if="as === 'Action'"
    v-bind="(props as AlertDialogActionProps)"
    :class="cn(buttonVariants(), delegatedProps.class)"
  >
    <slot />
  </AlertDialogAction>

  <!-- Cancel -->
  <AlertDialogCancel
    v-else-if="as === 'Cancel'"
    v-bind="(props as AlertDialogCancelProps)"
    :class="
      cn(
        buttonVariants({ variant: 'outline' }),
        'mt-2 sm:mt-0',
        delegatedProps.class
      )
    "
  >
    <slot />
  </AlertDialogCancel>
</template>
