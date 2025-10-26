<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ref, watch } from "vue";
import { ticketSchema } from "@/schema/ticket.schema";
import { useTicket } from "@/composables/useTicket";
import type { Ticket } from "@/types/index";
import Button from "@/components/ui/button.vue";
import Dialog from "@/components/ui/dialog.vue";
import Input from "@/components/ui/input.vue";
import Label from "@/components/ui/label.vue";
import Select from "@/components/ui/select.vue";
import Textarea from "@/components/ui/textarea.vue";

interface Props {
  ticket: Ticket;
}

const props = defineProps<Props>();
const dialogOpen = ref(false);
const { editTicket, status } = useTicket();

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(ticketSchema),
  initialValues: {
    title: props.ticket.title,
    description: props.ticket.description,
    status: props.ticket.status,
    priority: props.ticket.priority,
  },
});

const [title] = defineField("title");
const [description] = defineField("description");
const [ticketStatus] = defineField("status");
const [priority] = defineField("priority");

const onSubmit = handleSubmit(async (values) => {
  try {
    await editTicket({ ...props.ticket, ...values });
    dialogOpen.value = false;
  } catch (e) {
    // Error is handled by the composable
  }
});

// Reset form when ticket prop changes or dialog opens
watch(
  () => props.ticket,
  (newTicket) => {
    resetForm({
      values: {
        title: newTicket.title,
        description: newTicket.description,
        status: newTicket.status,
        priority: newTicket.priority,
      },
    });
  }
);

defineExpose({
  open: () => {
    dialogOpen.value = true;
  },
});
</script>

<template>
  <Dialog as="Root" v-model:open="dialogOpen">
    <Dialog as="Content" class="max-w-2xl">
      <Dialog as="Header">
        <Dialog as="Title">Edit Ticket</Dialog>
        <Dialog as="Description">Update ticket details</Dialog>
      </Dialog>

      <form @submit="onSubmit" class="space-y-4">
        <div class="space-y-2">
          <div>
            <Label for="edit-title">Title</Label>
          </div>
          <Input
            id="edit-title"
            v-model="title"
            placeholder="Brief description of the issue"
            :aria-invalid="!!errors.title"
          />
          <p v-if="errors.title" class="text-destructive text-sm">
            {{ errors.title }}
          </p>
        </div>

        <div class="space-y-2">
          <div>
            <Label for="edit-description">Description</Label>
          </div>
          <Textarea
            id="edit-description"
            v-model="description"
            placeholder="Detailed description of the ticket"
            :rows="4"
            :aria-invalid="!!errors.description"
          />
          <p v-if="errors.description" class="text-destructive text-sm">
            {{ errors.description }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <div>
              <Label>Status</Label>
            </div>
            <Select as="Root" v-model="ticketStatus">
              <Select as="Trigger">
                <Select as="Value" />
              </Select>
              <Select as="Content">
                <Select as="Item" value="open">Open</Select>
                <Select as="Item" value="in_progress">In Progress</Select>
                <Select as="Item" value="closed">Closed</Select>
              </Select>
            </Select>
          </div>

          <div class="space-y-2">
            <div>
              <Label>Priority</Label>
            </div>
            <Select as="Root" v-model="priority">
              <Select as="Trigger">
                <Select as="Value" />
              </Select>
              <Select as="Content">
                <Select as="Item" value="low">Low</Select>
                <Select as="Item" value="medium">Medium</Select>
                <Select as="Item" value="high">High</Select>
              </Select>
            </Select>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            @click="
              () => {
                dialogOpen = false;
                resetForm();
              }
            "
          >
            Cancel
          </Button>

          <Button type="submit" :disabled="status === 'isEditing'">
            Update Ticket
          </Button>
        </div>
      </form>
    </Dialog>
  </Dialog>
</template>
