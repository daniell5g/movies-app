import { z } from 'zod';

export const authSchema = z.object({
  username: z
    .string({
      required_error: 'Usuário é obrigatório',
    })
    .min(3, 'O usuário deve ter no mínimo 3 caracteres'),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(3, 'A senha deve ter no mínimo 3 caracteres')
    .regex(/^\d+$/, 'A senha deve ser numérica'),
})

export type AuthFormData = z.infer<typeof authSchema>;
