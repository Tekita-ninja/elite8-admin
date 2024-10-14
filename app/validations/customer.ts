import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const formCustomerSchema = toTypedSchema(z.object({
  name: z.string({ message }),
  phone: z.string({ message })
}))