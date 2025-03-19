import { today } from '@/utils/utils'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

export const userValidator = zodResolver(
  z
    .object({
      first_name: z.string().min(1, 'First name is required').max(255),
      last_name: z.string().min(1, 'Last name is required').max(255),
      email: z.string().email('Invalid email format').max(255),
      password: z.string().min(8, 'Password must be at least 8 characters').max(500),
      confirm_password: z.string().min(8, 'Confirm Password must be at least 8 characters'),
      phone: z.string().max(20).optional(),
      gender: z.enum(['m', 'f', 'o'], {
        errorMap: () => ({ message: 'Gender is required' }),
      }),
      role: z.enum(['super_admin', 'artist_manager', 'artist'], {
        errorMap: () => ({ message: 'Role is required' }),
      }),
      address: z.string().max(255).optional(),
      dob: z
        .union([
          z
            .string()
            .length(0)
            .transform(() => undefined), // Allow empty string as undefined
          z.coerce.date().max(today, 'Date of birth must be in the past'),
        ])
        .optional(),
      id: z.number().int().optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ['confirm_password'],
    }),
)
