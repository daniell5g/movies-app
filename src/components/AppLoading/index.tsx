import React from 'react'

import logoPng from '@/assets/images/icon.png'

import * as S from './styles'

export const AppLoading = () => {
  return (
    <S.LoadingContainer>
      <S.LoadingImage source={logoPng} alt='Letras BRQ em branco e o a palavra movies em amarelo' />
      <S.LoadingIndicator />
    </S.LoadingContainer>
  )
}