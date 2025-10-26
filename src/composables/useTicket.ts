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

  const refetch = async () => {
    const result = await getTicketsService();
    tickets.value = result;
  };

  const createTicket = async (data: TicketInput) => {
    try {
      status.value = "isCreating";
      await createTicketService(data);
      await refetch();
      toast.success("Ticket created");
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
      await refetch();
      toast.success("Ticket Deleted");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      status.value = "idle";
    }
  };

  const editTicket = async (data: Partial<Ticket>) => {
    try {
      status.value = "isEditing";
      await editTicketService(data);
      await refetch();
      toast.success("Ticket updated");
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
