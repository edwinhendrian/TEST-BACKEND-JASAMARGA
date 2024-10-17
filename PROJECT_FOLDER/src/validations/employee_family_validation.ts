import { z, ZodType } from 'zod'

export class EmployeeFamilyValidation {
  static readonly CREATE: ZodType = z.object({
    employee_id: z.number().positive(),
    name: z.string().min(1).max(255).optional(),
    identifier: z.string().min(1).max(255).optional(),
    job: z.string().min(1).max(255).optional(),
    place_of_birth: z.string().min(1).max(255).optional(),
    date_of_birth: z.string().date().optional(),
    religion: z.enum(['Islam', 'Katolik', 'Budha', 'Protestan', 'Hindu', 'Konghucu']),
    is_life: z.boolean(),
    is_divorced: z.boolean(),
    relation_status: z.enum(['Suami', 'Istri', 'Anak', 'Anak Sambung'])
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    employee_id: z.number().positive(),
    name: z.string().min(1).max(255).optional(),
    identifier: z.string().min(1).max(255).optional(),
    job: z.string().min(1).max(255).optional(),
    place_of_birth: z.string().min(1).max(255).optional(),
    date_of_birth: z.string().date().optional(),
    religion: z.enum(['Islam', 'Katolik', 'Budha', 'Protestan', 'Hindu', 'Konghucu']).optional(),
    is_life: z.boolean().optional(),
    is_divorced: z.boolean().optional(),
    relation_status: z.enum(['Suami', 'Istri', 'Anak', 'Anak Sambung']).optional()
  })

  static readonly REMOVE: ZodType = z.object({
    id: z.number().positive(),
    employee_id: z.number().positive()
  })

  static readonly ID: ZodType = z.object({
    id: z.number().positive()
  })
}
