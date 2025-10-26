<script setup lang="ts">
import { Ticket } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/dashboard/Header.vue";
import Stats from "@/components/dashboard/Stats.vue";
import Layout from "@/components/Layout.vue";
import CreateTicket from "@/components/ticket/create-ticket.vue";
import Button from "@/components/ui/button.vue";
import Card from "@/components/ui/Card.vue";

const createTicketRef = ref<InstanceType<typeof CreateTicket> | null>(null);
const router = useRouter();
</script>

<template>
  <Layout>
    <div class="bg-muted/30 min-h-screen">
      <Header />

      <div class="container-app py-8">
        <Stats />

        <!-- Quick Actions -->
        <Card as="Root" class="shadow-md">
          <Card as="Header">
            <Card as="Title">Quick Actions</Card>
            <Card as="Description">Manage your tickets efficiently</Card>
          </Card>
          <Card as="Content">
            <div class="flex flex-col gap-4 sm:flex-row">
              <Button @click="router.push('/tickets')" class="flex-1">
                <Ticket class="mr-2 h-4 w-4" />
                View All Tickets
              </Button>
              <Button
                @click="createTicketRef?.open()"
                variant="outline"
                class="flex-1"
              >
                Create New Ticket
              </Button>
            </div>
          </Card>
        </Card>
      </div>
    </div>

    <CreateTicket ref="createTicketRef" />
  </Layout>
</template>
