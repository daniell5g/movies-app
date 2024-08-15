import { ImageLogo } from '@components/Logo'
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { useThemeSwitcher } from '@hooks/useThemeSwitcher';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

import { CONFIG_ACCESSIBILITY_KEY } from '../../configs/constants';
import { AsyncStorageImpl } from '../../libs/storage/async-storage';
import type { ThemeName } from '../../theme';
import * as S from './styles'

export const SettingsPage = () => {
  const { changeTheme, theme } = useThemeSwitcher()
  const { logout } = useAuth()
  const navigation = useNavigation();

  const [selected, setSelected] = useState<ThemeName>('default')

  const handleChange = useCallback(async () => {
    const storage = new AsyncStorageImpl()

    changeTheme(selected)
    await storage.setItem(CONFIG_ACCESSIBILITY_KEY, selected)
  }, [selected])

  return (
    <S.Container>
      <ImageLogo />

      <S.ActionRight onPress={() => navigation.navigate('HomePage')}>
        <Feather name='arrow-left' size={24} color='#fff' />
      </S.ActionRight>

      <S.Header>
        <S.Title>Configurações de Acessibilidade</S.Title>
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

      <S.ButtonLogout onPress={logout}>
        <Feather name='log-out' size={24} color={theme.colors.primary} />
        <S.ButtonLogoutText>
          Deslogar
        </S.ButtonLogoutText>
      </S.ButtonLogout>
    </S.Container>
  )
}