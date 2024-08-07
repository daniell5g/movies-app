import { ImageLogo } from '@components/Logo'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { CONFIG_ACCESSIBILITY_KEY } from 'src/configs/constants'
import { AsyncStorageImpl } from 'src/libs/storage/async-storage'

import * as S from './styles'

export const SplashPage = () => {
  const navigation = useNavigation()

  async function handleCheckNextPage() {
    const storage = new AsyncStorageImpl()
    const configAccessibility = await storage.getItem(CONFIG_ACCESSIBILITY_KEY)

    if (configAccessibility !== null) {
      navigation.navigate('SignInPage')
      return
    }

    navigation.navigate('ConfigAccessibilityPage')
  }

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