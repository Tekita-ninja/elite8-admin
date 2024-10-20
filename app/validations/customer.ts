import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const formCustomerSchema = toTypedSchema(z.object({
  name: z.string({ message }),
  // phone: z.string({ message })
  phone: z.string().regex(phoneRegex, 'Invalid phone number!').min(10, {
    message:'Minimal 10 characters'
  }).max(16, {
    message: 'Maximum 13 characters'
  }),
}))