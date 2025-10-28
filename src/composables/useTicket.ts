import type { TicketInput } from "@/schema/ticket.schema";
import {
  createTicket as createTicketService,
  deleteTicket as deleteTicketService,
  editTicket as editTicketService,
  getTickets as getTicketsService,
} from "@/services/ticket.service";
import type { Ticket } from "@/types/index";
import {
  computed,
  inject,
  ref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from "vue";
import { toast } from "vue-sonner";

export interface Stats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

export type TicketStatus =
  | "isCreating"
  | "isEditing"
  | "isDeleting"
  | "isFetching"
  | "idle";

export interface ITicket {
  stats: ComputedRef<Stats>;
  status: Ref<TicketStatus>;
  tickets: Ref<Ticket[] | null>;
  createTicket: (data: TicketInput) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  editTicket: (data: Partial<Ticket>) => Promise<void>;
  getTickets: () => Promise<void>;
}

export const TicketSymbol: InjectionKey<ITicket> = Symbol("Ticket");

export function createTicket(): ITicket {
  const status = ref<TicketStatus>("idle");
  const tickets = ref<Ticket[] | null>(null);

  const stats = computed<Stats>(() => {
    if (!tickets.value || tickets.value.length === 0) {
      return {
        total: 0,
        open: 0,
        closed: 0,
        inProgress: 0,
      };
    }

    const closed = tickets.value.filter((t) => t.status === "closed").length;
    const open = tickets.value.filter((t) => t.status === "open").length;
    const inProgress = tickets.value.filter(
      (t) => t.status === "in_progress"
    ).length;

    return {
      closed,
      open,
      inProgress,
      total: tickets.value.length,
    };
  });

  // Refetch with retries (exponential backoff)
  const refetch = async (retries = 3, baseDelayMs = 500) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const result = await getTicketsService();
        tickets.value = result;
        return result;
      } catch (err) {
        if (attempt === retries) throw err;
        // wait before next attempt
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  };

  const createTicket = async (data: TicketInput) => {
    try {
      status.value = "isCreating";
      const created = await createTicketService(data);

      // optimistic update locally if we have tickets loaded
      if (tickets.value) {
        tickets.value = [created as Ticket, ...tickets.value];
      }

      toast.success("Ticket created");

      // refetch in background after a short delay to allow the server to finish
      // restarting (nodemon/json-server) and avoid hitting the restart window
      setTimeout(() => {
        void refetch().catch((e) => {
          console.warn("refetch after create failed:", e);
          toast.info(
            "Ticket created but fetching latest list failed. Refresh to see updates."
          );
        });
      }, 1500);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      status.value = "idle";
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      status.value = "isDeleting";
      await deleteTicketService(id);

      // optimistic remove
      if (tickets.value) {
        tickets.value = tickets.value.filter((t) => t.id !== id);
      }

      toast.success("Ticket Deleted");

      // background refetch after short delay to avoid server restart window
      setTimeout(() => {
        void refetch().catch((e) => {
          console.warn("refetch after delete failed:", e);
          toast.info(
            "Ticket deleted but fetching latest list failed. Refresh to see updates."
          );
        });
      }, 1500);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      status.value = "idle";
    }
  };

  const editTicket = async (data: Partial<Ticket>) => {
    try {
      status.value = "isEditing";
      const updated = await editTicketService(data);

      // optimistic update
      if (tickets.value) {
        tickets.value = tickets.value.map((t) =>
          t.id === updated.id ? (updated as Ticket) : t
        );
      }

      toast.success("Ticket updated");

      // background refetch after short delay to avoid server restart window
      setTimeout(() => {
        void refetch().catch((e) => {
          console.warn("refetch after edit failed:", e);
          toast.info(
            "Ticket updated but fetching latest list failed. Refresh to see updates."
          );
        });
      }, 1500);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      status.value = "idle";
    }
  };

  const getTickets = async () => {
    try {
      status.value = "isFetching";
      await refetch();
    } finally {
      status.value = "idle";
    }
  };

  return {
    status,
    stats,
    tickets,
    createTicket,
    editTicket,
    deleteTicket,
    getTickets,
  };
}

export function useTicket(): ITicket {
  const ticket = inject(TicketSymbol);

  if (!ticket) {
    throw new Error("Ticket context is being accessed outside of its provider");
  }

  return ticket;
}
