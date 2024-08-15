import { ImageLogo } from '@components/Logo'
import React, { useEffect } from 'react'

import * as S from './styles'
import { useSplashViewModel } from './viewModel'

export const SplashPage = () => {
  const { handleCheckNextPage } = useSplashViewModel()

  useEffect(() => {
    setTimeout(() => {
      handleCheckNextPage();
    }, 2000);
  }, []);

  return (
    <S.Container>
      <ImageLogo />
    </S.Container>
  )
}