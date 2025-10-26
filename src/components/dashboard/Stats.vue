<script setup lang="ts">
import { CheckCircle2, Clock, Ticket, XCircle } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useTicket } from "@/composables/useTicket";
import Card from "@/components/ui/Card.vue";

const error = ref("");
const { stats, status, getTickets } = useTicket();

onMounted(async () => {
  try {
    await getTickets();
  } catch (e) {
    error.value = (e as Error).message;
  }
});
</script>

<template>
  <div v-if="status === 'isFetching'">isFetching</div>
  <div v-else-if="error">An error occurred</div>
  <div v-else class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <Card as="Root" class="shadow-md">
      <Card as="Header" class="flex flex-row items-center justify-between pb-2">
        <Card as="Title" class="text-sm font-medium">Total Tickets</Card>
        <Ticket class="text-muted-foreground h-4 w-4" />
      </Card>
      <Card as="Content">
        <div class="text-3xl font-bold">{{ stats.total }}</div>
        <p class="text-muted-foreground mt-1 text-xs">All time</p>
      </Card>
    </Card>

    <Card as="Root" class="shadow-md">
      <Card as="Header" class="flex flex-row items-center justify-between pb-2">
        <Card as="Title" class="text-sm font-medium">Open Tickets</Card>
        <CheckCircle2 class="text-success h-4 w-4" />
      </Card>
      <Card as="Content">
        <div class="text-success text-3xl font-bold">{{ stats.open }}</div>
        <p class="text-muted-foreground mt-1 text-xs">Awaiting action</p>
      </Card>
    </Card>

    <Card as="Root" class="shadow-md">
      <Card as="Header" class="flex flex-row items-center justify-between pb-2">
        <Card as="Title" class="text-sm font-medium">In Progress</Card>
        <Clock class="text-warning h-4 w-4" />
      </Card>
      <Card as="Content">
        <div class="text-warning text-3xl font-bold">
          {{ stats.inProgress }}
        </div>
        <p class="text-muted-foreground mt-1 text-xs">Being worked on</p>
      </Card>
    </Card>

    <Card as="Root" class="shadow-md">
      <Card as="Header" class="flex flex-row items-center justify-between pb-2">
        <Card as="Title" class="text-sm font-medium">Closed Tickets</Card>
        <XCircle class="text-muted-foreground h-4 w-4" />
      </Card>
      <Card as="Content">
        <div class="text-muted-foreground text-3xl font-bold">
          {{ stats.closed }}
        </div>
        <p class="text-muted-foreground mt-1 text-xs">Resolved</p>
      </Card>
    </Card>
  </div>
</template>
