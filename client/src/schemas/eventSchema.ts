import z from "zod";

export const eventSchema=z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  date: z.string().min(1, "Date is required"),

  location: z.string().min(2, "Location is required"),

  category: z.string().min(1, "Category is required"),

  totalSeats: z.coerce
    .number()
    .min(1, "Total seats must be at least 1"),

  availableSeats: z.coerce
    .number()
    .min(0, "Available seats cannot be negative"),

  ticketPrice: z.coerce
    .number()
    .min(0, "Ticket price cannot be negative"),

  image: z.instanceof(File).optional(),
})

export type EventFormData=z.infer<typeof eventSchema>