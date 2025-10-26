import { z } from "zod";

export type TicketStatus = "open" | "in_progress" | "closed";

export const ticketSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title is required" })
    .trim()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(200, { message: "Title is too long" }),
  description: z
    .string({ message: "Description is required" })
    .min(1, { message: "Description is required" })
    .trim()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(2000, { message: "Description is too long" }),
  status: z.enum(["open", "in_progress", "closed"], {
    message: "Please select a valid status",
  }),
  priority: z.enum(["low", "medium", "high"], {
    message: "Please select a valid priority",
  }),
});

export type TicketInput = z.infer<typeof ticketSchema>;
