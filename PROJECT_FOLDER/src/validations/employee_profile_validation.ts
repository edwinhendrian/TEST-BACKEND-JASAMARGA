import { z, ZodType } from 'zod'

export class EmployeeProfileValidation {
  static readonly CREATE: ZodType = z.object({
    id: z.number().positive(),
    place_of_birth: z.string().min(1).max(255).optional(),
    date_of_birth: z.string().date().optional(),
    gender: z.enum(['Laki-Laki', 'Perempuan']),
    is_married: z.boolean(),
    prof_pict: z.string().min(1).max(255).optional()
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    place_of_birth: z.string().min(1).max(255).optional(),
    date_of_birth: z.string().date().optional(),
    gender: z.enum(['Laki-Laki', 'Perempuan']).optional(),
    is_married: z.boolean().optional(),
    prof_pict: z.string().min(1).max(255).optional()
  })

  static readonly ID: ZodType = z.object({
    id: z.number().positive()
  })
}
