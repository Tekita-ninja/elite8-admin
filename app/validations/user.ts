import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;
export const formUserSchema = toTypedSchema(z.object({
  name: z.string({ message }),
  email: z.string({ message }),
  password: z.string({ message }),
}))
export const formAssignRoleSchema = toTypedSchema(z.object({
  roleId: z.coerce.number({ message }),
}))