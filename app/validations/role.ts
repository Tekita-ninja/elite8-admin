import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const formRoleSchema = toTypedSchema(z.object({
  name: z.string({
    message:'please complete the field'
  })
}))