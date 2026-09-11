import { z } from 'zod';

export const createServiceSchema = z.object({
    name: z.string({ required_error: "El nombre es obligatorio" }).min(2, "Debe tener al menos 2 letras"),
    description: z.string({ required_error: "La descripción es obligatoria" }),
    duration: z.number({ required_error: "La duración es obligatoria" }).positive("Debe ser un número positivo"),
    price: z.number({ required_error: "El precio es obligatorio" }).nonnegative("El precio no puede ser negativo"),
    category: z.string({ required_error: "La categoría es obligatoria" }),
    available: z.boolean().optional().default(true)
});


export const updateServiceSchema = createServiceSchema.partial();