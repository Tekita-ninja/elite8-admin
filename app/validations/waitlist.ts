import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const formWaitlistSchema = toTypedSchema(z.object({
  name: z.string({ message }),
  phoneNumber: z.string({ message }),
  queueNumber: z.coerce.number({ message }),
  numOfPax: z.coerce.number({ message }),
}))

export const formUpdateWaitlistSchema = toTypedSchema(z.object({
  numOfCall: z.coerce.number({ message }),
  queueNumber: z.coerce.number({ message }),
  status: z.string({ message }),
  numOfPax: z.coerce.number({ message }),
}))

export const formPlaySchema = toTypedSchema(z.object({
  queueId: z.coerce.number({ message }).optional(),
  tableNumber: z.string({ message }),
}))