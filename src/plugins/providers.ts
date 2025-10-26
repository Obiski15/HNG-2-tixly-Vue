import { AuthSymbol, createAuth } from "@/composables/useAuth";
import { createTicket, TicketSymbol } from "@/composables/useTicket";
import type { App } from "vue";

export function installProviders(app: App) {
  // Create auth and ticket instances
  const auth = createAuth();
  const ticket = createTicket();

  // Provide them globally
  app.provide(AuthSymbol, auth);
  app.provide(TicketSymbol, ticket);
}
