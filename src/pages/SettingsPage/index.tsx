import { ImageLogo } from '@components/Logo'
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';

import * as S from './styles'
import { useSettingsViewModel } from './viewModel';

export const SettingsPage = () => {
  const { logout } = useAuth()
  const navigation = useNavigation();
  const { options, theme, setSelected, handleChange } = useSettingsViewModel()

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
        placeholder={{ label: 'Selecione uma opção', value: '' }}
        touchableWrapperProps={{ testID: 'picker-select' }}
        items={options}
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
          Definir configuração
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