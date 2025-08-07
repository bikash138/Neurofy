import {z} from 'zod'

export const createNoteSchema = z.object({
    title: z.string(),
    content: z.string()
})