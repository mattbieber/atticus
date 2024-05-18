import * as z from 'zod'

export const SongSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    albumId: z.number().int(),
    artistId: z.number().int(),
    length: z.coerce.number(),
})


export type Song = z.infer<typeof SongSchema>
