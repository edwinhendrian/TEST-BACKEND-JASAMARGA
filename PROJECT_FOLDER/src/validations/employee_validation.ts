import { z, ZodType } from 'zod'

export class EmployeeValidation {
  static readonly CREATE: ZodType = z.object({
    nik: z.string().min(1).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
    is_active: z.boolean(),
    start_date: z.string().date(),
    end_date: z.string().date()
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    nik: z.string().min(1).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
    is_active: z.boolean().optional(),
    start_date: z.string().date().optional(),
    end_date: z.string().date().optional()
  })

  static readonly ID: ZodType = z.object({
    id: z.number().positive()
  })
}
