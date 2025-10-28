import type { TicketInput } from "@/schema/ticket.schema";
import type { Ticket } from "@/types/index";
import { handleAPIError } from "@/utils/handleAPIError";

const BASE_URL = `${import.meta.env.VITE_API_URL}/tickets`;

export const getTickets = async () => {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });

  if (!res.ok) {
    try {
      const errorData = await res.json();
      return handleAPIError(errorData);
    } catch {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
  }

  const result = await res.json();
  return result as Ticket[];
};

export const createTicket = async (data: TicketInput) => {
  const date = new Date();

  const modifiedData = {
    ...data,
    id: date.getTime().toString(),
    createdAt: date.toLocaleDateString(),
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
    credentials: "include",
  });
  if (!res.ok) {
    try {
      const errorData = await res.json();
      return handleAPIError(errorData);
    } catch {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
  }

  const result = await res.json();
  return result;
};

export const editTicket = async (data: Partial<Ticket>) => {
  const updatedData = { ...data, updatedAt: new Date().toLocaleDateString() };

  const res = await fetch(`${BASE_URL}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
    credentials: "include",
  });
  if (!res.ok) {
    try {
      const errorData = await res.json();
      return handleAPIError(errorData);
    } catch {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
  }

  const result = await res.json();
  return result;
};

export const deleteTicket = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    try {
      const errorData = await res.json();
      return handleAPIError(errorData);
    } catch {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
  }

  const result = await res.json();
  return result;
};
