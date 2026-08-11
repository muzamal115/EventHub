import type { Event } from "./event";

export interface Booking {
  _id: string;
  userId: string;
  eventId: Event;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "paid" | "non-paid";
  amount: number;
}

export interface AdminBooking {
  _id: string;

  userId: {
    _id: string;
    name: string;
    email: string;
  };

  eventId: Event;

  status: "pending" | "confirmed" | "cancelled";

  paymentStatus: "paid" | "non-paid";

  amount: number;
}