import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@hooks/useAuth';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type AuthFormData, authSchema } from 'src/libs/zod/user';

import type { ISignInViewModel } from './interface';

const useSignInViewModel = () => {
  const { login } = useAuth();
  const isConnected = useNetworkStatus();

  const [error, setError] = useState<string | null>(null)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const handleSubmit = (data: AuthFormData) => {
    try {
      if (data.username === 'user' && data.password === '123') {
        if (isConnected) {
          login();
        } else {
          setError('Sem conexão com a internet');
        }
      }
      else {
        setError('Credenciais inválidas')
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const viewModel: ISignInViewModel = {
    form,
    error,
    setError,
    handleSubmit
  };

  return viewModel
};

export { useSignInViewModel };