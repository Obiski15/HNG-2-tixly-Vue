<script setup lang="ts">
import { ArrowLeft, Edit2, Plus, Trash2, AlertCircle } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Layout from "@/components/Layout.vue";
import CreateTicket from "@/components/ticket/create-ticket.vue";
import EditTicket from "@/components/ticket/edit-ticket.vue";
import DeleteTicket from "@/components/ticket/delete-ticket.vue";
import Badge from "@/components/ui/badge.vue";
import Button from "@/components/ui/button.vue";
import Card from "@/components/ui/Card.vue";
import { useTicket } from "@/composables/useTicket";
import type { Ticket } from "@/types/index";

const createTicketRef = ref<InstanceType<typeof CreateTicket> | null>(null);
const deleteTicketRefs = ref<{
  [id: string]: InstanceType<typeof DeleteTicket> | null;
}>({});
const editTicketRefs = ref<{
  [id: string]: InstanceType<typeof EditTicket> | null;
}>({});

const error = ref<string | null>(null);
const { tickets, getTickets, status } = useTicket();
const router = useRouter();

onMounted(async () => {
  try {
    await getTickets();
  } catch (e) {
    error.value = (e as Error).message;
  }
});

const getStatusBadge = (ticketStatus: string) => {
  const variants = {
    open: "bg-success text-success-foreground",
    in_progress: "bg-warning text-warning-foreground",
    closed: "bg-muted text-muted-foreground",
  };

  return variants[ticketStatus as keyof typeof variants] || "";
};
</script>

<template>
  <Layout>
    <div class="bg-muted/30 min-h-screen">
      <header class="bg-card border-border border-b">
        <div class="container-app flex items-center justify-between py-4">
          <div class="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              @click="router.push('/dashboard')"
            >
              <ArrowLeft class="h-5 w-5" />
            </Button>
            <div>
              <h1 class="text-2xl font-bold">Ticket Management</h1>
              <p class="text-muted-foreground text-sm">
                {{ tickets?.length }} total tickets
              </p>
            </div>
          </div>
          <Button
            :disabled="status !== 'idle'"
            @click="createTicketRef?.open()"
          >
            <Plus class="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </div>
      </header>

      <div v-if="status === 'isFetching'" class="container-app py-8">
        <div class="flex min-h-[400px] items-center justify-center">
          <div class="text-center">
            <div
              class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"
            ></div>
            <p class="text-muted-foreground mt-4 text-sm">Loading tickets...</p>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="container-app py-8">
        <Card as="Root" class="border-destructive/50 shadow-md">
          <Card as="Content" class="py-12 text-center">
            <AlertCircle class="text-destructive mx-auto mb-4 h-12 w-12" />
            <h3 class="mb-2 text-lg font-semibold">Failed to Load Tickets</h3>
            <p class="text-muted-foreground mb-4 text-sm">{{ error }}</p>
            <Button
              @click="
                async () => {
                  error = null;
                  try {
                    await getTickets();
                  } catch (e) {
                    error = (e as Error).message;
                  }
                }
              "
              variant="outline"
            >
              Try Again
            </Button>
          </Card>
        </Card>
      </div>

      <div v-else class="container-app py-8">
        <Card v-if="tickets?.length === 0" as="Root" class="shadow-md">
          <Card as="Content" class="py-12 text-center">
            <p class="text-muted-foreground mb-4">No tickets yet</p>
            <Button @click="createTicketRef?.open()">
              <Plus class="mr-2 h-4 w-4" />
              Create Your First Ticket
            </Button>
          </Card>
        </Card>

        <div
          v-else
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <Card
            v-for="ticket in tickets"
            :key="ticket.id"
            as="Root"
            class="shadow-md transition-shadow hover:shadow-lg"
          >
            <Card as="Header">
              <div class="mb-2 flex items-start justify-between">
                <Badge :class="getStatusBadge(ticket.status)">
                  {{ ticket.status.replace("_", " ").toUpperCase() }}
                </Badge>
                <Badge variant="outline">{{ ticket.priority }}</Badge>
              </div>
              <Card as="Title" class="line-clamp-2">
                {{ ticket.title }}
              </Card>
              <Card as="Description" class="line-clamp-3">
                {{ ticket.description }}
              </Card>
            </Card>
            <Card as="Content">
              <div class="flex gap-2">
                <Button
                  @click="editTicketRefs[ticket.id]?.open()"
                  size="sm"
                  variant="outline"
                  class="flex-1"
                >
                  <Edit2 class="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <EditTicket
                  :ticket="ticket"
                  :ref="
                    (el) => {
                      editTicketRefs[ticket.id] = el as InstanceType<
                        typeof EditTicket
                      > | null;
                    }
                  "
                />

                <Button
                  size="sm"
                  variant="destructive"
                  class="flex-1"
                  @click="deleteTicketRefs[ticket.id]?.open()"
                >
                  <Trash2 class="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <DeleteTicket
                  :ticket="{ id: ticket.id, title: ticket.title }"
                  :ref="
                    (el) => {
                      deleteTicketRefs[ticket.id] = el as InstanceType<
                        typeof DeleteTicket
                      > | null;
                    }
                  "
                />
              </div>
              <p class="text-muted-foreground mt-3 text-xs">
                Created {{ new Date(ticket.createdAt).toLocaleDateString() }}
              </p>
            </Card>
          </Card>
        </div>
      </div>
    </div>

    <CreateTicket ref="createTicketRef" />
  </Layout>
</template>
