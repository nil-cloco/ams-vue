import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

export const musicValidator = zodResolver(
  z.object({
    artist_id: z.number().int({ message: 'Artist ID must be an integer' }), // Required
    title: z.string().min(1, 'Title is required').max(255),
    album_name: z.string().min(1, 'Album name is required').max(255),
    genre: z.enum(['rnb', 'country', 'classic', 'rock', 'jazz'], {
      errorMap: () => ({ message: 'Invalid genre' }),
    }),
  }),
)
