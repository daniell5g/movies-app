import CustomTextInput from '@components/CustomTextInput'
import { ImageLogo } from '@components/Logo'
import { useThemeSwitcher } from '@hooks/useThemeSwitcher'
import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as S from './styles'
import { useSignInViewModel } from './viewModel'

export const SignInPage = () => {
  const { theme } = useThemeSwitcher()
  const { error, form, setError, handleSubmit } = useSignInViewModel();

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null)
      }, 4000)
    }
  }, [error])

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: theme.colors.neutral }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
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
      </S.Container >
    </KeyboardAwareScrollView>
  )
}