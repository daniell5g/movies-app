import type { UseFormReturn } from 'react-hook-form';
import type { AuthFormData } from 'src/libs/zod/user';

export interface ISignInViewModel {
  form: UseFormReturn<AuthFormData, any, undefined>
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  handleSubmit: (data: AuthFormData) => void
}