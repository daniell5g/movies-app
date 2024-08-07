import CustomTextInput from '@components/CustomTextInput'
import { ImageLogo } from '@components/Logo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { type AuthFormData, authSchema } from 'src/libs/zod/user'

import * as S from './styles'

export const SignInPage = () => {
  const { login } = useAuth();

  const [error, setError] = useState<string | null>(null)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const handleSubmit = (data: AuthFormData) => {
    try {
      if (data.username === 'user' && data.password === '123') {
        login();
      } else {
        setError('Credenciais inválidas')
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null)
      }, 4000)
    }
  }, [error])

  return (
    <S.Container>
      <ImageLogo />
      <S.Form>
        {error && (
          <S.ErrorContainer>
            <S.Error>{error}</S.Error>
          </S.ErrorContainer>
        )}

        <S.FormInputContainer>
          <Controller
            name="username"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                label='Usuário'
                leftIcon='user'
                value={value}
                autoCapitalize="none"
                autoComplete="off"
                onChangeText={onChange}
                keyboardType="default"
                returnKeyType="next"
              />
            )}
          />
          {form.formState.errors.username && (
            <S.Error>
              {form.formState.errors.username.message}
            </S.Error>
          )}
        </S.FormInputContainer>

        <S.FormInputContainer>
          <Controller
            name="password"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                label='Senha'
                leftIcon='lock'
                isPassword
                value={value}
                autoCapitalize="none"
                autoComplete="off"
                onChangeText={onChange}
                keyboardType="default"
                returnKeyType="next"
              />
            )}
          />
          {form.formState.errors.password && (
            <S.Error>
              {form.formState.errors.password.message}
            </S.Error>
          )}
        </S.FormInputContainer>

        <S.Button
          onPress={form.handleSubmit(handleSubmit)}
          disabled={Object.keys(form.formState.errors).length > 0 || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? <S.Loading /> : <S.ButtonText>Entrar</S.ButtonText>}
        </S.Button>

        <S.ButtonForgot>
          <S.ButtonForgotText>Esqueci senha</S.ButtonForgotText>
        </S.ButtonForgot>
      </S.Form>
    </S.Container>
  )
}