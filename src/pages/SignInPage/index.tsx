import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import CustomTextInput from '../../components/CustomTextInput'
import { ImageLogo } from '../../components/Logo'
import * as S from './styles'
import { useSignInViewModel } from './viewModel'

export const SignInPage = () => {
  const { error, form, setError, handleSubmit } = useSignInViewModel();

  useEffect(() => {
    if (error !== null) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <S.Scroll
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <S.Container>
        <ImageLogo />
        <S.Form>
          {error && (
            <S.ErrorContainer testID='error-container'>
              <S.Error>{error}</S.Error>
            </S.ErrorContainer>
          )}

          <S.FormInputContainer>
            <Controller
              name="username"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  testID='input-username'
                  label='Usuário'
                  leftIcon='user'
                  testIDIcon='left-icon-user'
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
                  testID='input-password'
                  testIDIcon='left-icon-lock'
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
            testID='button-login'
            onPress={form.handleSubmit(handleSubmit)}
            disabled={Object.keys(form.formState.errors).length > 0 || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <S.Loading /> : <S.ButtonText>Entrar</S.ButtonText>}
          </S.Button>

          <S.ButtonForgot>
            <S.ButtonForgotText>Esqueci senha</S.ButtonForgotText>
          </S.ButtonForgot>
        </S.Form>
      </S.Container >
    </S.Scroll>
  )
}