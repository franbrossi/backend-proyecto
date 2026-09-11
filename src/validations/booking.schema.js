import { z } from 'zod';

export const createBookingSchema = z.object({
    clientName: z.string({ required_error: "El nombre del cliente es obligatorio" }).min(2),
    clientEmail: z.string({ required_error: "El email es obligatorio" }).email("Debe ser un email válido"),
    date: z.string({ required_error: "La fecha es obligatoria" }),
    time: z.string({ required_error: "La hora es obligatoria" })
});