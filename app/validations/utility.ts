import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const formUtilitySchema = toTypedSchema(z.object({
  appName: z.string({ message }),
  logoSmall: z.string().optional(),
  logoFull: z.string().optional(),
  textColor: z.string().optional(),
  bgColor: z.string().optional(),
  mainEmail: z.string().optional(),
  mainWhatsApp: z.string().optional()
}))