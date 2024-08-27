import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const formLoginSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
}))