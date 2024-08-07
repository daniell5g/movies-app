import { ImageLogo } from '@components/Logo'
import React from 'react'

import * as S from './styles'

export const AppLoading = () => {
  return (
    <S.LoadingContainer testID="loading-container">
      <ImageLogo />
      <S.LoadingIndicator testID="loading-indicator" />
    </S.LoadingContainer>
  )
}