import { today } from '@/utils/utils'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

const currentYear = today.getFullYear()

export const artistValidator = zodResolver(
  z.object({
    id: z.number().int().optional(),
    name: z.string().min(1, 'Artist name is required').max(255),
    dob: z
      .union([
        z
          .string()
          .length(0)
          .transform(() => undefined),
        z.coerce.date().max(new Date(), 'Date of birth must be in the past'),
      ])
      .optional(),
    gender: z.enum(['m', 'f', 'o'], {
      errorMap: () => ({ message: 'Gender is Required' }),
    }),
    address: z.string().max(255).optional(),
    first_release_year: z
      .union([
        z
          .string()
          .length(0)
          .transform(() => undefined),
        z.coerce.date().max(new Date(), 'Release year must be in the past'),
      ])
      .optional(),
    no_of_albums_released: z
      .number()
      .int()
      .nonnegative('Number of albums must be 0 or more')
      .optional(),
  }),
)
