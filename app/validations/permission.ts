import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const formPermissionSchema = toTypedSchema(z.object({
  name: z.string({ message }),
  method: z.string({ message })
}))