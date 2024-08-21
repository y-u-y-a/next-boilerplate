import { Errors } from "@/config/consts"
import { z } from "zod"

export const createUserFormSchema = z.object({
  name: z.string().min(1, { message: Errors.REQUIRED }),
  email: z.string().email(Errors.INVALID_EMAIL_TYPE),

  /**
   * @see https://github.com/colinhacks/zod/issues/310#issuecomment-794533682
   * */
  // email: z.string().email(Errors.INVALID_EMAIL_TYPE).optional().or(z.literal("")),
})

export type CreateUserFormInput = z.infer<typeof createUserFormSchema>