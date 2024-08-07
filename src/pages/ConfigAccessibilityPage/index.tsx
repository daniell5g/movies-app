import { ImageLogo } from '@components/Logo'
import { useThemeSwitcher } from '@hooks/useThemeSwitcher';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { CONFIG_ACCESSIBILITY_KEY } from 'src/configs/constants';
import { AsyncStorageImpl } from 'src/libs/storage/async-storage';
import type { ThemeName } from 'src/theme';

import * as S from './styles'

export const ConfigAccessibilityPage = () => {
  const { changeTheme } = useThemeSwitcher()
  const navigation = useNavigation()

  const [selected, setSelected] = useState<ThemeName>('default')

  const handleChange = useCallback(async () => {
    const storage = new AsyncStorageImpl()

    changeTheme(selected)
    await storage.setItem(CONFIG_ACCESSIBILITY_KEY, selected)

    navigation.navigate('SplashPage')
  }, [selected])

  return (
    <S.Container>
      <ImageLogo />

      <S.Header>
        <S.Title>Configurações de Acessibilidade</S.Title>
        <S.Description>
          Antes de continuar, precisamos ajustar o aplicativo para proporcionar a melhor experiência possível para você.
        </S.Description>
      </S.Header>

      <S.Question>
        Se você possui alguma deficiência visual, por favor, selecione a opção que melhor descreve sua condição.
      </S.Question>

      <RNPickerSelect
        onValueChange={(value) => setSelected(value)}
        placeholder={{ label: 'Selecione uma opção', value: 'default' }}
        items={[
          { label: 'Protanopia', value: 'protanopia' },
          { label: 'Deuteranopia', value: 'deuteranopia' },
          { label: 'Tritanopia', value: 'tritanopia' },
        ]}
        style={{
          placeholder: {
            color: '#fff',
          },
          inputAndroid: {
            backgroundColor: '#797979',
            color: '#fff',
          },
          inputIOS: {
            backgroundColor: '#797979',
            color: '#fff',
          },
        }}
      />

      <S.Button onPress={handleChange}>
        <S.ButtonText>
          {selected === 'default' ? 'Desejo pular' : 'Definir configuração'}
        </S.ButtonText>
      </S.Button>
    </S.Container>
  )
}