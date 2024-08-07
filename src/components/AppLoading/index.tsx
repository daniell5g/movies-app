import { ImageLogo } from '@components/Logo'
import React from 'react'

import * as S from './styles'

export const AppLoading = () => {
  return (
    <S.LoadingContainer>
      <ImageLogo />
      <S.LoadingIndicator />
    </S.LoadingContainer>
  )
}