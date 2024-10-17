import { z, ZodType } from 'zod'

export class EducationValidation {
  static readonly CREATE: ZodType = z.object({
    employee_id: z.number().positive(),
    name: z.string().min(1).max(255),
    level: z.enum(['TK', 'SD', 'SMP', 'SMA', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor']),
    description: z.string().min(1).max(255)
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    employee_id: z.number().positive(),
    name: z.string().min(1).max(255).optional(),
    level: z.enum(['TK', 'SD', 'SMP', 'SMA', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor']).optional(),
    description: z.string().min(1).max(255).optional()
  })

  static readonly REMOVE: ZodType = z.object({
    id: z.number().positive(),
    employee_id: z.number().positive()
  })

  static readonly ID: ZodType = z.object({
    id: z.number().positive()
  })
}
