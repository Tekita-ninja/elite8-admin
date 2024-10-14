import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const formWaitlistSchema = toTypedSchema(z.object({
  name: z.string({ message }),
  phone: z.string({ message }),
  customerId: z.string({ message }),
  queueNumber: z.coerce.number({ message }),
  status: z.string({ message }),
}))

export const formUpdateWaitlistSchema = toTypedSchema(z.object({
  numOfCall: z.coerce.number({ message }),
  queueNumber: z.coerce.number({ message }),
  status: z.string({ message }),
}))