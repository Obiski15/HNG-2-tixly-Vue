<script setup lang="ts">
import { cn } from "@/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-vue-next";
import {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  type SelectContentProps,
  type SelectGroupProps,
  type SelectItemProps,
  type SelectLabelProps,
  type SelectPortalProps,
  type SelectRootProps,
  type SelectScrollDownButtonProps,
  type SelectScrollUpButtonProps,
  type SelectSeparatorProps,
  type SelectTriggerProps,
  type SelectValueProps,
  type SelectViewportProps,
} from "reka-ui";
import { computed } from "vue";

const delegatedProps = defineProps<{
  /**
   * Specify which component to render.
   * Available: Root, Group, Value, Trigger, ScrollUpButton, ScrollDownButton, Content, Label, Item, Separator, Portal, Viewport
   */
  as:
    | "Root"
    | "Group"
    | "Value"
    | "Trigger"
    | "ScrollUpButton"
    | "ScrollDownButton"
    | "Content"
    | "Label"
    | "Item"
    | "Separator"
    | "Portal"
    | "Viewport";
  class?: string;
  position?: "popper" | "item-aligned";
  [key: string]: any;
}>();

const delegatedEmits = defineEmits<{
  "update:open": [value: boolean];
  // `reka-ui` emits modelValue with a few possible shapes (string | number | bigint | object | null)
  "update:modelValue": [
    value: string | number | bigint | Record<string, any> | null
  ];
}>();

const props = computed(() => {
  const { as, class: className, ...rest } = delegatedProps;
  return rest;
});
</script>

<template>
  <!-- Root -->
  <SelectRoot
    v-if="as === 'Root'"
    v-bind="(props as SelectRootProps)"
    @update:model-value="delegatedEmits('update:modelValue', $event)"
    @update:open="delegatedEmits('update:open', $event)"
  >
    <slot />
  </SelectRoot>

  <!-- Group -->
  <SelectGroup v-else-if="as === 'Group'" v-bind="(props as SelectGroupProps)">
    <slot />
  </SelectGroup>

  <!-- Value -->
  <SelectValue v-else-if="as === 'Value'" v-bind="(props as SelectValueProps)">
    <slot />
  </SelectValue>

  <!-- Trigger -->
  <SelectTrigger
    v-else-if="as === 'Trigger'"
    v-bind="(props as SelectTriggerProps)"
    :class="
      cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        delegatedProps.class
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="h-4 w-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>

  <!-- ScrollUpButton -->
  <SelectScrollUpButton
    v-else-if="as === 'ScrollUpButton'"
    v-bind="(props as SelectScrollUpButtonProps)"
    :class="
      cn(
        'flex cursor-default items-center justify-center py-1',
        delegatedProps.class
      )
    "
  >
    <ChevronUp class="h-4 w-4" />
  </SelectScrollUpButton>

  <!-- ScrollDownButton -->
  <SelectScrollDownButton
    v-else-if="as === 'ScrollDownButton'"
    v-bind="(props as SelectScrollDownButtonProps)"
    :class="
      cn(
        'flex cursor-default items-center justify-center py-1',
        delegatedProps.class
      )
    "
  >
    <ChevronDown class="h-4 w-4" />
  </SelectScrollDownButton>

  <!-- Content -->
  <SelectPortal v-else-if="as === 'Content'">
    <SelectContent
      v-bind="(props as SelectContentProps)"
      :position="delegatedProps.position || 'popper'"
      :class="
        cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border shadow-md',
          delegatedProps.position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          delegatedProps.class
        )
      "
    >
      <SelectScrollUpButton
        :class="cn('flex cursor-default items-center justify-center py-1')"
      >
        <ChevronUp class="h-4 w-4" />
      </SelectScrollUpButton>
      <SelectViewport
        :class="
          cn(
            'p-1',
            delegatedProps.position === 'popper' &&
              'h-[--reka-select-trigger-height] w-full min-w-[--reka-select-trigger-width]'
          )
        "
      >
        <slot />
      </SelectViewport>
      <SelectScrollDownButton
        :class="cn('flex cursor-default items-center justify-center py-1')"
      >
        <ChevronDown class="h-4 w-4" />
      </SelectScrollDownButton>
    </SelectContent>
  </SelectPortal>

  <!-- Portal -->
  <SelectPortal
    v-else-if="as === 'Portal'"
    v-bind="(props as SelectPortalProps)"
  >
    <slot />
  </SelectPortal>

  <!-- Viewport -->
  <SelectViewport
    v-else-if="as === 'Viewport'"
    v-bind="(props as SelectViewportProps)"
    :class="delegatedProps.class"
  >
    <slot />
  </SelectViewport>

  <!-- Label -->
  <SelectLabel
    v-else-if="as === 'Label'"
    v-bind="(props as SelectLabelProps)"
    :class="cn('py-1.5 pr-2 pl-8 text-sm font-semibold', delegatedProps.class)"
  >
    <slot />
  </SelectLabel>

  <!-- Item -->
  <SelectItem
    v-else-if="as === 'Item'"
    v-bind="(props as unknown as SelectItemProps<any>)"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50',
        delegatedProps.class
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Check class="h-4 w-4" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>

  <!-- Separator -->
  <SelectSeparator
    v-else-if="as === 'Separator'"
    v-bind="(props as SelectSeparatorProps)"
    :class="cn('bg-muted -mx-1 my-1 h-px', delegatedProps.class)"
  />
</template>
