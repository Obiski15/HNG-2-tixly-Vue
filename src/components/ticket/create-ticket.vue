<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ref } from "vue";
import { ticketSchema, type TicketInput } from "@/schema/ticket.schema";
import { useTicket } from "@/composables/useTicket";
import Button from "@/components/ui/Button.vue";
import Dialog from "@/components/ui/dialog.vue";
import Input from "@/components/ui/input.vue";
import Label from "@/components/ui/label.vue";
import Select from "@/components/ui/select.vue";
import Textarea from "@/components/ui/textarea.vue";

const dialogOpen = ref(false);
const { createTicket, status } = useTicket();

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(ticketSchema),
  initialValues: {
    title: "",
    description: "",
    status: "open" as const,
    priority: "medium" as const,
  },
});

const [title] = defineField("title");
const [description] = defineField("description");
const [ticketStatus] = defineField("status");
const [priority] = defineField("priority");

const onSubmit = handleSubmit(async (values) => {
  try {
    await createTicket(values as TicketInput);
    dialogOpen.value = false;
    resetForm();
  } catch (e) {
    // Error is handled by the composable
  }
});

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
        <Dialog as="Title">Create New Ticket</Dialog>
        <Dialog as="Description">
          Fill in the details to create a new ticket
        </Dialog>
      </Dialog>

      <form @submit="onSubmit" class="space-y-4">
        <div class="space-y-2">
          <div>
            <Label for="title">Title</Label>
          </div>
          <Input
            id="title"
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
            <Label for="description">Description</Label>
          </div>
          <Textarea
            id="description"
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

          <Button type="submit" :disabled="status === 'isCreating'">
            Create Ticket
          </Button>
        </div>
      </form>
    </Dialog>
  </Dialog>
</template>
