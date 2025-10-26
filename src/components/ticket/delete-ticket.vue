<script setup lang="ts">
import { ref } from "vue";
import { useTicket } from "@/composables/useTicket";
import AlertDialog from "@/components/ui/alert-dialog.vue";

interface Props {
  ticket: {
    id: string;
    title: string;
  };
}

const props = defineProps<Props>();
const dialogOpen = ref(false);
const { deleteTicket } = useTicket();

const handleDelete = async () => {
  try {
    await deleteTicket(props.ticket.id);
    dialogOpen.value = false;
  } catch (e) {
    // Error is handled by the composable
  }
};

defineExpose({
  open: () => {
    dialogOpen.value = true;
  },
});
</script>

<template>
  <AlertDialog as="Root" v-model:open="dialogOpen">
    <AlertDialog as="Content">
      <AlertDialog as="Header">
        <AlertDialog as="Title">Are you sure?</AlertDialog>
        <AlertDialog as="Description">
          This action cannot be undone. This will permanently delete the ticket
          {{ ticket.title }}.
        </AlertDialog>
      </AlertDialog>
      <AlertDialog as="Footer">
        <AlertDialog as="Cancel" @click="dialogOpen = false">
          Cancel
        </AlertDialog>
        <AlertDialog
          as="Action"
          @click="handleDelete"
          class="bg-destructive text-destructive-foreground"
        >
          Delete
        </AlertDialog>
      </AlertDialog>
    </AlertDialog>
  </AlertDialog>
</template>
